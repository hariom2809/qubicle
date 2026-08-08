from django.urls import path
from . import views

urlpatterns = [
    path("", views.ProjectView.as_view()),
    path("<uuid:project_id>/", views.ProjecctDetailView.as_view()),
    path("<uuid:project_id>/members/", views.AddProjectMemberView.as_view()),
    path("<uuid:project_id>/issues/", views.ProjectIssueView.as_view()),
    
]
