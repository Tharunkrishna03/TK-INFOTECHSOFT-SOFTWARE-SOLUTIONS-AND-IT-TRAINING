from django.test import TestCase
from django.urls import reverse

from .models import ApplicationSubmission


class SiteRenderingTests(TestCase):
    def test_public_pages_render_successfully(self):
        pages = [
            reverse('home'),
            reverse('about'),
            reverse('programmes'),
            reverse('application_form'),
        ]

        for page in pages:
            with self.subTest(page=page):
                response = self.client.get(page)
                self.assertEqual(response.status_code, 200)
                self.assertContains(response, 'TK INFO-TECH')
                self.assertContains(response, 'favicon-tk.svg')
                self.assertContains(response, 'mobileSidebar')
                self.assertContains(response, 'data-sidebar-target="#mobileSidebar"')

    def test_tk_favicon_is_served(self):
        response = self.client.get('/favicon-tk.svg')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, '<svg', html=False)


class ApplicationFormTests(TestCase):
    def test_application_submission_is_saved(self):
        response = self.client.post(
            reverse('application_form'),
            {
                'name': 'Test User',
                'phone': '9876543210',
                'email': 'test@example.com',
                'course': 'Python Full Stack',
                'startDate': '2026-04-01',
                'address': 'Chennai',
                'enquiry': 'I would like to join the next batch.',
            },
            HTTP_X_REQUESTED_WITH='XMLHttpRequest',
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(ApplicationSubmission.objects.count(), 1)

        submission = ApplicationSubmission.objects.get()
        self.assertEqual(submission.name, 'Test User')
        self.assertEqual(submission.phone, '9876543210')
        self.assertEqual(submission.course, 'Python Full Stack')

    def test_invalid_phone_returns_validation_error(self):
        response = self.client.post(
            reverse('application_form'),
            {
                'name': 'Invalid User',
                'phone': '12345',
                'email': 'invalid@example.com',
                'course': 'MERN Stack',
                'startDate': '2026-05-10',
                'address': 'Coimbatore',
                'enquiry': 'Please share more details.',
            },
            HTTP_X_REQUESTED_WITH='XMLHttpRequest',
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(ApplicationSubmission.objects.count(), 0)
        self.assertIn('phone', response.json()['errors'])
