# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Load the trained crime prediction model
model = joblib.load("crime.pkl")  # Ensure this file is in the same folder

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = data.get("features")

        if not features or not isinstance(features, list):
            return jsonify({"error": "Invalid input. 'features' must be a list."}), 400

        prediction = model.predict([features])
        return jsonify({"prediction": prediction.tolist()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)