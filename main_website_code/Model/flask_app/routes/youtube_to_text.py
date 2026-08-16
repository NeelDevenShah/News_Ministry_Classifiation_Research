from flask import Blueprint, request, jsonify

from youtube_to_text_model.model import predict

app_text_from_youtube = Blueprint('text_blueprint', __name__)


@app_text_from_youtube.route('/get-text', methods=["GET"])
def getText():

    link = request.headers.get('link')

    print('resonse got')
    response_text = predict(link)
    print('returning the json response')
    return response_text
