import numpy as np
import pandas as pd

import tensorflow as tf
from tensorflow import keras
from keras_preprocessing.sequence import pad_sequences
# import os
import nltk
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import re
import pickle
# import itertools


# Ministry labels
# LABEL	MINISTRY NAME
# 0	Ministry of Railways
# 1	Ministry of Rural Development
# 2	Ministry of Steel
# 3	Ministry of Science & Technology
# 4	Ministry of Information & Broadcasting
# 5	Ministry of Food Processing Industries
# 6	Ministry of Health and Family Welfare
# 7	Ministry of Human Resource Development
# 8	Ministry of Agriculture
# 9	Ministry of Environment and Forests
# 10	Ministry of Chemicals and Fertilizers
# 11	Ministry of Water Resources
# 12	Ministry of Defence
# 13	Ministry of Petroleum & Natural Gas
# 14	President's Secretariat
# 15	Ministry of Micro,Small & Medium Enterprises
# 16	Ministry of Mines
# 17	Ministry of Tourism
# 18	Ministry of Housing & Urban Affairs
# 19	Ministry of Coal
# 20	Prime Minister's Office
# 21	Ministry of Textiles
# 22	Ministry of Commerce & Industry
# 23	Ministry of External Affairs
# 24	Ministry of Social Justice & Empowerment
# 25	Ministry of Power
# 26	Ministry of Consumer Affairs, Food & Public Distribution
# 27	Ministry of Heavy Industries & Public Enterprises
# 28	Ministry of Communications
# 29	Ministry of Shipping
# 30	Ministry of Finance
# 31	Ministry of Tribal Affairs
# 32	Ministry of Statistics & Programme Implementation
# 33	Ministry of Labour & Employment
# 34	Ministry of Law & Justice
# 35	Vice President's Secretariat
# 36	Ministry of Civil Aviation
# 37	Ministry for Development of North-East Region
# 38	UPSC
# 39	Ministry of Agro & Rural Industries
# 40	Ministry of Home Affairs
# 41	Ministry of Youth Affairs and Sports
# 42	Special Service and Features
# 43	Ministry of New and Renewable Energy
# 44	Ministry of Parliamentary Affairs
# 45	Planning Commission
# 46	Ministry of Personnel, Public Grievances & Pensions
# 47	Election Commission
# 48	Department of Space
# 49	Ministry of Disinvestment
# 50	Department of Ocean Development
# 51	Ministry of Overseas Indian Affairs
# 52	Ministry of Housing and Urban Poverty Alleviation
# 53	Ministry of Culture
# 54	Ministry of Company Affairs
# 55	Ministry of Panchayati Raj
# 56	Cabinet Committee on Economic Affairs (CCEA)
# 57	Cabinet
# 58	Department of Atomic Energy
# 59	Cabinet Committee Decisions
# 60	No Ministry


def load_tokenizer():
    with open('./ministry_classification_model/pretrained_weights/tokenizer.pkl', 'rb') as handle:
        tokenizer = pickle.load(handle)

    print(len(tokenizer.word_index))
    print('loading of tokenizer completed........')

    return tokenizer


def preprocess(text, stem=False):
    # Removing link, user, special characters

    # In ipython terminal (If running for first time)
    # import nltk
    # nltk.download('stopwords')
    stop_words = stopwords.words("english")
    stemmer = SnowballStemmer("english")

    test = re.sub(
        "@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+", ' ', str(text).lower()).strip()
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
        './ministry_classification_model/pretrained_weights/model.h5', compile=False)

    print('Model loading completed...')
    return model


def predict(df):

    # In ipython terminal (If running for first time)
    # import nltk
    # nltk.download('stopwords')

    for news in df:
        news = preprocess(news)

    tokenizer = load_tokenizer()
    df = pad_sequences(tokenizer.texts_to_sequences(df), maxlen=550)
    model = load_model()
    scores = model.predict(df)
    top_3_labels = np.argsort(scores)

    top_3_labels = top_3_labels

    ansList = []

    for score_list in top_3_labels:
        tmplist = []
        tmplist.append(int(score_list[-1]))
        tmplist.append(int(score_list[-2]))
        tmplist.append(int(score_list[-3]))

        ansList.append(tmplist)

    print("--------------------")
    return ansList
