from rest_framework import serializers
from .models import Comment

from accounts.serializers import UserSerializer

class GetCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        exclude = ["issue"]

class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["body"]