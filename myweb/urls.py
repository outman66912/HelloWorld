from django.conf.urls import url
from myweb import views

urlpatterns = [
    url(r'^index/', views.index),
    url(r'^home/', views.home),
    url(r'^main/', views.main),
]
