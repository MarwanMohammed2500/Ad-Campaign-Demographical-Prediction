from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
import pickle as pkl
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "Social_Media_Ads_Model.pkl")

with open(model_path, "rb") as f:
    model = pkl.load(f)

@method_decorator(csrf_exempt, name='dispatch')
class PredictionView(View):

    def post(self, request):
        try:
            data = json.loads(request.body)
            age = data.get("age")
            salary = data.get("salary")
            print(data)
            print(age, salary)

            if age is None or salary is None:
                return JsonResponse({"error": "Missing 'Age' or 'Salary"}, status=400)
            age = int(age)
            salary = float(salary)

            bins = [14999.999, 28000.0, 43000.0, 57000.0, 70000.0, 78000.0, 88000.0, 115125.0, 150000.0]
            labels = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0]
            cat = pd.cut([salary], bins=bins, labels=labels)[0]
            if pd.isna(cat):
                return JsonResponse({"error":"Salary is outside the expected range"}, status=400)
            
            inp = pd.DataFrame(
                data={"Age":age, "0.0":0, "1.0":0, "2.0":0, "3.0":0, "4.0":0, "5.0":0, "6.0":0, "7.0":0},
                index=[0]
                )
            try:
                inp[str(cat)] = 1
            except Exception as e:
                return JsonResponse({"error": "It's inp[str[cat]]"}, status=400)
            pred = "Most likely will Purchase" if model.predict(inp)[0] == 1 else "Most likely will not Purchase"
            return JsonResponse({"prediction": str(pred)})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)