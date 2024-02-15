import cv2
import pytesseract

# BEFORE RUN MAKE SURE YOU HAVE EMPTIED THE WHOLE FILE NAMED tmp.txt

with open("tmp.txt", "a") as f:

    # TODO: Chage the range of the function according the number of images in the folder.

    for i in range(0, 6):
        print('lol')
        # Load an image
        print("page"+str(i)+".jpg")
        img = cv2.imread("page"+str(i)+".jpg")
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # For Printing the data that is been identified
        txt = pytesseract.image_to_string(img)
        txt += "\n"
        f.write(txt)
