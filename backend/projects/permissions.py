from rest_framework.permissions import BasePermission
from .models import ProjectMembership

class IsProjectMember(BasePermission):
    message = "Members access only"

    def has_permission(self, request, view):
        project_id = view.kwargs.get("project_id")
        if not project_id:
            return False
        
        return ProjectMembership.objects.filter(
            project = project_id,
            user = request.user
        ).exists()

class IsProjectAdmin(BasePermission):
    message = "Project admin access only"

    def has_object_permission(self, request, view, obj):
        return ProjectMembership.objects.filter(
            project = obj.project_id,
            user = request.user,
            role = ProjectMembership.Roles.ADMIN
        ).exists()
    
class CanEditProject(BasePermission):
    message = "Only Admin and Member can edit"

    def has_object_permission(self, request, view, obj):
        project = obj.project

        return ProjectMembership.objects.filter(
            project = project,
            user = request.user,
            role__in = [
                ProjectMembership.Roles.ADMIN,
                ProjectMembership.Roles.MEMBER
            ]
        ).exists()