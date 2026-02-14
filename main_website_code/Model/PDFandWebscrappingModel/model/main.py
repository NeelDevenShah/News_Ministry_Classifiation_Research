
# import module

from pdf2image import convert_from_path
 
# Store Pdf with convert_from_path function

# ALSO MAKE SURE, YOU HAVE DELETED ALL THE IMAGES AND THE PDF, FILE THAT WAS USED BEFORE YOUR RUN OF THE CODE, OTHERWISE IT WILL GENERATE THE ERROR

####### Enter here the file name to read that file
images = convert_from_path('fileExtract.pdf')

for i in range(len(images)):
      # Save pages as images in the pdf
    images[i].save('page'+ str(i) +'.jpg', 'JPEG')