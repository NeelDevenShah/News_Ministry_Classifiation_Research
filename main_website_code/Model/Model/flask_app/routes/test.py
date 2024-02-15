# routes/test
from flask import Blueprint, request, jsonify

app_test = Blueprint('test_blueprint', __name__)

@app_test.route('check')
def test_fucntion():
    
    data = {'id':55,'r':4}
    
    return jsonify(data)