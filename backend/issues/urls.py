from django.urls import path
from . import views

urlpatterns = [
    path("<uuid:issue_id>/", views.IssueView.as_view()),
    path("<uuid:issue_id>/comments/", views.IssueCommentView.as_view()),
    path("<uuid:issue_id>/activity/", views.IssueActivityLogView.as_view()),
]