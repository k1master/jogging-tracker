from .models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'role')


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'role', 'password')
        read_only_fields = ('id', 'role')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = super(UserCreateSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        print(validated_data)
        user.save()
        return user

    def update(self, instance, validated_data):
        user = super(UserCreateSerializer, self).update(self.instance, validated_data)
        if 'password' in validated_data:
        	user.set_password(validated_data['password'])
        print(validated_data)
        user.save()
        return user
