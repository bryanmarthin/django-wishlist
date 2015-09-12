from django.conf.urls import url
from api import views


urlpatterns = [
    url(r'^v1/wishs/$', views.wish_list),
    url(r'^v1/wish/$', views.wish_new),
]