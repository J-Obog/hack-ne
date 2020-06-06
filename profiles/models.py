  
from django.db import models
from datetime import datetime
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser
from profiles.managers import *
from rest_framework.authtoken.models import Token

from django.db.models.signals import post_save, pre_save, pre_delete
from django.dispatch import receiver
from far_friends import settings
import hashlib
# Create your models here.

class User(AbstractBaseUser):
    username                        = models.CharField(verbose_name = 'username', max_length=30, blank = False, null = False, primary_key = True, unique = True)
    email                           = models.EmailField(verbose_name = 'email', blank = False, null = False, unique = True)

    first_name                      = models.CharField(max_length = 25, blank = False, null = False)
    last_name                       = models.CharField(max_length = 25, blank = False, null = False)
    date_of_birth                   = models.DateField(blank = False, null = False, default = timezone.now)
    

    native_language                 = models.CharField(max_length = 36, null = True, blank = True)
    sex                             = models.CharField(max_length = 1, null = True, blank = True)
    country                         = models.CharField(max_length = 75, null = False, blank = True, default = "United States")

    date_joined                     = models.DateTimeField(verbose_name = 'date_joined', auto_now_add = True)
    last_login                      = models.DateTimeField(verbose_name = 'last_login', auto_now = True) 
    is_staff                        = models.BooleanField(default = False)
    is_admin                        = models.BooleanField(default = False)
    is_active                       = models.BooleanField(default = True)
    is_superuser                    = models.BooleanField(default = False)

    EMAIL_FIELD                     = 'email'
    USERNAME_FIELD                  = 'username'
    REQUIRED_FIELDS                 = ['email', 'first_name', 'last_name', 'date_of_birth']

    objects                         = UserManager()
    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj = None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


#Creates a token for a user each time a user is created
@receiver(post_save, sender = settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance = None, created = False, **kwargs):
    if created:
        Token.objects.create(user = instance)
