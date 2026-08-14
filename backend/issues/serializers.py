from rest_framework import serializers
from .models import Issue, IssueActivity

from accounts.serializers import UserSerializer

class GetIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = "__all__"

class GetIssueDetailSerializer(serializers.ModelSerializer):
    reporter = UserSerializer(read_only=True)
    assignee = UserSerializer(read_only=True)
    
    class Meta:
        model = Issue
        fields = "__all__"

class PostIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        exclude = ["id", "number", "project", "reporter", "created_at", "updated_at"]

class PatchIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ["status","priority", "assignee", "due_date"]

class IssueActivitySerializer(serializers.ModelSerializer):
    actor = UserSerializer(read_only=True)

    class Meta:
        model = IssueActivity
        fields = "__all__"