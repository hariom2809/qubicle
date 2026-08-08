from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema

from .serializers import MyTokenSerializer, RegisterSerializer, UserSerializer

@extend_schema(
        summary="Register new User",
        description=""" 
        Takes the Email, Password and Confirm Password as arguments to create a new account. 
        Password must be more than 8 Characters
        """
    )
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    
class LoginView(TokenObtainPairView):
    serializer_class = MyTokenSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        access_token = response.data["access"]
        refresh_token = response.data["refresh"]
        
        response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax")
        response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax")

        response.data = { "message": "login Successful" }
        return response
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
            summary="Logout Current user",
            description="Logout user and delete JWT token form cokkies"
    )
    def post(self, request):
        response = Response({"message": "User Logged out"})
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        return response

class RefreshTokenView(APIView):

    @extend_schema(
            summary="Refresh JWT token",
            description="take the old token form the cookies and renew it"
    )
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"message": "Refresh token is missing"},status= status.HTTP_401_UNAUTHORIZED)
        
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            response = Response({"message": "token refreshed"})
            response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax")
            return response
        except Exception:
            return Response({"detail": "Invalid refresh token"}, status= status.HTTP_401_UNAUTHORIZED)

@extend_schema(
    summary="Current User",
    description="Automatically fetches current user based on the JWT after Successful login"
)
class MeView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    