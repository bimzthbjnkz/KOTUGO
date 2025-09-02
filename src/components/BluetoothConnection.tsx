// components/BluetoothConnection.tsx
import React from 'react';

interface BluetoothConnectionProps {
  isConnected: boolean;
  isScanning: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  deviceName: string;
}

const BluetoothConnection: React.FC<BluetoothConnectionProps> = ({
  isConnected,
  isScanning,
  onConnect,
  onDisconnect,
  deviceName
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-neomorph">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Koneksi Penghitung Penumpang</h3>
      
      {!isConnected ? (
        <button
          onClick={onConnect}
          disabled={isScanning}
          className={`w-full py-3 rounded-xl font-semibold ${
            isScanning 
              ? 'bg-gray-400 text-gray-200' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isScanning ? 'Mencari Perangkat...' : `Hubungkan ke ${deviceName}`}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center text-green-600">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Terhubung ke {deviceName}</span>
          </div>
          <button
            onClick={onDisconnect}
            className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600"
          >
            Putuskan Koneksi
          </button>
        </div>
      )}
      
      <p className="text-sm text-gray-500 mt-3">
        Pastikan perangkat Arduino Nano ESP32 dengan nama "{deviceName}" dalam jangkauan dan dalam mode pairing.
      </p>
    </div>
  );
};

export default BluetoothConnection;