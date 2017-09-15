from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from .permissions import IsAdminOrManager


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsAdminOrManager,]
