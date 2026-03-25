from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('index.html', views.home, name='home_index'),
    path('about.html', views.about, name='about'),
    path('programes.html', views.programmes, name='programmes'),
    path('form.html', views.application_form, name='application_form'),
]
