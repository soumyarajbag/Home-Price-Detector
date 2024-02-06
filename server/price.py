from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import pickle
import json

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': 'http://localhost:3000'}})

json_data = open("location.json")
data= json.load(json_data)["data_columns"]
location = data[3:]
def model_predict(location, sqft, bath, bhk):
    with open('model.pickle', 'rb') as f:
        model = pickle.load(f)
        loc_index = data.index(location)
        x = np.zeros(len(data))
        x[0] = int(sqft)
        x[1] = int(bath)
        x[2] = int(bhk)
        if loc_index >= 0:
            x[loc_index] = 1
        return round(model.predict([x])[0],2)


@app.route('/predict-price', methods=['POST'])
def predict_price():
    data = request.json
    location = data['location']
    sqft = float(data['area'])
    bath = int(data['bathrooms'])
    bhk = int(data['bedrooms'])
    model_predict(location,sqft,bath,bhk)
    print(location,sqft,bath,bhk)
    predicted_price = model_predict(location, sqft, bath, bhk)
    return jsonify({'predicted_price': predicted_price})

if __name__ == '__main__':
    app.run(debug=True)
