from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
import json

from routes.test import app_test
from routes.sentiment import app_sentiment
from routes.ministry_classification import app_ministryClassificaiton
from routes.youtube_to_text import app_text_from_youtube

app = Flask(__name__)

app.register_blueprint(app_test, url_prefix="/test")
app.register_blueprint(app_sentiment, url_prefix="/sentiment")
app.register_blueprint(app_ministryClassificaiton, url_prefix="/ministry")
app.register_blueprint(app_text_from_youtube, url_prefix="/from-youtube")

cors = CORS(app)

@app.route("/input-test", methods=["POST"])
def input_test():
    content_type = request.headers.get('Content-Type')
    if (content_type == "application/json"):
        json = request.get_json()

        texts = [news['text'] for news in json]

        return "Success"
    else:
        return "Content-Type not supported...."

# For running flask app -> python app.py
    # In ipython terminal (If running for first time)
    # import nltk
    # nltk.download('stopwords')


if __name__ == "__main__":
    app.run(debug=True,port=7203)
