from rest_framework import permissions

from .models import User

__all__ = ['IsUser', 'IsManager', 'IsAdmin']


class IsUser(permissions.BasePermission):
    def has_permission(self, request, view):
        print(request.user.role)
        return request.user.is_authenticated() and request.user.role == 'user'


class IsManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated() and request.user.role == 'manager'


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated() and request.user.role == 'admin'

class IsAdminOrManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated() and (
            request.user.role == 'admin' or request.user.role == 'manager'
        )
