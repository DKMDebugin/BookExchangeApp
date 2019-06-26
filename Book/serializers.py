from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Trade

class BookSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Book
        fields = ('url', 'id', 'user', 'title', 'description',)

class TradeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trade
        fields = ('url', 'id', 'book1', 'book2', 'traded', )

class UserSerializer(serializers.HyperlinkedModelSerializer):
    books = serializers.HyperlinkedRelatedField(many=True,
                        view_name='book-detail', read_only=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'first_name', 'last_name',
                    'email', 'books', )
