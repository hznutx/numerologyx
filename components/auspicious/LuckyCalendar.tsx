'use client';
import React from 'react';

type LuckyDate = {
  id: string;
  luckyDateTime: string;
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface LuckyCalendarProps {
  luckyDates: LuckyDate[];
}

const LuckyCalendar: React.FC<LuckyCalendarProps> = ({luckyDates}) => {
  const currentYear = new Date().getFullYear();

  const isLuckyDay = (year: string, monthIndex: number, day: number) => {
    const formattedDate = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    return luckyDates.some((date) => {
      const luckyDate = date.luckyDateTime.split('T')[0];
      return luckyDate === formattedDate;
    });
  };

  return (
    <div className='w-full gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-content-center place-items-center container'>
      {months.map((month, monthIndex) => (
        <div
          key={month}
          className='month'>
          <h3>{month}</h3>
          <table className='calendar-table'>
            <thead>
              <tr>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, index) => (
                  <th key={index}>{dayName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({length: 5}, (_, weekIndex) => (
                <tr key={weekIndex}>
                  {Array.from({length: 7}, (_, dayIndex) => {
                    const day = weekIndex * 7 + dayIndex + 1;
                    const date = new Date(currentYear, monthIndex, day);

                    if (date.getMonth() !== monthIndex) return <td key={dayIndex}></td>;

                    const isLucky = isLuckyDay(String(currentYear), monthIndex, day);

                    return (
                      <td
                        key={dayIndex}
                        style={{
                          padding: '10px',
                          backgroundColor: isLucky ? 'white' : 'white',
                          color: 'gray',
                          textAlign: 'center',
                          border: '1px solid #ddd',
                          position: 'relative',
                        }}>
                        {day}
                        {isLucky && (
                          <span
                            style={{
                              position: 'absolute',
                              top: '0',
                              right: '1',
                              fontSize: '0.7rem',
                              color: 'gold',
                            }}>
                            ★
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default LuckyCalendar;
