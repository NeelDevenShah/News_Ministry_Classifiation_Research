from flask import Blueprint, request, jsonify

from ministry_classification_model.model import predict

app_ministryClassificaiton = Blueprint(
    'ministryClassification_blueprint', __name__)


@app_ministryClassificaiton.route('/get-ministry-class', methods=["POST"])
def getMinistryClass():

    content_type = request.headers.get('Content-Type')

    if (content_type == "application/json"):
        json = request.get_json()

        news_list = []

        for i in range(len(json)):
            news_list.append(json[i]['text'])

        ans_label = predict(news_list)

        ans_list = []
        for i in range(len(news_list)):
            ans_list.append(
                {'_id': json[i]['_id'], 'ministries': ans_label[i]})

        print(ans_list)
        return jsonify(ans_list)

    else:
        return jsonify("Enter Data In JSON Format")
