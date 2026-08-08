from rest_framework import serializers
from .models import Comment

class GetCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        exclude = ["issue"]

class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["body"]