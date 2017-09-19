from .models import User
from .serializers import UserSerializer, UserCreateSerializer, UserUpdateSerializer
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .permissions import IsAdminOrManager


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    permission_classes = [IsAdminOrManager]

    def get_serializer_class(self):
        if self.request.method in ['POST']:
            return UserCreateSerializer
        elif self.request.method in ['PUT']:
            return UserUpdateSerializer
        else:
            # Default for get and other requests is the read only serializer
            return UserSerializer

    def get_queryset(self):
        qs = super(UserViewSet, self).get_queryset()
        return qs.filter_by_user(self.request.user)

    @list_route(methods=['put', 'get'], permission_classes=[IsAuthenticated,], url_path='profile')
    def profile(self, request, *args, **kwargs):
        SerializerClass = self.get_serializer_class()
        if request.method in ['PUT']:
            serializer = SerializerClass(instance=request.user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            serializer = SerializerClass(instance=request.user)
        return Response(serializer.data)
