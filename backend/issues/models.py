import uuid
from django.db import models

from accounts.models import User
from projects.models import Project

# Create your models here.
class Issue(models.Model):
    class Type(models.TextChoices):
        BUG     = "bug", "Bug"
        STORY   = "story", "Story"
        TASK    = "task", "Task"
        EPIC    = "epic", "Epic"

    class Status(models.TextChoices):
        TO_DO       = "to_do", "To Do"
        IN_PROGRESS = "in_progress", "In Progress"
        IN_REVIEW   = "in_review", "In Review"
        DONE        = "done", "Done"

    class Priority(models.TextChoices):
        LOWEST  = "lowest", "Lowest" 
        LOW     = "low", "Low"
        MEDIUM  = "medium", "Medium"
        HIGH    = "high", "High"
        HIGHEST = "highest", "Highest"

    id          = models.UUIDField(primary_key=True, default=uuid.uuid7)
    number      = models.CharField(null=True, blank=True, editable=False, max_length=30)
    title       = models.CharField(max_length=50)
    description = models.TextField()
    project     = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="issues")
    type        = models.CharField(max_length=20, choices=Type.choices, null=False, blank=False)
    status      = models.CharField(max_length=20, choices=Status.choices, null=False, blank=False)
    priority    = models.CharField(max_length=20, choices=Priority.choices, null=False, blank=False)
    reporter    = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reported_issues")
    assignee    = models.ForeignKey(User, on_delete=models.CASCADE, related_name="assigned_issues", null=True, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)
    due_date    = models.DateTimeField(null=True, blank=True)

class IssueActivity(models.Model):
    id          = models.AutoField(primary_key=True, editable=False, null=False, blank=False)
    issue       = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name="activity")
    actor       = models.ForeignKey(User, on_delete=models.CASCADE, related_name="issue_activity")
    field       = models.CharField(max_length=20)
    old_value   = models.CharField(max_length=20)
    new_value   = models.CharField(max_length=20)
    created_at  = models.DateTimeField(auto_now_add=True)