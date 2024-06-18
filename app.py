from flask import Flask, render_template, request, jsonify
from google.cloud import firestore
import datetime
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = '0aff0a4f3a9c097003c50b3624aec72b'

# sets the environment variable for google cloud credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/Users/dawso/Downloads/geobit-take-home-test-fc7ab2bd20e0.json'

# initialize firestore
db = firestore.Client()

@app.route('/')
def chat():
    return render_template('chat.html')

# store message in firestore
@app.route('/messages', methods=['POST'])
def send_message():
    data = request.get_json()
    message_text = data.get('text')

    if message_text:
        # storing both message and date so they can displayed in the correct order
        timestamp = datetime.datetime.now()
        db.collection('messages').add({
        'text': message_text,
        'timestamp': timestamp
        })
        return jsonify({'message': 'Message sent successfully'}), 201
    else:
        return jsonify({'error': 'Missing message text'}), 400

# retrieves data from the firestore collection   
@app.route('/messages', methods=['GET'])
def get_messages():
    messages_ref = db.collection('messages').order_by('timestamp', direction=firestore.Query.ASCENDING).stream()
    messages = [doc.to_dict() for doc in messages_ref]
    return jsonify({'messages': messages}), 200

if __name__ == '__main__':
    app.run(debug=True)