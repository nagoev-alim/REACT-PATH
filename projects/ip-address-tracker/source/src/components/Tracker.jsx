import { useEffect, useMemo, useState } from 'react';
import { LineWobble } from '@uiball/loaders';
import { toast } from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import axios from 'axios';
import pin from '../assets/images/pin.svg';

const Tracker = () => {
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchData('8.8.8.8');
    })();
  }, []);

  // 🚀 METHODS: ===============================

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const ip = Object.fromEntries(new FormData(form).entries()).ip.trim().toLowerCase();
    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
      toast.error('Please enter valid IP.');
      return;
    }
    localStorage.setItem('ip', JSON.stringify(ip));
    await fetchData(ip);
  };

  const fetchData = async (address) => {
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
  };

  // 🚀 RENDER: ================================
  return <div className='tracker'>
    <h1 className='title tracker__title'>IP Address Tracker</h1>

    <form onSubmit={onSubmit}>
      <input type='text' name='ip' placeholder='Search for any IP address or domain' />
    </form>

    {isLoading && <div className='loader'>
      <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
    </div>}

    {address && <>
      <ul>
        <li>
          <p className='h5'>IP Address</p>
          <p>{address.ip}</p>
        </li>
        <li>
          <p className='h5'>Location</p>
          <p>{address.country}, {address.city}, {address.region}</p>
        </li>
        <li>
          <p className='h5'>Timezone</p>
          <p>UTC <span>{address.timezone}</span></p>
        </li>
        <li>
          <p className='h5'>ISP</p>
          <p>{address.isp}</p>
        </li>
      </ul>

      <div className='map'>
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
    </>}
  </div>;
};

const MarkerPosition = ({ address }) => {
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

export default Tracker;
