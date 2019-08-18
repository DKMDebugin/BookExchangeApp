# Books Urls Conf

from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import renderers
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView

from .views import (
        BookViewSet, TradeViewSet,
        UserViewSet, api_root, ProfileView,
        BookListView, ProfileEditView,
        )


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
    path('api/', include(router.urls)),
    path('profile/<int:pk>/', ProfileView.as_view(), name='profile'),
    path('profile/edit/<int:pk>/', ProfileEditView.as_view(), name='profile-edit'),
    path('user-books/', BookListView.as_view(), name='user-books'),
    path('users/', TemplateView.as_view(template_name='users.html'), name='users'),
    path('requests/', TemplateView.as_view(template_name='requests.html'), name='requests'),
    path('trades/', TemplateView.as_view(template_name='trades.html'), name='trades'),
    path('books/', TemplateView.as_view(template_name='books.html'), name='books'),
]

# urlpatterns = format_suffix_patterns([
#     path('', api_root),
#     path('users/', user_list, name='user-list'),
#     path('users/<int:pk>/', user_detail, name='user-detail'),
#     path('books/', book_list, name='book-list'),
#     path('books/<int:pk>/', book_detail, name='book-detail'),
#     path('trades/', trade_list, name='trade-list'),
#     path('trades/<int:pk>/', trade_detail, name='trade-detail'),
# ])
