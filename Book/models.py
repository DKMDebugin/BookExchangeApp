from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    user = models.ForeignKey('auth.User', related_name='books',
                                on_delete=models.CASCADE)
    title = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=300)

    def __str__(self):
        return self.title

class Trade(models.Model):
    book1 = models.ForeignKey(Book, related_name='book1', on_delete=models.CASCADE)
    book2 = models.ForeignKey(Book, related_name='book2', on_delete=models.CASCADE)
    traded = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.book1} - {self.book2}'
