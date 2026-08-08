from django.urls import path

from . import views

urlpatterns = [
    path("<int:comment_id>/", views.CommentView.as_view()),
]
