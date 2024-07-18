import { io } from 'socket.io-client';

console.log("소켓 연결 시도중 ...")

const socket = io('http://localhost:8765');

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('sensor_data', (data) => {
    console.log('Sensor Data:', data);
    // Parse data here and update the DOM elements accordingly
    const parsedData = parseSensorData(data);
    updateDOM(parsedData);
});

function parseSensorData(data) {
    // Assuming data format: Humidity: 84.00% Temperature: 27.10°C 80.78°F Heat index: 30.37°C 86.67°F
    const regex = /Humidity: (\d+\.\d+)% Temperature: (\d+\.\d+)°C (\d+\.\d+)°F Heat index: (\d+\.\d+)°C (\d+\.\d+)°F/;
    const matches = data.match(regex);
    if (matches) {
        return {
            humidity: matches[1],
            temperatureC: matches[2],
            temperatureF: matches[3],
            heatIndexC: matches[4],
            heatIndexF: matches[5]
        };
    }
    return null;
}

function updateDOM(data) {
    if (data) {
        document.getElementById('temp1').textContent = `${data.temperatureC}°C`;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        // Update other elements as needed
    }
}

window.onload = function() {
    // Additional initialization if needed
};
