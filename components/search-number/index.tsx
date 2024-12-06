'use client';

import Pyramid from '@/components/elements/triangular';
import {PhoneNumber} from '@/pages/api/phone-numbers';
import {usePhoneNumbers} from '@/services/find';
import {Input} from '@nextui-org/input';
import React, {useState} from 'react';

const positions = Array.from({length: 10}, (_, i) => i + 1);

const SearchPhoneNumber = () => {
  const [filters, setFilters] = useState({
    positionCriteria: positions.reduce((acc, pos) => ({...acc, [pos]: pos === 1 ? '0' : ''}), {} as Record<number, string>),
    includePatterns: [] as string[],
    excludeNumbers: [] as string[],
    targetSum: undefined as number | undefined,
  });

  const {phoneNumbers, isLoading, error} = usePhoneNumbers(filters);

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({...prev, [key]: value}));
  };

  return (
    <div className='container mx-auto space-y-4 max-w-md'>
      <Pyramid />
      <h1 className='text-xl font-semibold'>ค้นหาเบอร์มงคล</h1>

      <div className='flex gap-1'>
        {positions.map((num, index) => (
          <Input
            key={index}
            type='text'
            radius='full'
            classNames={{base: 'w-10', inputWrapper: 'm-0 px-3'}}
            variant='bordered'
            value={filters.positionCriteria[num]}
            onChange={(e) =>
              updateFilter('positionCriteria', {
                ...filters.positionCriteria,
                [num]: e.target.value,
              })
            }
          />
        ))}
      </div>

      <div>
        <label>ชุดเลขที่ต้องการ (คั่นด้วย ,): </label>
        <Input
          type='text'
          placeholder='ตัวอย่าง: 289,456'
          onChange={(e) =>
            updateFilter(
              'includePatterns',
              e.target.value.split(',').map((s) => s.trim())
            )
          }
        />
      </div>

      {/* Exclude Numbers */}
      <div>
        <label>เลขที่ไม่ชอบ (คั่นด้วย ,): </label>
        <Input
          type='text'
          placeholder='ตัวอย่าง: 4,7'
          onChange={(e) =>
            updateFilter(
              'excludeNumbers',
              e.target.value.split(',').map((s) => s.trim())
            )
          }
        />
      </div>

      {/* Target Sum */}
      <div>
        <label>ผลรวมที่ต้องการ: </label>
        <Input
          type='number'
          placeholder='ตัวอย่าง: 45'
          onChange={(e) => updateFilter('targetSum', Number(e.target.value) || undefined)}
        />
      </div>

      {/* Results */}
      <h2 className='text-lg font-medium mt-4'>ผลลัพธ์:</h2>
      {isLoading && <p>กำลังโหลด...</p>}
      {error && <p className='text-red-500 mt-2'>เกิดข้อผิดพลาด: {error.message}</p>}
      {!isLoading && phoneNumbers.length === 0 && <p>ไม่มีผลลัพธ์</p>}
      <ul className='list-disc pl-5'>
        {phoneNumbers.map((data: PhoneNumber, index: number) => (
          <li key={index}>{data.phone}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPhoneNumber;
