'use client';

import {Input} from '@nextui-org/input';
import React, {useState} from 'react';

type FilterCriteria = {
  positionCriteria?: Record<number, string>;
  includePatterns?: string[];
  excludeNumbers?: string[];
  targetSum?: number;
};

const position = Array.from({length: 10}, (_, i) => i + 1);

const HomePage = () => {
  const [numbers, setNumbers] = useState<string[]>(['0891234567', '0912894567', '0804567890', '0914756123']);
  const [result, setResult] = useState<string[]>([]);
  const [positionCriteria, setPositionCriteria] = useState<Record<number, string>>(position.reduce((acc, pos) => ({...acc, [pos]: pos == 1 ? 0 : ''}), {}));
  const [includePatterns, setIncludePatterns] = useState<string[]>([]);
  const [excludeNumbers, setExcludeNumbers] = useState<string[]>([]);
  const [targetSum, setTargetSum] = useState<number | undefined>(undefined);

  const handleInputChange = (index: number, value: string) => {
    setPositionCriteria((prev) => ({
      ...prev,
      [index + 1]: value,
    }));
  };

  const filterLuckyNumbers = (numbers: string[], {positionCriteria, includePatterns, excludeNumbers, targetSum}: FilterCriteria): string[] => {
    return numbers.filter((number) => {
      if (positionCriteria) {
        for (const [pos, digit] of Object.entries(positionCriteria)) {
          const position = parseInt(pos, 10);
          if (digit && number[position - 1] !== digit) {
            console.log(`Position ${position} does not match criteria (${digit})`);
            return false;
          }
        }
      }

      if (includePatterns && includePatterns.length > 0) {
        if (!includePatterns.some((pattern) => number.includes(pattern))) {
          console.log(`Number ${number} does not contain any of the includePatterns`);
          return false;
        }
      }

      if (excludeNumbers && excludeNumbers.length > 0) {
        if (excludeNumbers.some((exclude) => number.includes(exclude))) {
          console.log(`Number ${number} contains an excluded number (${excludeNumbers})`);
          return false;
        }
      }

      if (targetSum !== undefined) {
        const sum = number.split('').reduce((acc, char) => acc + parseInt(char, 10), 0);
        if (sum !== targetSum) {
          console.log(`Number ${number} sum (${sum}) does not match targetSum (${targetSum})`);
          return false;
        }
      }

      console.log(`Number ${number} passed all criteria`);
      return true;
    });
  };

  const handleFilter = () => {
    const filteredNumbers = filterLuckyNumbers(numbers, {
      positionCriteria,
      includePatterns,
      excludeNumbers,
      targetSum,
    });

    console.log('Filtered Numbers after applying all criteria:', filteredNumbers);
    setResult(filteredNumbers);
  };

  return (
    <div className='container mx-auto space-y-4 max-w-md'>
      <h1>ค้นหาเบอร์มงคล</h1>

      <div className='flex gap-1'>
        {position.map((num, i) => (
          <Input
            type='text'
            key={i}
            radius='full'
            classNames={{base: 'w-10', inputWrapper: 'm-0 px-3'}}
            variant='bordered'
            value={positionCriteria[num]}
            onChange={(e) => {
              const criteria = e.target.value;
              handleInputChange(i, criteria);
            }}
          />
        ))}
      </div>

      <div>
        <label>ชุดเลขที่ต้องการ (คั่นด้วย ,): </label>
        <Input
          type='text'
          placeholder='ตัวอย่าง: 289,456'
          onChange={(e) => setIncludePatterns(e.target.value.split(','))}
        />
      </div>

      <div>
        <label>เลขที่ไม่ชอบ (คั่นด้วย ,): </label>
        <Input
          type='text'
          placeholder='ตัวอย่าง: 4,7'
          onChange={(e) => setExcludeNumbers(e.target.value.split(','))}
        />
      </div>

      <div>
        <label>ผลรวมที่ต้องการ: </label>
        <Input
          type='number'
          placeholder='ตัวอย่าง: 45'
          onChange={(e) => setTargetSum(Number(e.target.value))}
        />
      </div>

      <button
        onClick={handleFilter}
        style={{marginTop: '10px'}}>
        ค้นหา
      </button>

      <h2>ผลลัพธ์:</h2>
      <p>
        {result.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </p>
    </div>
  );
};

export default HomePage;
