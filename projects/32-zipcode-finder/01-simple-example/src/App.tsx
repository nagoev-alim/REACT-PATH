import { toast, Toaster } from 'react-hot-toast';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import mock from './mock';
import { LineWobble } from '@uiball/loaders';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import pin from '/images/pin.svg';

interface Place {
  latitude: string;
  longitude: string;
  state: string;
  ['place name']: string;
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @description Главный компонент приложения "ZipCode Finder".
 */
const App = () => {
  /**
   * Состояние для хранения адреса, полученного по ZIP-коду.
   * @type {string | null}
   */
  const [address, setAddress] = useState<Place | null>(null);

  /**
   * Состояние для отслеживания процесса загрузки данных.
   * @type {boolean}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /**
   * Эффект, который выполняется при монтировании компонента.
   */
  useEffect(function() {
    (async () => {
      const zipcode = localStorage.getItem('zipcode');
      await fetchData(zipcode || { country: 'US', code: '40356' });
    })();
  }, []);

  /**
   * Функция для обработки отправки формы с выбором страны и вводом ZIP-кода.
   * @param {FormEvent<HTMLFormElement>} event - Событие отправки формы.
   * @returns {Promise<void>}
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const country = formData.get('country') as string;
    const code = formData.get('code') as string;
    if (!country || code.trim().toLowerCase().length === 0) {
      toast.error('Please select country and enter zipcode.');
      return;
    }
    localStorage.setItem('zipcode', JSON.stringify({ country, code }));
    await fetchData({ country, code });
  }

  /**
   * Функция для загрузки адреса по ZIP-коду.
   * @param {{ country: string, code: string }} - Объект с выбранной страной и ZIP-кодом.
   * @returns {Promise<void>}
   */
  async function fetchData({ country, code }: { country: string, code: string }): Promise<void> {
    try {
      setIsLoading(true);
      setAddress(null);
      const { data: { places } } = await axios.get(`https://api.zippopotam.us/${country}/${code}`);
      const { latitude, longitude, state, ['place name']: placeName }: Place = places[0];
      setAddress({ latitude, longitude, state, placeName });
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
      <h1 className='text-center font-bold text-4xl'>ZipCode Finder</h1>

      <form className='grid gap-2' onSubmit={handleSubmit}>
        <label>
          <select className='input' name='country'>
            <option value=''>Select Country</option>
            {mock.map(({ name, value }) => <option key={value} value={value}>{name}</option>)}
          </select>
        </label>
        <label>
          <input className='input' type='text' name='code' placeholder='Zip Code' />
        </label>
        <button type='submit' className='btn'>Search</button>
      </form>

      {isLoading && (
        <div className='grid place-items-center'>
          <LineWobble size={100} lineWeight={5} speed={1.75} color='black' />
        </div>
      )}

      {address && (
        <div className='grid gap-3'>
          <ul>
            <li className='grid grid-cols-2'>
              <p className='font-bold p-2 border'>Latitude:</p>
              <p className='p-2 border'>{address.latitude}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p className='font-bold p-2 border'>Longitude:</p>
              <p className='p-2 border'>{address.longitude}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p className='font-bold p-2 border'>State:</p>
              <p className='p-2 border'>{address.state}</p>
            </li>
            <li className='grid grid-cols-2'>
              <p className='font-bold p-2 border'>Place Name:</p>
              <p className='p-2 border'>{address.placeName}</p>
            </li>
          </ul>
          <div className='h-[300px]'>
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
        </div>
      )}

      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;

interface IMarkerPositionProps {
  address: {
    latitude: string;
    longitude: string;
  };
}

/**
 * React-компонент для отображения маркера на карте.
 * @param {object} address - Объект с данными адреса.
 */
const MarkerPosition = ({ address }: IMarkerPositionProps) => {
  /**
   * Мемоизированная позиция маркера на карте.
   */
  const position = useMemo(() => {
    return [address.latitude, address.longitude];
  }, [address.latitude, address.longitude]);
  /**
   * Получение экземпляра карты.
   */
  const map = useMap();
  /**
   * Эффект для перемещения карты к позиции маркера.
   */
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
