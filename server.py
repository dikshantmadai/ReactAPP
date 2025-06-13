# server.py
from flask import Flask, jsonify
from flask_cors import CORS
import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

@app.route('/api/health-facilities')
def get_health_facilities():
    url = 'https://localhost/medic/_all_docs?include_docs=true'
    username = 'medic'
    password = 'password'
    
    response = requests.get(url, auth=HTTPBasicAuth(username, password), verify=False)
    
    if response.status_code == 200:
        data = response.json()
        district_hospitals = []
        
        for row in data.get('rows', []):
            doc = row.get('doc', {})
            if doc.get('type') == 'district_hospital':
                district_hospitals.append({
                    'name': doc.get('name'),
                    'reported_date': doc.get('reported_date')
                })
        
        return jsonify(district_hospitals)
    else:
        return jsonify({'error': 'Failed to fetch data'}), 500

if __name__ == '__main__':
    app.run(port=5001)