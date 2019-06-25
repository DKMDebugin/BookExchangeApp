from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

@login_required
class Home(TemplateView):
    template_name = 'home.html'
