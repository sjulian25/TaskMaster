# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from .models import Task
# from .serializers import TaskSerializer
# import logging
# logger = logging.getLogger(__name__)

# class TaskViewSet(viewsets.ModelViewSet):
#     serializer_class = TaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Task.objects.filter(user=self.request.user)

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.status import HTTP_400_BAD_REQUEST
# from .models import Task
# from .serializers import TaskSerializer
# import logging

# logger = logging.getLogger(__name__)

# class TaskViewSet(viewsets.ModelViewSet):
#     serializer_class = TaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         logger.debug(f"Obteniendo tareas para el usuario: {user}")
#         return Task.objects.filter(user=user)

#     def perform_create(self, serializer):
#         user = self.request.user
#         logger.debug(f"Creando tarea para el usuario: {user}")
#         logger.debug(f"Datos recibidos para la tarea: {serializer.validated_data}")
#         try:
#             serializer.save(user=user)
#             logger.info(f"Tarea creada exitosamente para el usuario {user}")
#         except Exception as e:
#             logger.error(f"Error al crear la tarea: {e}")
#             raise

#     def create(self, request, *args, **kwargs):
#         logger.debug(f"Solicitud de creación recibida con datos: {request.data}")
#         try:
#             response = super().create(request, *args, **kwargs)
#             logger.info("Tarea creada con éxito.")
#             return response
#         except Exception as e:
#             logger.error(f"Error al procesar la solicitud de creación: {e}")
#             return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializer
import logging

logger = logging.getLogger(__name__)

# class TaskViewSet(viewsets.ModelViewSet):
#     serializer_class = TaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # Retorna solo las tareas del usuario autenticado
#         return Task.objects.filter(user=self.request.user)

#     def perform_create(self, serializer):
#         try:
#             # Asigna el usuario autenticado al campo user antes de guardar
#             serializer.save(user=self.request.user)
#             logger.info(f"Tarea creada para el usuario {self.request.user.username}")
#         except Exception as e:
#             logger.error(f"Error al crear tarea: {e}")
#             raise


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        logger.info(f"Solicitud de creación recibida con datos: {self.request.data}")
        logger.info(f"Usuario autenticado: {self.request.user}")  # Verifica que el usuario esté presente
        try:
            serializer.save(user=self.request.user)
            logger.info(f"Tarea creada para el usuario {self.request.user.username}")
        except Exception as e:
            logger.error(f"Error al crear tarea: {e}")
            raise
