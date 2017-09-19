from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import BaseUserManager
from django.utils.functional import cached_property

# Create your models here.
ROLE_CHOICES = (
    (u'admin', u'Admin'),
    (u'manager', u'Manager'),
    (u'user', u'User'),
)


class UserQuerySet(models.QuerySet):
    def filter_by_user(self, user):
        if user.is_admin:
            return self.exclude(role='admin')
        if user.is_manager:
            return self.filter(role='user')
        else:
            return self.none()


class UserManager(BaseUserManager):
    """
    A custom user manager to deal with emails as unique identifiers for auth
    instead of usernames. The default that's used is "UserManager"
    """
    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **extra_fields)

    def get_queryset(self):
        return UserQuerySet(self.model, using=self._db)

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(_('First Name'), max_length=50)
    last_name = models.CharField(_('Last Name'), max_length=50)
    email = models.EmailField(_('Email address'), unique=True)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES, default='user')
    is_superuser = models.BooleanField(_('superuser status'), default=False)
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_active = models.BooleanField(_('active'), default=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    USERNAME_FIELD = 'email'
    objects = UserManager()

    @cached_property
    def is_admin(self):
        return self.role == 'admin'

    @cached_property
    def is_manager(self):
        return self.role == 'manager'

    @cached_property
    def is_user(self):
        return self.role == 'user'

    def __str__(self):
        return self.email
    
    def get_short_name(self):
        return self.email

    def get_long_name(self):
        return self.email
