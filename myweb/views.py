#coding:utf-8
from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse

def index(request):
    return HttpResponse("hello 我的世界!")

def main(request):
    return render(request, 'home.html')

def home(request):
    return render_to_response('d3_01.html', {"kk": "uu"})