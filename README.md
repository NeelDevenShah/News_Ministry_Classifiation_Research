# DemocraticNet-Paper: Your Shield Against Misinformation!

Official repository for **"DemocraticNet-Paper: Your Shield Against Misinformation!"**, published at the **Ninth International Conference on Information and Communication Technology for Competitive Strategies (ICTCS 2024)**.

---

## 📢 Publication & Conference Details
- **Published In:** Springer (Springer Nature)
- **Conference:** Ninth International Conference on Information and Communication Technology for Competitive Strategies (ICTCS 2024)
- **Date:** 19 - 21 December, 2024
- **Location:** Jaipur, India
- **Organized By:** GR Foundation
- **Managed By:** GR Scholastic
- **National Chamber Partner:** Knowledge Chamber of Commerce and Industry

### 👥 Authors
* **Neel Shah** (Charotar University of Science and Technology, India)
* **Sneh Shah** (Charotar University of Science and Technology, India)
* **Aum Barai** (Charotar University of Science and Technology, India)
* **Vansh Mehta** (Charotar University of Science and Technology, India)
* **Anshu Trivedi** (Charotar University of Science and Technology, India)
* **Twisha Kamani** (Charotar University of Science and Technology, India)
* **Dr. Nirav Bhatt** (Charotar University of Science and Technology, India)

---

## 📥 Downloads
* 📄 [**Download Research Paper (PDF)**](assets/DemocraticNet-final-paper.pdf)
* 📊 [**Download Conference Presentation (PDF)**](assets/presentation.pdf)

---

## 💡 Motivation & Core Concept
The rapid proliferation of misinformation on social media platforms can trigger major national incidents, riots, and panic (e.g., public misconceptions during the farming laws, citizenship policies, or currency demonetization). 

### The Problem with Traditional Classifiers
Most fake news classifiers try to determine if a piece of news is "fake" or "real" directly. However, in a fast-paced world where policies and realities change daily, static fake news classifiers quickly become outdated and ineffective.

### Our Solution: DemocraticNet-Paper
DemocraticNet-Paper addresses this by acting as a routing system:
1. **Ministry Classification:** It classifies news articles according to the relevant **ministries of the Indian Government** (supporting **49 distinct ministries**).
2. **Decentralized Verification:** Once classified, the news is forwarded to the specific ministry's dashboard, where subject-matter experts can determine whether the news is fake or misleading and react accordingly.
3. **Sentiment Analysis:** It allows ministries to track media and public sentiment, helping them refine communications, improve public impression, and take preliminary counter-measures.
4. **Social Media Integration:** This system can be deployed on messaging platforms like WhatsApp and Telegram to scan messages with high forwarding rates, automatically routing them to the correct government department for vetting.

---

## 📊 Experimental Results

We evaluated several model-optimizer combinations on our custom-labeled dataset of **~36,000 news articles**. Below are the Top-3 accuracy and loss results (from Table 5 of the paper):

| Model Name | Optimizer | Top-3 Accuracy | Loss |
| :--- | :--- | :---: | :---: |
| **xlm-roberta-base** | **Nadam** | **85.043%** | **6.063%** |
| **xlnet-base-cased** | **Nadam** | **84.583%** | **6.282%** |
| **microsoft/deberta-base** | **Adam** | **82.809%** | **6.593%** |
| **microsoft/deberta-base** | **Nadam** | **82.683%** | **6.685%** |
| **FacebookAI/roberta-base** | **AdamW** | **82.544%** | **6.551%** |
| **FacebookAI/roberta-base** | **Adam** | **81.915%** | **7.077%** |
| **xlm-roberta-base** | **Adam / AdamW** | **81.985%** | **7.798%** |
| **google-bert/bert-base-uncased** | **Nadam** | **81.650%** | **7.593%** |
| **FacebookAI/roberta-base** | **Nadam** | **81.273%** | **7.878%** |
| **xlnet-base-cased** | **Adam** | **79.974%** | **9.806%** |
| **xlnet-base-cased** | **AdamW** | **79.318%** | **9.945%** |
| **google-bert/bert-base-uncased** | **AdamW** | **79.220%** | **9.334%** |
| **microsoft/deberta-base** | **AdamW** | **78.229%** | **9.752%** |
| **google-bert/bert-base-uncased** | **Adam** | **77.810%** | **9.672%** |
| **microsoft/deberta-base** | **SGD** | **58.700%** | **13.458%** |
| **xlnet-base-cased** | **SGD** | **58.385%** | **15.078%** |
| **google-bert/bert-base-uncased** | **SGD** | **29.842%** | **76.227%** |
| **FacebookAI/roberta-base** | **SGD** | **07.608%** | **7.603%** |
| **xlm-roberta-base** | **SGD** | **02.681%** | **7.798%** |

### Key Takeaways:
- **XLM-RoBERTa + Nadam** achieved the best performance with **85.04% Top-3 accuracy**.
- Adaptive learning rate optimizers (Adam, Nadam, AdamW) significantly outperformed Stochastic Gradient Descent (SGD) across all models.

---

## 📁 Repository Structure

```filepath
├── assets/
│   ├── DemocraticNet-final-paper.pdf     # Published research paper PDF
│   └── presentation.pdf                   # Conference presentation slides PDF
├── dataset/
│   ├── raw_dataset_before_labelling_and_merging/  # Zip files of news articles before processing
│   ├── final_dataset/
│   │   └── required/
│   │       ├── seprate_file/              # Individual labeled files by team members
│   │       └── combined/                  # Final merged dataset (.csv) & dataset visualization
│   └── code_for_managing_dataset/         # Scripts for profiling, processing, and merging data
├── model/
│   ├── BiLSTM/
│   │   ├── first_run/                     # Initial BiLSTM training notebook
│   │   ├── Top-3/                         # Top-3 classification evaluation notebook
│   │   └── inference.ipynb                # Quick model inference script
│   ├── Convolution-bilstm.ipynb           # CNN-BiLSTM hybrid model training notebook
│   ├── Number-of-bilstm-increased.ipynb   # Multi-layered BiLSTM notebook
│   └── Roberta_Sneh.ipynb                 # RoBERTa model training notebook
└── main_website_code/
    ├── FrontEnd/                          # ReactJS frontend application
    ├── BackEnd/                           # NodeJS/Express backend server
    └── Model/                             # Python model server (Flask APIs for classification)
```

---

## 🛠️ Installation & Setup

To run the complete platform locally, follow the steps below:

### 1. Flask Model Server
Handles text preprocessing, sentiment analysis, and ministry classification requests.
```bash
cd main_website_code/Model/flask_app
pip install -r ../requirements.txt
python app.py
```
*Runs on `http://localhost:7200` (endpoints configured for sentiment and classification).*

### 2. Express Backend
Handles user authentication, news database storage, and acts as a gateway to the ML classification APIs.
```bash
cd main_website_code/BackEnd
npm install
npm start
```
*Runs on `http://localhost:5000` (requires a running MongoDB instance).*

### 3. React Frontend
Provides the web dashboard dashboard for different ministries.
```bash
cd main_website_code/FrontEnd
npm install
npm start
```
*Runs on `http://localhost:3000`.*

---

## 📜 License
This project is licensed under the MIT License.
