from django.db import models


class Post(models.Model):
    class Meta:
        db_table = 'Post'

    user = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    text = models.CharField(max_length=255)