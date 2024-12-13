from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password' ,'email', 'profile_picture', 'bio']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, data):
        password = data.pop('password')
        user = CustomUser(**data)
        user.set_password(password)
        user.save()
        return user