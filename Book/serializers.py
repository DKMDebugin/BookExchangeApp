from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Trade


class BookSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    request_count = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ('url', 'id', 'user', 'title', 'description', 'request_count')

    def get_request_count(self, obj):
        return count_book1(obj) + count_book2(obj)


class TradeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Trade
        fields = ('url', 'id', 'book1', 'book2', 'traded', )

class UserSerializer(serializers.HyperlinkedModelSerializer):
    books = serializers.HyperlinkedRelatedField(many=True,
                        view_name='book-detail', read_only=True)
    # url = serializers.HyperlinkedIdentityField(view_name='user_detail', lookup_field='id')

    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'first_name', 'last_name',
                    'email', 'books', )
    def ser(self):
        return repr(self)


# utitlity functions
def count_book1(obj):
    req_count = Trade.objects.filter(book1=obj, traded=False).count()
    return req_count

def count_book2(obj):
    req_count = Trade.objects.filter(book2=obj, traded=False).count()
    return req_count

ser = UserSerializer()
# hyper = serializers.HyperlinkedModelSerializer()
# print(ser.ser())
# print(repr(hyper))
