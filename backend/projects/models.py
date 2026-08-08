import uuid
from django.db import models

from accounts.models import User

class Project(models.Model):
    id          = models.UUIDField(default=uuid.uuid7, editable=False, null=False, blank=False, primary_key=True, db_index=True)
    key         = models.CharField(max_length=10, unique=True)
    name        = models.CharField(max_length=255, null=False, default="")
    description = models.TextField(max_length=500, null=True, blank=True)
    owner       = models.ForeignKey(User, on_delete=models.CASCADE, related_name="project_owner")
    created_at  = models.DateTimeField(auto_now_add=True)

class ProjectMembership(models.Model):
    class Roles(models.TextChoices):
        ADMIN   = "admin", "Admin"
        MEMBER  = "member", "Member"
        VIEWER  = "viewer", "Viewer"

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="memberships")
    user    = models.ForeignKey(User, on_delete=models.CASCADE, related_name="project_memberships")
    role    = models.CharField(max_length=10, choices=Roles.choices)

    class Meta:
        constraints = (
            models.UniqueConstraint(
                fields= ["user", "project"],
                name  = "unique_user_project"
            ),
        )