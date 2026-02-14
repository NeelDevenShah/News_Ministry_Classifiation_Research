from tensorflow import keras
from keras_preprocessing.sequence import pad_sequences

# nltk
import nltk
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import re
import pickle

import numpy as np


def load_tokenizer():
    with open('./sentiment_model/pretrained_weights/tokenizer.pkl', 'rb') as handle:
        tokenizer = pickle.load(handle)

    print(len(tokenizer.word_index))
    print('loading of tokenizer completed........')

    return tokenizer


# def load_word_to_vector():
#     with open('./sentiment_model/pretrained_weights/model.w2v', 'rb') as handle:
#         w2v_model = pickle.load(handle)

#     print("Vocab size", len(w2v_model.wv.vocab.keys()))
#     print('loading of tokenizer completed........')

#     return w2v_model


def preprocess(text, stem=False):

    stop_words = stopwords.words("english")
    stemmer = SnowballStemmer("english")
    TEXT_CLEANING_RE = "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"

    # Remove link,user and special characters
    text = re.sub(TEXT_CLEANING_RE, ' ', str(text).lower()).strip()
    tokens = []
    for token in text.split():
        if token not in stop_words:
            if stem:
                tokens.append(stemmer.stem(token))
            else:
                tokens.append(token)
    return " ".join(tokens)


def load_model():

    model = keras.models.load_model(
        './sentiment_model/pretrained_weights/model.h5', compile=False)

    # print(model.summary())
    print('Model loading completed...')
    return model


def decode_sentiment(score_list, include_neutral=True):

    SENTIMENT_THRESHOLDS = (0.4, 0.7)

    ans_list = []

    if include_neutral:

        for score in score_list:
            if score <= SENTIMENT_THRESHOLDS[0]:
                ans_list.append("NEGATIVE")
            elif score >= SENTIMENT_THRESHOLDS[1]:
                ans_list.append("POSITIVE")
            else:
                ans_list.append("NEUTRAL")
    else:
        for score in score_list:
            ans_list.append(
                "NEGATIVE") if score < 0.5 else ans_list.append("POSITIVE")

    return ans_list


def predict(df):

    # In ipython terminal (If running for first time)
    # import nltk
    # nltk.download('stopwords')

    for news in df:
        news = preprocess(news)

    tokenizer = load_tokenizer()

    df = pad_sequences(tokenizer.texts_to_sequences(df), maxlen=300)

    model = load_model()

    score = model.predict(df)
    label = decode_sentiment(score, include_neutral=True)

    print("--------------------")
    return label
