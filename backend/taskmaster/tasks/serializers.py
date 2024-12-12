# task/serializers.py
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'  # Incluye todos los campos
        read_only_fields = ['user']  # Asegúrate de que 'user' no sea requerido en la solicitud
