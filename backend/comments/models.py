from django.db import models

from accounts.models import User
from issues.models import Issue

class Comment(models.Model):
    id          = models.AutoField(primary_key=True, editable=False, null=False, blank=False)
    issue       = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name="comments")
    author      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="issue_comment")
    body        = models.TextField(max_length=250)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)