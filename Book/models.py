from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.urls import reverse

from django.contrib.auth.models import User

# Create your models here.

def get_absolute_url(self):
    return reverse('profile', kwargs={'pk': self.pk})

# Extend User model
User.add_to_class('get_absolute_url', get_absolute_url)


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


def request_pre_save_reciever(sender, instance, *args, **kwargs):
    """Raise an error if both books are the same or of the same user"""
    if instance.book1 == instance.book2 or instance.book1.user == instance.book2.user:
         raise

pre_save.connect(request_pre_save_reciever, sender=Trade)
