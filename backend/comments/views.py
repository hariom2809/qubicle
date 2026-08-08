from rest_framework import generics

from .serializers import PostCommentSerializer

from .permissions import CanDeleteComment, CanEditComment
from projects.permissions import IsProjectMember
from rest_framework.permissions import IsAuthenticated

class CommentView(generics.RetrieveUpdateDestroyAPIView):

    def get_permissions(self):
        permission_classes = [IsAuthenticated, IsProjectMember]
        if self.request.method == "PATCH":
            permission_classes.append(CanEditComment)
        elif self.request.method == "DELETE":
            permission_classes.append(CanDeleteComment)
        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        if self.request.method == "PATCH":
            return PostCommentSerializer
