import React, { ChangeEvent, createContext, useContext, useEffect, useRef, useState } from 'react';
import { IAppContextProps } from '../types';
import mp3 from '/sounds/ringtone.mp3';
import { addZero } from '../utils/addZero.ts';
import { toast } from 'react-hot-toast';

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
 * Контекст приложения.
 * @type {React.Context<IAppContextProps | null>}
 */
const AppContext = createContext<IAppContextProps | null>(null);


/**
 * Поставщик контекста приложения.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние элементы, для которых предоставляется контекст.
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [label, setLabel] = useState<string>('00:00:00 PM');
  const [alarmTime, setAlarmTime] = useState<string | null>(null);
  const [isAlarmSet, setIsAlarmSet] = useState<boolean>(false);
  const [btnLabel, setBtnLabel] = useState<string>('Set Alarm');
  const [formData, setFormData] = useState<IFormData>({ hours: 'Hour', minutes: 'Minute', ampm: 'AM/PM' });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const audio = useRef<HTMLAudioElement>(new Audio(mp3));
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
   * @param {ChangeEvent<HTMLSelectElement>} event - Событие изменения.
   */
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
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
    <AppContext.Provider value={{ handleChange, handleSetAlarm, label, btnLabel, formData, imgRef, bodyRef }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Хук для использования контекста приложения.
 * @returns {IAppContextProps} Значение контекста приложения.
 * @throws {Error} Если хук используется вне компонента AppProvider.
 */
export const useAppContext = (): IAppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext должен использоваться внутри AppProvider');
  }
  return context;
};
