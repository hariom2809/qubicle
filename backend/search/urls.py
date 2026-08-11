from django.urls import path
from . import views

urlpatterns = [
    path("user/", views.UserSearchView.as_view(), name="user-search"),
]