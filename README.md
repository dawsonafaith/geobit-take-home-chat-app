# Flask Chat App
simple application to send and display chats using Python, Flask, JavaScript, and Google Cloud

## Set Up
this was developed and tested within a venv virtual enviornoment

'''
python -m venv chat
chat\Scripts\activate
'''

be sure to pip install flask, datetime, firestore, and of within your venv



.json file that allows access to my specific collection not uploaded for security reasons

however in app.py you can edit line 10 with you own firestore collection

## Design
JavaScript, HTML, and CSS kept separate for readability & ease of development


chat page design kept very simple and pixels were used for quick code writing


chats store both the text & timestamp so that chats are always displayed in correct order, as the asycnhronous behavior was causing some to be displayed out of order

much of the code is commented with additional information

## Additional Notes
Google Cloud used over AWS simply because I already have a Google Cloud account :)