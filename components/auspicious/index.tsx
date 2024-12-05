'use client';

import {useEffect, useState} from 'react';
import LuckyCalendar from './LuckyCalendar';
import {ZonedDateTime, parseAbsoluteToLocal} from '@internationalized/date';
import {Button, DatePicker} from '@nextui-org/react';

type LuckyDate = {
  id: string;
  luckyDateTime: string; // ISO string format: "YYYY-MM-DDTHH:mm:ss"
};
interface ILuckyTimePage {
  year: string;
}

const LuckyTimeYearPage: React.FC<ILuckyTimePage> = ({year}) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [luckyDates, setLuckyDates] = useState<LuckyDate[]>([]);
  const [newLuckyDate, setNewLuckyDate] = useState({
    luckyDate: '',
    luckyTime: '',
  });

  useEffect(() => {
    const fetchDateTime = async () => {
      const response = await fetch('/api/calendar/date-time');
      const data = await response.json();
      setCurrentDateTime(data.currentDateTime);
    };
    fetchDateTime();
  }, []);

  useEffect(() => {
    const fetchLuckyDates = async () => {
      const response = await fetch('/api/calendar/lucky-dates');
      const data = await response.json();
      setLuckyDates(data.luckyDates);
    };
    fetchLuckyDates();
  }, []);

  const fullDateTime = `${newLuckyDate.luckyDate}T${newLuckyDate.luckyTime}:00`;

  const addLuckyDate = async () => {
    const response = await fetch('/api/calendar/lucky-dates', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        luckyDateTime: fullDateTime,
      }),
    });
    const data = await response.json();
    if (data.luckyDate) {
      setLuckyDates((prevDates) => [...prevDates, data.luckyDate]);
      setNewLuckyDate({luckyDate: '', luckyTime: ''});
    }
  };

  const handleDateChange = (date: ZonedDateTime | null) => {
    if (date) {
      const localDate = date.toDate();
      const formattedDate = localDate.toISOString().split('T')[0];
      const formattedTime = localDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setNewLuckyDate({
        luckyDate: formattedDate,
        luckyTime: formattedTime,
      });
    }
  };

  const luckyDateValue = newLuckyDate.luckyDate ? parseAbsoluteToLocal(`${newLuckyDate.luckyDate}T${newLuckyDate.luckyTime}:00Z`) : undefined;

  return (
    <div className='w-full items-center flex flex-col gap-4'>
      <h1>Lucky Time for Year {year}</h1>
      <LuckyCalendar luckyDates={luckyDates} />
      <h3>Add a New Lucky Date</h3>
      <div className='w-fit flex gap-6'>
        <div className='w-80'>
          <DatePicker
            size='sm'
            granularity='minute'
            value={luckyDateValue}
            onChange={handleDateChange}
          />
        </div>{' '}
        <Button onClick={addLuckyDate}>Add Lucky Date</Button>
      </div>
    </div>
  );
};

export default LuckyTimeYearPage;
