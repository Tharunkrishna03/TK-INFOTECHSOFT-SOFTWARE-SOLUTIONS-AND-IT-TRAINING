from django import forms

from .models import ApplicationSubmission


class ApplicationSubmissionForm(forms.Form):
    name = forms.CharField(max_length=150)
    phone = forms.RegexField(
        regex=r'^\d{10}$',
        error_messages={'invalid': 'Enter a valid 10-digit phone number.'},
    )
    email = forms.EmailField()
    course = forms.CharField(max_length=120)
    startDate = forms.DateField(required=False, input_formats=['%Y-%m-%d'])
    address = forms.CharField(max_length=255)
    enquiry = forms.CharField()

    def save(self) -> ApplicationSubmission:
        return ApplicationSubmission.objects.create(
            name=self.cleaned_data['name'],
            phone=self.cleaned_data['phone'],
            email=self.cleaned_data['email'],
            course=self.cleaned_data['course'],
            preferred_start_date=self.cleaned_data['startDate'],
            address=self.cleaned_data['address'],
            enquiry=self.cleaned_data['enquiry'],
        )
