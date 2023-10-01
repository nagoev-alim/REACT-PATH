import { addZero } from './utils/addZero.ts';
import mp3 from '/sounds/ringtone.mp3';
import React, { FC, useEffect, useRef, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

/**
 * Интерфейс для настройки будильника.
 * @interface {object} IAlarmSetup
 * @property {string[]} hours - Список доступных часов.
 * @property {string[]} minutes - Список доступных минут.
 * @property {string[]} ampm - Варианты "AM" и "PM".
 */
interface IAlarmSetup {
  hours: string[];
  minutes: string[];
  ampm: string[];
}

/**
 * Интерфейс для данных формы настройки будильника.
 * @interface {object} IFormData
 * @property {string} hours - Часы.
 * @property {string} minutes - Минуты.
 * @property {string} ampm - "AM" или "PM".
 */
interface IFormData {
  hours: string,
  minutes: string,
  ampm: string,
}

/**
 * React-компонент приложения.
 * @function
 * @name App
 * @type {FC}
 * @description Главный компонент приложения "Alarm Clock".
 */
const App: FC = () => {
  /**
   * Состояние для отображения времени на экране.
   * @type {string}
   */
  const [label, setLabel] = useState<string>('00:00:00 PM');
  /**
   * Состояние для хранения установленного времени будильника.
   * @type {string | null}
   */
  const [alarmTime, setAlarmTime] = useState<string | null>(null);
  /**
   * Состояние, указывающее, установлен ли будильник.
   * @type {boolean}
   */
  const [isAlarmSet, setIsAlarmSet] = useState<boolean>(false);
  /**
   * Состояние для текста на кнопке установки/сброса будильника.
   * @type {string}
   */
  const [btnLabel, setBtnLabel] = useState<string>('Set Alarm');
  /**
   * Состояние для данных формы настройки будильника.
   * @type {IFormData}
   */
  const [formData, setFormData] = useState<IFormData>({ hours: 'Hour', minutes: 'Minute', ampm: 'AM/PM' });
  /**
   * Референс на изображение будильника.
   * @type {React.MutableRefObject<HTMLImageElement | null>}
   */
  const imgRef = useRef<HTMLImageElement | null>(null);
  /**
   * Референс на корневой элемент приложения.
   * @type {React.MutableRefObject<HTMLDivElement | null>}
   */
  const bodyRef = useRef<HTMLDivElement | null>(null);
  /**
   * Референс на аудио для воспроизведения сигнала будильника.
   * @type {React.MutableRefObject<HTMLAudioElement>}
   */
  const audio = useRef<HTMLAudioElement>(new Audio(mp3));
  /**
   * Настройки для выбора часов, минут и "AM/PM".
   * @type {IAlarmSetup}
   */
  const alarmSetup: IAlarmSetup = {
    hours: Array.from({ length: 12 }, (_, i) => addZero(i + 1)),
    minutes: Array.from({ length: 60 }, (_, i) => addZero(i + 1)),
    ampm: ['AM', 'PM'],
  };
  /**
   * Эффект, отслеживающий текущее время и воспроизводящий сигнал будильника.
   * @function
   * @name useEffect
   */
  useEffect(function() {
    let interval = setInterval(() => {
      const date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let ampm = 'AM';
      if (h >= 12) {
        h = h - 12;
        ampm = 'PM';
      }
      h = h === 0 ? 12 : h;
      setLabel(`${addZero(h)}:${addZero(m)}:${addZero(s)} ${ampm}`);
      if (alarmTime && alarmTime === `${addZero(h)}:${addZero(m)} ${ampm}`) {
        audio.current.play();
        audio.current.loop = true;
        imgRef.current?.classList.add('animate-bounce');
      }
    }, 1000);

    return function() {
      return clearInterval(interval);
    };
  }, [alarmTime]);

  /**
   * Обработчик изменения значения в селекторах.
   * @function
   * @param {React.ChangeEvent<HTMLSelectElement>} event - Событие изменения.
   */
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { name, value } = event.target as HTMLSelectElement;
    setFormData({ ...formData, [name]: value });
  }

  /**
   * Обработчик установки или сброса будильника.
   * @function
   */
  function handleSetAlarm(): void {
    if (isAlarmSet) {
      setAlarmTime(null);
      setIsAlarmSet(false);
      audio.current.pause();
      bodyRef.current?.classList.remove('disabled');
      imgRef.current?.classList.remove('animate-bounce');
      setFormData({ hours: 'Hour', minutes: 'Minute', ampm: 'AM/PM' });
      setBtnLabel('Set Alarm');
    } else {
      const time = `${formData.hours}:${formData.minutes} ${formData.ampm}`;
      if (time.includes('Hour') || time.includes('Minute') || time.includes('AM/PM')) {
        toast.error('Please, select a valid time to set alarm!');
        return;
      }
      setAlarmTime(time);
      setIsAlarmSet(true);
      bodyRef.current?.classList.add('disabled');
      setBtnLabel('Clear Alarm');
    }
  }

  return (
    <div className='bg-white border-2 shadow rounded max-w-md w-full p-3 grid gap-5'>
      <h1 className='text-center font-bold text-4xl'>Alarm Clock</h1>
      <div className='grid place-items-center gap-3' ref={bodyRef}>
        <img
          ref={imgRef}
          className='w-[100px]'
          src='https://lh3.googleusercontent.com/drive-viewer/AITFw-w0VHGrXur-i4yRzoIKp820T_4W2IuOi2seZCRgAJcJtn-J0iw8zGyENlR14gD9yMRUvGyN4olXizfW1DhcBdGHZx4n=s1600'
          alt='Alarm'
        />
        <p className='font-bold text-center text-5xl'>{label}</p>
        <div className='grid gap-3 w-full sm:grid-cols-3'>
          <Select
            value={formData.hours}
            name='hours'
            dataItems={alarmSetup.hours}
            handleChange={handleChange}
            label='Hour'
          />
          <Select
            value={formData.minutes}
            name='minutes'
            dataItems={alarmSetup.minutes}
            handleChange={handleChange}
            label='Minute'
          />
          <Select
            value={formData.ampm}
            name='ampm'
            dataItems={alarmSetup.ampm}
            handleChange={handleChange}
            label='AM/PM'
          />
        </div>
        <button onClick={handleSetAlarm} className='btn w-full'>{btnLabel}</button>
      </div>
      <Toaster position='bottom-center' />
    </div>
  );
};

export default App;

/**
 * Интерфейс для свойств компонента Select.
 * @interface
 */
interface ISelectProps {
  /**
   * Название метки для выпадающего списка.
   */
  label: string,

  /**
   * Уникальное имя компонента Select.
   */
  name: string,

  /**
   * Выбранное значение в выпадающем списке.
   */
  value: string,

  /**
   * Обработчик события изменения значения выпадающего списка.
   * @param {React.ChangeEvent<HTMLSelectElement>} event - Событие изменения.
   */
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,

  /**
   * Массив элементов, которые будут представлены в выпадающем списке.
   */
  dataItems: string[]
}

/**
 * Компонент Select представляет собой выпадающий список.
 * @function
 * @param {ISelectProps} props - Свойства компонента Select.
 * @returns {JSX.Element} Возвращает JSX-элемент выпадающего списка.
 */
const Select: FC<ISelectProps> = ({ label, name, value, handleChange, dataItems }) => {
  return (
    <select name={name} value={value} onChange={handleChange} className='input'>
      <option value={label}>{label}</option>
      {dataItems.map((option: string) => <option key={option} value={option}>{option}</option>)}
    </select>
  );
};
