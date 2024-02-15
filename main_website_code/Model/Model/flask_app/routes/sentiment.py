from flask import Blueprint, request, jsonify

from sentiment_model.model import predict

app_sentiment = Blueprint('sentiment_blueprint', __name__)


@app_sentiment.route('/get-sentiment', methods=["POST"])
def getSentimentOfNews():

    content_type = request.headers.get('Content-Type')

    if (content_type == "application/json"):
        json = request.get_json()

        news_list = []

        for i in range(len(json)):
            news_list.append(json[i]['text'])

        ans_label = predict(news_list)

        ans_list = []
        for i in range(len(news_list)):
            ans_list.append({'_id': json[i]['_id'], 'sentiment': ans_label[i]})

        return jsonify(ans_list)
    else:
        return jsonify("Enter Data In JSON Format")
