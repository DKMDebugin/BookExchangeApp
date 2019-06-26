from rest_framework import viewsets, permissions
from .models import Book, Trade
from .serializers import BookSerializer, TradeSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .permissions import IsOwnerOrReadOnly


# Create your views here.

class BookViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides only `list()` & `retrieve()` action
    when user isnt logged in but provides additional actions
    which include `create()`, `update()` & `destroy()` when user is logged in.
    `detroy()` & `update()` action can only be done by the book owner.
    """
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                        IsOwnerOrReadOnly, )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TradeViewSet(viewsets.ModelViewSet):
    """
    A viewset that provides only `list()` & `retrieve()` action
    when user isnt logged in but provides additional `create()` action
    when user is logged in.
    """
    queryset = Trade.objects.all()
    serializer_class = TradeSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset that only provides `list()` & `retrieve()` action
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


# create an api root which reps a sinlge entry point for the api
@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'books': reverse('book-list', request=request, format=format),
        'trades': reverse('trade-list', request=request, format=format),
    })
