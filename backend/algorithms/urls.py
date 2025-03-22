from django.urls import path
from .views import * 

urlpatterns = [
    path('transcribe/', transcribe_dna, name='transcribe'),
    path('translate/', translate_mrna, name='translate'),
    path('gc-content/', gc_content, name='gc_content'),
    path("needlemen-align/", needelemen_wunsch, name='needlemen-align')
]