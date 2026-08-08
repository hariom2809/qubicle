from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include("accounts.urls")),
    path('api/projects/', include("projects.urls")),
    path('api/issues/', include("issues.urls")),
    path('api/comments/', include("comments.urls")),
    path('api/schema/', SpectacularAPIView.as_view(), name="schema"),
    path('api/schema/docs/', SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path('api/schema/redocs/', SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

] + static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)