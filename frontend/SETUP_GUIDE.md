# Setup Guide for Django Integration

This guide helps you integrate the Financial Prediction Form with your Django ML backend.

## Django Backend Requirements

### 1. Create the Prediction Endpoint

Add this view to your Django application:

```python
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

@csrf_exempt
@require_http_methods(["POST"])
def predict_financial(request):
    try:
        data = json.loads(request.body)
        age = data.get('age')
        salary = data.get('salary')
        
        # Add your ML model prediction logic here
        # Example structure:
        result = {
            "score": 8.5,  # Financial score out of 10
            "scoreDescription": "Excellent financial position",
            "investment": "High Growth Portfolio",
            "investmentTip": "Consider diversifying with index funds",
            "retirement": "Age 55",
            "retirementNote": "On track for early retirement",
            "insights": [
                "Strong savings potential at your age",
                "Consider maximizing 401k contributions",
                "Emergency fund recommended"
            ]
        }
        
        return JsonResponse(result)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
```

### 2. Add URL Route

In your `urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('api/predict', views.predict_financial, name='predict_financial'),
    # your other URLs...
]
```

### 3. Configure CORS (if needed)

Install django-cors-headers:
```bash
pip install django-cors-headers
```

Add to `settings.py`:
```python
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ...
]

# Allow requests from the React app
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5000",  # React app URL
]
```

## Testing the Integration

1. Start your Django server:
   ```bash
   python manage.py runserver
   ```

2. Start the React application:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5000 and test the form

## Troubleshooting

### Connection Refused Error
- Ensure Django is running on port 8000
- Check that the API endpoint URL is correct
- Verify CORS configuration

### Validation Errors
- Age must be between 1-100
- Salary must be greater than 0
- Both fields are required

### API Response Format
Ensure your Django endpoint returns the exact JSON structure shown above.

## Production Deployment

1. Update the API URL in the React app configuration
2. Configure proper CORS settings for your production domain
3. Set up HTTPS for secure data transmission
4. Consider rate limiting on your Django API