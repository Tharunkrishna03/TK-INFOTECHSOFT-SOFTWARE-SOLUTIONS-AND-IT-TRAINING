from django.db import models


class ApplicationSubmission(models.Model):
    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=10)
    email = models.EmailField()
    course = models.CharField(max_length=120)
    preferred_start_date = models.DateField(blank=True, null=True)
    address = models.CharField(max_length=255)
    enquiry = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return f'{self.name} - {self.course}'
