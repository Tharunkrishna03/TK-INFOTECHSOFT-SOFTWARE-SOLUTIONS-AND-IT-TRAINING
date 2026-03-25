from django.contrib import admin

from .models import ApplicationSubmission


@admin.register(ApplicationSubmission)
class ApplicationSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'email',
        'phone',
        'course',
        'preferred_start_date',
        'created_at',
    )
    search_fields = ('name', 'email', 'phone', 'course')
    list_filter = ('course', 'created_at')
