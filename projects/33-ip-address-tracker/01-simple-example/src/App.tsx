import { toast, Toaster } from 'react-hot-toast';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import pin from '/images/pin.svg';

interface Place {
  ip: string;
  isp: string;
  country: string;
  city: string;
  region: string;
  timezone: string;
  lat: string;
  lng: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "".
 */
const App = () => {
  const [address, setAddress] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(function() {
    (async () => {
      await fetchData('8.8.8.8');
    })();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const ip = formData.get('ip') as string;
    const formattedIp = ip.trim().toLowerCase();
    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(formattedIp)) {
      toast.error('Please enter valid IP.');
      return;
    }
    localStorage.setItem('ip', JSON.stringify(ip));
    await fetchData(formattedIp);
  }

  async function fetchData(address: string): Promise<void> {
    try {
      setIsLoading(true);
      setAddress(null);
      const {
        data: {
          ip,
          isp,
          location: { country, city, region, timezone, lat, lng },
        },
      } = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_D5MQsxItBHTAuuGXJEefzDtDNm2QH&ipAddress=${address}`);
      setAddress({ ip, isp, country, city, region, timezone, lat, lng });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setAddress(null);
      toast.error('Something went wrong, open dev console.');
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>IP Address Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input className='input' type='text' name='ip' placeholder='Search for any IP address or domain' />
      </form>
      {address && (
        <div className='grid gap-3'>
          <ul>
            <li className='grid grid-cols-2'>
              <p className='font-bold p-2 border'>IP Address</p>
              <p className='border p-2'>{address.ip}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p className='font-bold p-2 border'>Location</p>
              <p className='border p-2'>{address.country}, {address.city}, {address.region}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p className='font-bold p-2 border'>Timezone</p>
              <p className='border p-2'>UTC <span>{address.timezone}</span></p>
            </li>
            <li className='grid grid-cols-2'>
              <p className='font-bold p-2 border'>ISP</p>
              <p className='border p-2'>{address.isp}</p>
            </li>
          </ul>

          <div className='h-[300px]'>
            <MapContainer
              center={[address.lat, address.lng]}
              zoom={19}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <MarkerPosition address={address} />
            </MapContainer>
          </div>
        </div>
      )}
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;

interface IMarkerPositionProps {
  address: {
    lat: string;
    lng: string;
  };
}

const MarkerPosition = ({ address }: IMarkerPositionProps) => {
  const position = useMemo(() => {
    return [address.lat, address.lng];
  }, [address.lat, address.lng]);
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 19, {
      animate: false,
    });
  }, [map, position]);

  return <Marker icon={L.icon({
    iconSize: [32, 40],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: pin,
  })} position={position}>
    <Popup>This is the location of the IP Address or Domain</Popup>
  </Marker>;
};
