from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

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

@receiver(pre_save, sender=Issue)
def audit_activity_log(sender, instance, **kwargs):
    if instance._state.adding:
        return
    
    actor = getattr(instance, "_actor")
    old_issue = Issue.objects.get(pk=instance.pk)
    tracked_fields = ["status", "priority", "assignee", "due_date"]

    for field in tracked_fields:
        old_value = getattr(old_issue, field)
        new_value = getattr(instance, field)

        if new_value != old_value:
            IssueActivity.objects.create(
                issue=instance,
                actor=actor,
                old_value=old_value,
                new_value=new_value
            )