"""BookExchange URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import logout, views as auth_views
from django.views.generic import TemplateView

urlpatterns = [
    path('', include('Book.urls')),
    path('home/', TemplateView.as_view(template_name='home.html')),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    path('logout/', logout, name='logout'),
    path('api-auth/', include('rest_framework.urls')),
    path('oauth/', include('social_django.urls', namespace='social'),
            name='social'),
    path('admin/', admin.site.urls),
]
