
#BEFORE RUN MAKE SURE YOU HAVE EMPTIED THE WHOLE FILE NAMED webData.txt

file = open('tmp.txt', 'r')
webData = open('webData.txt', 'a')
lines = file.readlines()
# Here we are extracting the data of the website from the given data, If we want to extract any other details than write that keyword in the bellow
# startswith function, And than also change the index from which we need the data from, Initially we start traking the data from the 10th index till the end
# as shown in line[10:], We can read any data by this method
for line in lines:
    if(line.startswith('Website')):
        webData.write(line[10:]+"\n")   