from bs4 import BeautifulSoup
import requests
import string

# Enter the keywords that you want to find in the web pages, MAKE SURE THAT ARE SAME AS THAT OF YOU HAVE USED IN THE four.py:
keywords = ['square rod', 'round rod', 'rectangle rod', 'nylon rod', 'derlin rod', 'pp rod', 'multicolour rod',
            'multi-colour rod', 'polyproplene rod', 'polyacetal rod', 'pom rod', 'polyamide rod', 'square rods','round rods', 'rectangle rods', 'nylon rods', 'derlin rods', 'pp rods', 'polyproplene rods', 'pom rods', 'polyamide rods', 'polyacetal rods']

def findTheContent(websiteData, keywords):
    for keyword in keywords:
        if (keyword in websiteData):
            print(keyword)
            return 1
    return 0

# HERE, ENTER THE WEB URLS FOR WHICH YOU WANT TO FIND THE REASON, WHY THEY HAVE BEEN SELECTED
for websiteURL in ["www.ategroup.com",
"www.akiropes.com",
"www.adroitcontrol.com",
"www.adroitextrusion.com",
"www.aerodry.com"]:
    try:
        if(len(websiteURL) != 1):
            websiteURL = websiteURL.translate({ord(c): None for c in string.whitespace})
            print(websiteURL)
            html_text = requests.get(("https://"+websiteURL)).text
            soup = BeautifulSoup(html_text, "html.parser")
            data = str(soup).lower()
            print("Done")
            if (findTheContent(data, keywords) == 1):
                print("\n")
    except:
        print("Error")