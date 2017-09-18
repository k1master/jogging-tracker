from .models import User
from .serializers import UserSerializer, UserCreateSerializer
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
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrManager]

    @list_route(methods=['put', 'get'], permission_classes=[IsAuthenticated,], url_path='profile')
    def profile(self, request, *args, **kwargs):
        if request.method in ['PUT']:
            serializer = UserCreateSerializer(instance=request.user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            serializer = self.serializer_class(instance=request.user)
        return Response(serializer.data)
