from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

from .models import Project, ProjectMembership

@receiver(pre_save, sender=Project)
def convert_key_to_uppercase(sender, instance, **kwargs):
    instance.key = instance.key.upper()

@receiver(post_save, sender=Project)
def create_project_admin(sender, instance, created, **kwargs):
    if created:
        ProjectMembership.objects.create(
            project= instance,
            user= instance.owner,
            role= ProjectMembership.Roles.ADMIN
        )