from django.shortcuts import get_object_or_404
from rest_framework import status, generics

from .models import Issue, IssueActivity
from comments.models import Comment

from  .serializers import GetIssueDetailSerializer, PatchIssueSerializer, IssueActivitySerializer
from comments.serializers import GetCommentSerializer, PostCommentSerializer

from projects.permissions import IsProjectMember, CanEditProject
from rest_framework.permissions import IsAuthenticated

class IssueView(generics.RetrieveUpdateAPIView):

    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        if self.request.method == "PATCH":
            permission_classes.append(CanEditProject)
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.request.method == "PATCH":
            return PatchIssueSerializer
        return GetIssueDetailSerializer
    
    def get_object(self):
        return get_object_or_404(Issue, pk=self.kwargs["issue_id"])
    
    def perform_update(self, serializer):
        issue = serializer.instance
        issue._actor = self.request.user
        serializer.save()

class IssueCommentView(generics.ListCreateAPIView):
    
    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        if self.request.method == "POST":
            permission_classes.append(CanEditProject)
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return PostCommentSerializer
        return GetCommentSerializer

    def get_queryset(self):
        return Comment.objects.select_related("author").filter(
            issue=self.kwargs["issue_id"]
        ).order_by("-created_at")

    def perform_create(self, serializer):
        issue = get_object_or_404(Issue, pk= self.kwargs["issue_id"])
        serializer.save(issue=issue, author=self.request.user)

class IssueActivityLogView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = IssueActivitySerializer

    def get_queryset(self):
        return IssueActivity.objects.select_related("actor").filter(
            issue=self.kwargs["issue_id"]
        ).order_by("-created_at")
