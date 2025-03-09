from django.urls import path
from .views import transcribe_dna, translate_mrna, gc_content

urlpatterns = [
    path('transcribe/', transcribe_dna, name='transcribe'),
    path('translate/', translate_mrna, name='translate'),
    path('gc-content/', gc_content, name='gc_content'),
]