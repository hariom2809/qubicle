from datetime import datetime

from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils import timezone

from accounts.models import User
from .models import Issue, IssueActivity

@receiver(pre_save, sender=Issue)
def generate_issue_number(sender, instance, **kwargs):
    if not instance._state.adding:
        return

    project_key = instance.project.key

    last_issue = Issue.objects.filter(
        project=instance.project
    ).order_by("-number").first()

    if not last_issue:
        new_number = 1
    else:
        current_number = int(last_issue.number.split("-")[1])
        new_number = current_number + 1

    instance.number = f"{project_key}-{new_number}"

def display_value(value):
    """Render a tracked field value as a readable string for the activity log."""
    if value is None:
        return ""

    if isinstance(value, User):
        return value.name.strip() or value.email

    if isinstance(value, datetime):
        return timezone.localtime(value).strftime("%d %b %Y, %H:%M")

    return str(value)

@receiver(pre_save, sender=Issue)
def audit_activity_log(sender, instance, **kwargs):
    if instance._state.adding:
        return

    actor = getattr(instance, "_actor", None)
    if actor is None:
        return

    old_issue = Issue.objects.get(pk=instance.pk)
    tracked_fields = ["status", "priority", "assignee", "due_date"]

    for field in tracked_fields:
        old_value = getattr(old_issue, field)
        new_value = getattr(instance, field)

        if new_value != old_value:
            IssueActivity.objects.create(
                issue=instance,
                actor=actor,
                field=field,
                old_value=display_value(old_value),
                new_value=display_value(new_value)
            )