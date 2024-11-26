'use client';
import {Input} from '@nextui-org/input';
import React, {useState} from 'react';

const PositionComponent = () => {
  const [position, setPosition] = useState<string[]>([]);

  const handleInputChange = (index: number, value: string) => {
    // Create a new copy of the position array
    const updatedPosition = [...position];
    // Update the value at the specified index
    updatedPosition[index] = value;
    // Update the state with the modified array
    setPosition(updatedPosition);
  };

  return (
    <div className='flex gap-1'>
      <label>ตำแหน่งตัวเลข (เช่น 3=9): </label>
      {position.map((num, i) => (
        <Input
          type='text'
          key={i}
          radius='full'
          classNames={{base: 'w-10', inputWrapper: 'm-0 px-3'}}
          variant='bordered'
          value={position[i] || ''} // Bind value to the state array
          onChange={(e) => {
            const criteria = e.target.value;
            console.log(`Index: ${i}, Value: ${criteria}`);
            handleInputChange(i, criteria); // Call the handler with the index and value
          }}
        />
      ))}
    </div>
  );
};

export default PositionComponent;
