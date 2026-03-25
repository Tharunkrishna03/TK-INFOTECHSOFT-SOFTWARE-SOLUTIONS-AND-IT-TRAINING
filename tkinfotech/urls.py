from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('applications.urls')),
    re_path(
        r'^(?P<path>(?!static/).+\.(?:css|js|png|jpg|jpeg|gif|svg|mp4))$',
        serve,
        {'document_root': __import__('pathlib').Path(__file__).resolve().parent.parent},
    ),
]
