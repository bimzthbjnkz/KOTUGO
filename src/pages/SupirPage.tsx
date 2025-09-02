import React, { useState, useEffect } from 'react';
import SummaryCard from '../components/SummaryCard';
import FinishButton from '../components/FinishButton';
import AngkotMap from '../components/AngkotMap';
import BluetoothConnection from '../components/BluetoothConnection';

// Interface untuk data penumpang
interface PassengerData {
  passenger_count: number;
  message_id: number;
  timestamp: number;
  device_id: string;
}

const SupirPage: React.FC = () => {
  // Ambil plat nomor dari localStorage
  const plateNumber = localStorage.getItem('angkotPlateNumber') || 'B 1234 ABC';
  
  // Data dummy
  const route = 'Kalapa - Dago';
  const role = 'driver';
  
  // State untuk koneksi Bluetooth dan data penumpang
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [passengerData, setPassengerData] = useState<PassengerData | null>(null);
  const [passengerHistory, setPassengerHistory] = useState<PassengerData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk menghubungkan ke perangkat BLE
  const connectToBluetoothDevice = async () => {
    try {
      setIsScanning(true);
      setError(null);
      
      // Cek apakah browser mendukung Web Bluetooth API
      if (!navigator.bluetooth) {
        throw new Error('Browser tidak mendukung Web Bluetooth API');
      }
      
      // Request device dengan filter service UUID
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ['181A'] }, // Environmental Sensing Service
          { name: 'NanoPassengerCTR' }
        ],
        optionalServices: ['181A'] // Service yang diperlukan
      });
      
      // Hubungkan ke GATT Server
      const server = await device.gatt?.connect();
      
      // Dapatkan service
      const service = await server?.getPrimaryService('181A');
      
      // Dapatkan characteristic
      const characteristic = await service?.getCharacteristic('2A6E');
      
      // Enable notifications
      await characteristic?.startNotifications();
      
      // Event listener untuk data yang masuk
      characteristic?.addEventListener('characteristicvaluechanged', (event: any) => {
        try {
          // Decode data yang diterima
          const value = event.target.value;
          const decoder = new TextDecoder('utf-8');
          const dataString = decoder.decode(value);
          
          // Parse data JSON
          const data: PassengerData = JSON.parse(dataString);
          
          // Update state dengan data terbaru
          setPassengerData(data);
          
          // Tambahkan ke history
          setPassengerHistory(prev => [...prev, data]);
          
          // Simpan ke localStorage (opsional)
          const storedData = localStorage.getItem('passengerData');
          const passengerArray = storedData ? JSON.parse(storedData) : [];
          passengerArray.push(data);
          localStorage.setItem('passengerData', JSON.stringify(passengerArray));
          
          console.log('Data penumpang diterima:', data);
        } catch (parseError) {
          console.error('Error parsing data:', parseError);
          setError('Format data tidak valid');
        }
      });
      
      setIsConnected(true);
      setIsScanning(false);
      
      // Event listener untuk disconnect
      device.addEventListener('gattserverdisconnected', () => {
        setIsConnected(false);
        console.log('Perangkat Bluetooth terputus');
      });
      
    } catch (error) {
      console.error('Error connecting to Bluetooth:', error);
      setError(`Gagal terhubung: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsScanning(false);
    }
  };

  // Fungsi untuk memutuskan koneksi Bluetooth
  const disconnectBluetooth = async () => {
    try {
      // Disconnect dari perangkat (jika terhubung)
      if (navigator.bluetooth && isConnected) {
        // Web Bluetooth API tidak memiliki metode disconnect langsung
        // Biasanya dilakukan dengan melepas referensi perangkat
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Error disconnecting Bluetooth:', error);
    }
  };

  // Cleanup pada unmount
  useEffect(() => {
    return () => {
      if (isConnected) {
        disconnectBluetooth();
      }
    };
  }, [isConnected]);

  return (
    <div className="space-y-6">
      <SummaryCard role={role} route={route} plateNumber={plateNumber} />
      
      {/* Komponen Koneksi Bluetooth */}
      <BluetoothConnection 
        isConnected={isConnected}
        isScanning={isScanning}
        onConnect={connectToBluetoothDevice}
        onDisconnect={disconnectBluetooth}
        deviceName="NanoPassengerCTR"
      />
      
      {/* Tampilkan Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {/* Tampilkan Data Penumpang */}
      {passengerData && (
        <div className="bg-green-100 rounded-2xl p-6 shadow-neomorph">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Data Penumpang Terbaru</h3>
          <p className="text-gray-600">Jumlah: {passengerData.passenger_count}</p>
          <p className="text-gray-600">Pesan ID: {passengerData.message_id}</p>
          <p className="text-gray-600">
            Waktu: {new Date(passengerData.timestamp).toLocaleTimeString()}
          </p>
        </div>
      )}
      
      {/* Riwayat Data Penumpang */}
      {passengerHistory.length > 0 && (
        <div className="bg-blue-50 rounded-2xl p-6 shadow-neomorph">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Riwayat Data Penumpang</h3>
          <div className="max-h-40 overflow-y-auto">
            {passengerHistory.map((data, index) => (
              <div key={index} className="border-b border-gray-200 py-2">
                <p className="text-sm text-gray-600">
                  #{data.message_id}: {data.passenger_count} penumpang - 
                  {new Date(data.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <AngkotMap 
        driverPosition={[-6.914744, 107.609810]} // Posisi supir
        height="500px"
      />
      
      <div className="bg-gray-100 rounded-2xl p-6 shadow-neomorph">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Penumpang Menunggu</h3>
        <p className="text-gray-600">2 penumpang menunggu di halte berikutnya</p>
      </div>
      
      <FinishButton onClick={() => console.log('Selesai menjemput')} />
    </div>
  );
};

export default SupirPage;