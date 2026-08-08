from rest_framework.permissions import BasePermission
from projects.models import ProjectMembership

class CanEditComment(BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.author == request.user

class CanDeleteComment(BasePermission):

    def has_object_permission(self, request, view, obj):
        if obj.author == request.user:
            return True
        
        return ProjectMembership.objects.filter(
            project=obj.issue.project,
            user=request.user,
            role=ProjectMembership.Roles.ADMIN
        ).exists()