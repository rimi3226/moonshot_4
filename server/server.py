import eventlet
eventlet.monkey_patch()

from flask import Flask
from flask_socketio import SocketIO, emit
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

PORT = 8765

@app.route('/')
def index():
    return "Socket.IO server running."

@socketio.on('connect')
def handle_connect():
    print('New connection')
    def send_sensor_data():
        while True:
            time.sleep(5)
            sensor_data = 'Humidity: 84.00% Temperature: 27.10°C 80.78°F Heat index: 30.37°C 86.67°F'
            emit('sensor_data', sensor_data)
    
    eventlet.spawn(send_sensor_data)

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=PORT)
