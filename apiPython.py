from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)

# Cargar el modelo
model = joblib.load('white_wine_quality_model.pkl')
model_red = joblib.load('red_wine_quality_model.pkl')

# Configuración de CORS
CORS(app)

@app.route('/predict/white', methods=['POST'])
def predict():
    data = request.json
    print("Received data:", data)  # Agregado para depuración

    # Verifica el tipo de 'data' y su contenido
    if isinstance(data, dict) and 'features' in data:
        input_features = np.array([data['features']])
        prediction = model.predict(input_features)
        return jsonify({'quality': int(prediction[0])})
    else:
        return jsonify({'error': 'Invalid data format'}), 400



    
@app.route('/predict/red', methods=['POST'])
def predict_red():
    data = request.json
    print("Received data:", data)  # Agregado para depuración

    # Verifica el tipo de 'data' y su contenido
    if isinstance(data, dict) and 'features' in data:
        input_features = np.array([data['features']])
        prediction = model_red.predict(input_features)
        return jsonify({'quality': int(prediction[0])})
    else:
        return jsonify({'error': 'Invalid data format'}), 400

if __name__ == '__main__':
    app.run(debug=True)

    #Ejecutar 4