from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse

from .forms import ApplicationSubmissionForm


def home(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


def programmes(request):
    return render(request, 'programes.html')


def application_form(request):
    if request.method == 'POST':
        form = ApplicationSubmissionForm(request.POST)

        if form.is_valid():
            submission = form.save()
            success_message = 'Application saved successfully. We will contact you soon.'

            if request.headers.get('x-requested-with') == 'XMLHttpRequest':
                return JsonResponse(
                    {
                        'message': success_message,
                        'submission_id': submission.pk,
                    },
                    status=201,
                )

            return redirect(f"{reverse('application_form')}?saved=1")

        errors = {
            field: [entry['message'] for entry in messages]
            for field, messages in form.errors.get_json_data().items()
        }
        first_error = next(
            (messages[0] for messages in errors.values() if messages),
            'Please check the form and try again.',
        )

        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse(
                {
                    'message': first_error,
                    'errors': errors,
                },
                status=400,
            )

        return render(
            request,
            'form.html',
            {
                'status_message': first_error,
                'status_type': 'error',
            },
        )

    context = {}

    if request.GET.get('saved') == '1':
        context = {
            'status_message': 'Application saved successfully. We will contact you soon.',
            'status_type': 'success',
        }

    return render(request, 'form.html', context)
