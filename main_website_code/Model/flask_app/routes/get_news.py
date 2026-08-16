from flask import Blueprint, request, jsonify

from get_english_news_model.model import scrap_news
import multiprocessing

app_get_news = Blueprint(
    'getNews_blueprint', __name__
)


@app_get_news.route('/get-english-news', methods=["GET"])
def get_news():
    print("Giving")

    output_queue = multiprocessing.Queue()

    scraping_process = multiprocessing.Process(
        target=scrap_news, args=(output_queue,))
    scraping_process.start()
    scraping_process.join()

    #     scraped_data = pd.read_json('./tmp/news_data.json')
    # subprocess.run(["rm", "./tmp/news_data.json"], capture_output=True)
    print('succ')
    return "done"
    # return jsonify(response_text)
