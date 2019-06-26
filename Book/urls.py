# Books Urls Conf

from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import BookViewSet, TradeViewSet, UserViewSet, api_root
from rest_framework import renderers
from rest_framework.routers import DefaultRouter


# bind urls to viewsets
user_list = UserViewSet.as_view({
    'get': 'list',
})
user_detail = UserViewSet.as_view({
    'get': 'retrieve',
})
book_list = BookViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
book_detail = BookViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})
trade_list = TradeViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
trade_detail = TradeViewSet.as_view({
    'get': 'retrieve',
})

# wire up the views with urls
# router = DefaultRouter(trailing_slash=False)
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'books', BookViewSet)
router.register(r'trades', TradeViewSet)


urlpatterns = [
    path('', include(router.urls))
]

# urlpatterns = format_suffix_patterns([
#     # path('', api_root),
#     # path('users/', user_list, name='user-list'),
#     # path('users/<int:pk>/', user_detail, name='user-detail'),
#     # path('books/', book_list, name='book-list'),
#     # path('books/<int:pk>/', book_detail, name='book-detail'),
#     # path('trades/', trade_list, name='trade-list'),
#     # path('trades/<int:pk>/', trade_detail, name='trade-detail'),
# ])
