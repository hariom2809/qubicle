from django.db import models
from django.contrib.auth.models import AbstractUser

from .manager import CustomUserManager

# Create your models here.
class User(AbstractUser):
    username    = None
    email       = models.EmailField(unique= True)
    avatar      = models.ImageField(upload_to= "avatar/", null= True, blank= True)
    bio         = models.TextField(max_length=250, blank= True)

    USERNAME_FIELD  = "email"
    REQUIRED_FIELDS = []
    objects         = CustomUserManager()
    
    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return self.email