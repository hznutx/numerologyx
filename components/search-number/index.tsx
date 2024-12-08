'use client';
import {Input} from '@nextui-org/input';
import React, {useState} from 'react';
import Triangular from '../elements/triangular';
import {trimRegexAndThaiCharacters} from '@/utils';
import PhoneCard, {IPhoneData} from '../card/PhoneCard';
import {Button, useDisclosure} from '@nextui-org/react';

const positions = Array.from({length: 10}, (_, i) => i + 1);

interface ISearch {
  filters: {
    positionCriteria: any;
    includePatterns: string[];
    excludeNumbers: string[];
    targetSum: number | undefined;
  };
  updateFilter: (key: 'positionCriteria' | 'includePatterns' | 'excludeNumbers' | 'targetSum', value: any) => void;
}

const SearchPhoneNumber: React.FC<ISearch> = ({updateFilter, filters}) => {
  return (
    <div className='container mx-auto w-full'>
      <Triangular />
      <div className='max-w-xs space-y-4 md:max-w-md'>
        <h1 className='text-xl font-semibold'>ค้นหาเบอร์มงคล</h1>
        <div className='flex gap-1'>
          {positions.map((num, index) => (
            <Input
              key={index}
              type='text'
              radius='full'
              classNames={{base: 'w-10', input: 'text-xl text-center', innerWrapper: 'w-fit justify-center', inputWrapper: 'm-0 p-0'}}
              variant='bordered'
              value={trimRegexAndThaiCharacters(filters.positionCriteria[num])}
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
      </div>
    </div>
  );
};

export default SearchPhoneNumber;
