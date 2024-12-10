from django.db import models
from django.conf import settings

class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('in_progress', 'En Progreso'),
        ('completed', 'Completada')
    ]

    PRIORITY_CHOICES = [
        ('low', 'Baja'),
        ('medium', 'Media'),
        ('high', 'Alta')
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pending'
    )
    priority = models.CharField(
        max_length=20, 
        choices=PRIORITY_CHOICES, 
        default='medium'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.title