from django.http.response import HttpResponse
try:
    from django.utils.deprecation import MiddlewareMixin  # Django 1.10.x
except ImportError:
    MiddlewareMixin = object  # Django 1.4.x - Django 1.9.x


 # class SimpleMiddleware(MiddlewareMixin):
 #
 #     def process_request(self, request):
 #            pass
 #
 #     def process_response(request, response):
 #            pass
class testmiddle(object):
    def process_request(self,request):
        print("1. process_request")
    def process_view(self,request,callback,callbcak_args,callback_kwargs):
        print('1.process_view')
    def process_exception(self,request,exception):
        print('1.process_exception')
    def process_response(self,request,response):
        print(('1.process_response'))
        return response

    def __init__(self, get_response=None):
        print('111112111')
        self.get_response = get_response
        super(testmiddle, self).__init__()

    def __call__(self, request):
        print('222222')
        response = None
        if hasattr(self, 'process_request'):
            response = self.process_request(request)
        if not response:
            response = self.get_response(request)
        if hasattr(self, 'process_response'):
            response = self.process_response(request, response)
        return response