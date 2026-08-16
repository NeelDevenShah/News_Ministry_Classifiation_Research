from bs4 import BeautifulSoup
import requests
import string

#BEFORE RUN MAKE SURE YOU HAVE EMPTIED THE WHOLE FILE NAMED DealerWebsites.txt, ErrorWeb.txt, DealearWebsites.txt

# Enter the keywords that you want to find in the web pages:
keywords = ['square rod', 'round rod', 'rectangle rod', 'nylon rod', 'derlin rod', 'pp rod', 'multicolour rod',
            'multi-colour rod', 'polyproplene rod', 'polyacetal rod', 'pom rod', 'polyamide rod', 'square rods', 'round rods', 'rectangle rods', 'nylon rods', 'derlin rods', 'pp rods', 'polyproplene rods', 'pom rods', 'polyamide rods', 'polyacetal rods']

def findTheContent(websiteData, keywords):
    for keyword in keywords:
        if (keyword in websiteData):
            return 1
    return 0


fileRead = open('webData.txt', 'r')
lines = fileRead.readlines()

with open('ErrorWeb.txt', 'a') as ewrite:

    with open('DealearWebsites.txt', 'a') as fwrite:

        for websiteURL in lines:
            try:
                if(len(websiteURL) != 1):
                    websiteURL = websiteURL.translate({ord(c): None for c in string.whitespace})
                    html_text = requests.get(("https://"+websiteURL)).text
                    soup = BeautifulSoup(html_text, "html.parser")
                    data = str(soup).lower()
                    print("Done")
                    if (findTheContent(data, keywords) == 1):
                        print("1")
                        fwrite.write(websiteURL+"\n")
            except:
                print("Error")
                ewrite.write(websiteURL+"\n")