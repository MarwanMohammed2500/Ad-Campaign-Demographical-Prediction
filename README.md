# 🧠 Social Media Ads Prediction API (Backend)

This is the backend for a machine learning-powered API that predicts whether a user will click on a social media ad based on their **age** and **salary**. It uses **Django**, is **Dockerized**, and communicates seamlessly with other services via Docker Compose.

---

## 📁 Project Structure
```
├── Docker/
│   └── Django-Dockerfile        # Dockerfile for Django backend
│   └── Dockerfile               # Dockerfile for Node.js frontend
├── apps/
│   └── DataInput/                        # Views, URLs, etc., live here
│       └── Social_Media_Ads_Model.pkl    # The Model
├── frontend/                    # Where the Node.js and Express.js logic lives
├── sm_pred_app/                 # Django Project Config
├── social_media_adv.ipynb       # Model Training notebook
├── Social_Network_Ads.csv       # Dataset
├── manage.py
```


---

## ⚙️ Prerequisites

* [Docker](https://www.docker.com/) installed and running
* No need for Python or Node.js on your local machine
* Ensure the file `Social_Media_Ads_Model.pkl` is present in `apps/DataInput/`

---

## 🚀 Getting Started

### 1. Run the Backend via Docker Compose

From the root of the project, run:

```bash
sudo docker compose -f Docker/docker-compose.yml up --build
```

What this does:

* Builds the Django container using `Docker/Django-Dockerfile`
* Builds the Node.js container using `Docker/Dockerfile`
* Exposes Django on **localhost:8000**
* Exposes Django on **localhost:5000**
* Uses `python -u manage.py runserver 0.0.0.0:8000` inside the Django container
* Uses `npm run dev` inside the Node.js container
---

## 📱 API Usage

### Endpoint: `POST /api/predict/`

**Request Example (JSON):**

```json
{
  "age": 59,
  "salary": 80000
}
```

**Response Example:**

```json
{
  "prediction": "Most likely will Purchase",
}
```

---

## 🛠 Docker Cheatsheet

```bash
# View running containers
docker ps

# Enter Django container
docker exec -it <container-id> bash

# View logs for Django container
docker logs <container-id>

# Stop and clean up everything
docker compose down
docker system prune -a --volumes
```

---

## 🧪 Troubleshooting

### 🔌 Backend Not Connecting

* Ensure Django binds to `0.0.0.0`, not `127.0.0.1`
* Confirm `ports` in `docker-compose.yml` map correctly:

  ```yaml
  ports:
    - 8000:8000
  ```

### 🔒 Port Already in Use

* Another app is using the port. Change to something else:

  ```yaml
  ports:
    - "8010:8000"
  ```

### 📁 Missing .pkl File

* Ensure `Social_Media_Ads_Model.pkl` exists and is copied in the Docker build context:

  ```dockerfile
  COPY . .  # Make sure this line includes your model
  ```
---

## 😄 Enjoy!
This was a way for me to bridge my ML and DevOps experiences. I'm still exploring the potential here further, and will learn more about server-side handling, Django, Nginx, etc., to improve my future projects, but this was just on a whim

---
# Screenshots from within the app
### When you open the app
![image](https://github.com/user-attachments/assets/8efb9543-4b46-4ede-9ad0-88cead132c98)

### Sample Prediction
![image](https://github.com/user-attachments/assets/637adb61-1a6c-4699-8bd5-b854db057a0f)

