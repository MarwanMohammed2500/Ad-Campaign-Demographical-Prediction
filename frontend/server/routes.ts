import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { predictionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Prediction endpoint that forwards to Django backend
  app.post("/api/predict", async (req, res) => {
    try {
      // Validate request body
      const { age, salary } = predictionSchema.parse(req.body);
      
      // Get Django API URL from environment or use default
      const djangoApiUrl = process.env.DJANGO_API_URL || "http://django:8000/api/predict/";
      
      // Forward request to Django backend
      const response = await fetch(djangoApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ age, salary }),
      });

      if (!response.ok) {
        throw new Error(`Django API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Prediction API error:", error);
      
      if (error instanceof Error) {
        if (error.message.includes("Django API error")) {
          res.status(502).json({ 
            message: "Prediction service unavailable. Please check your Django backend." 
          });
        } else if (error.message.includes("fetch")) {
          res.status(502).json({ 
            message: "Unable to connect to prediction service. Please verify the Django API endpoint." 
          });
        } else {
          res.status(400).json({ message: error.message });
        }
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
