from rest_framework import serializers
from .models import Project, ProjectMembership

class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["key", "name", "description"]

class ListProjectSerializer(serializers.ModelSerializer):
    member_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Project
        fields = ["id", "name", "key", "member_count"]

class GetProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class ProjectMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMembership
        fields = ["user", "role"]