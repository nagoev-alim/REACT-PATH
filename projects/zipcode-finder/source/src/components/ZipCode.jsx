import { useEffect, useMemo, useState } from 'react';
import { LineWobble } from '@uiball/loaders';
import { toast } from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import axios from 'axios';
import pin from '../assets/images/pin.svg';
import mock from '../mock/mock.js';

const ZipCode = () => {
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchData(JSON.parse(localStorage.getItem('zipcode')) || { country: 'US', code: '40356' });
    })();
  }, []);

  // 🚀 METHODS: ===============================

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const { country, code } = Object.fromEntries(new FormData(form).entries());
    if (!country || code.trim().toLowerCase().length === 0) {
      toast.error('Please select country and enter zipcode.');
      return;
    }
    localStorage.setItem('zipcode', JSON.stringify({ country, code }));
    await fetchData({ country, code });
  };

  const fetchData = async ({ country, code }) => {
    try {
      setIsLoading(true);
      setAddress(null);
      const { data: { places } } = await axios.get(`https://api.zippopotam.us/${country}/${code}`);
      const { latitude, longitude, state, ['place name']: placeName } = places[0];
      setAddress({ latitude, longitude, state, placeName });
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setAddress(null);
      toast.error('Something went wrong, open dev console.');
    }
  };

  // 🚀 RENDER: ================================
  return <div className='zipcode'>
    <h1 className='title zipcode__title'>ZipCode Finder</h1>

    <form onSubmit={onSubmit}>
      <label>
        <select name='country'>
          <option value=''>Select Country</option>
          {mock.map(({ name, value }) => <option key={value} value={value}>{name}</option>)}
        </select>
      </label>
      <label>
        <input type='text' name='code' placeholder='Zip Code' />
      </label>
      <button type='submit' className='button button--primary button--fluid'>Search</button>
    </form>

    {isLoading && <div className='loader'>
      <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
    </div>}

    {address && <>
      <ul>
        <li>
          <p className='h5'>Latitude:</p>
          <p>{address.latitude}</p>
        </li>
        <li>
          <p className='h5'>Longitude:</p>
          <p>{address.longitude}</p>
        </li>
        <li>
          <p className='h5'>State:</p>
          <p>{address.state}</p>
        </li>
        <li>
          <p className='h5'>Place Name:</p>
          <p>{address.placeName}</p>
        </li>
      </ul>
      <div className='map'>
        <MapContainer
          center={[address.latitude, address.longitude]}
          zoom={15}
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
    return [address.latitude, address.longitude];
  }, [address.latitude, address.longitude]);
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
    <Popup>This is the location of the ZipCode</Popup>
  </Marker>;
};

export default ZipCode;
