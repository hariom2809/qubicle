from django.shortcuts import get_object_or_404
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Project, ProjectMembership
from issues.models import Issue

from .serializers import CreateProjectSerializer, ListProjectSerializer, ProjectMembershipSerializer, GetProjectSerializer
from issues.serializers import GetIssueSerializer, PostIssueSerializer

from .permissions import IsProjectMember, IsProjectAdmin, CanEditProject
from rest_framework.permissions import IsAuthenticated

@extend_schema_view(
    get=extend_schema(
        summary="List Projects",
        description="Responsible for listing all the projects created by user and have a membership in project",
        responses=ListProjectSerializer
    ),
    post=extend_schema(
        summary="Create new Project",
        description="Takes required field data and create new project",
        request=CreateProjectSerializer
    )
)
class ProjectView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ListProjectSerializer
        return CreateProjectSerializer

    def get_queryset(self):
        user_project_ids = ProjectMembership.objects.filter(
            user=self.request.user
        ).values_list("project", flat=True)
        return Project.objects.filter(
            pk__in = user_project_ids
        ).annotate(
            member_count = Count("memberships")
        )
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@extend_schema(
    summary="Get a Project",
    description="""
    Get the detial of a Project. 
    takes the project-id as the path parameter
    """
)
class ProjecctDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, IsProjectMember]
    serializer_class = GetProjectSerializer

    def get_object(self):
        return get_object_or_404(Project, pk=self.kwargs["project_id"])

@extend_schema(
    summary= "Add member in a Project",
    description= "Accepting the project id as a parameter and taking user id and the role as the request body and add member in a projet",
    request= ProjectMembershipSerializer
)
class AddProjectMemberView(APIView):
    permission_classes = [IsAuthenticated, IsProjectAdmin]

    def post(self, request, project_id):
        project = get_object_or_404(Project, pk=project_id)
        serializer = ProjectMembershipSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        target_user = serializer.valid_data["user"]
        if ProjectMembership.objects.filter(project=project, user=target_user).exists():
            return Response(
                {"message": "User is already a member Project."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        membership = serializer.save(project=project)
        return Response(
            {
                "message": "Member added successfully",
                "member": ProjectMembershipSerializer(membership).data,
            },
            status=status.HTTP_201_CREATED,
        )

@extend_schema_view(
    get=extend_schema(
        summary="List all Issues for a Project",
        description="""
        Takes project-id as the path parameter.
        Fetches all Issues foa proejct
        """,
        responses=GetIssueSerializer
    ),
    post=extend_schema(
        summary="Raise an Issue",
        description="""
        Create a new Issue for the particular Project.
        Takes input for the certain requried and optional fields.
        """,
        request=PostIssueSerializer
    )
)
class ProjectIssueView(generics.ListCreateAPIView):
    
    def get_permissions(self):
        permission_classes = [IsAuthenticated, IsProjectMember]
        if self.request.method == "POST":
            permission_classes.append(CanEditProject)
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return PostIssueSerializer
        return GetIssueSerializer
    
    def get_queryset(self):
        return Issue.objects.filter(
            project=self.kwargs["project_id"]
        ).order_by("number")
    
    filterset_fields = ["type", "status", "priority", "assignee"]
    search_fields = ["key", "title"]

    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs["project_id"])
        serializer.save(project=project, reporter= self.request.user)