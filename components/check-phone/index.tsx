'use client';
import {Input} from '@nextui-org/input';
import React, {useState} from 'react';
import toast from 'react-hot-toast';

const CheckResultMeaningPhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [result, setResult] = useState<{sum: number; message: string} | null>(null);

  const handleCalculate = async () => {
    try {
      if (!phoneNumber.startsWith('0')) {
        toast.error('เบอร์โทรศัพท์ต้องเริ่มต้นด้วย 0');
        return;
      }

      const response = await fetch('/api/calculate-sum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phoneNumber}),
      });

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการคำนวณ');
      }

      const data = await response.json();
      setResult({sum: data.sum, message: data.message});
    } catch (error) {
      console.error(error);
      setResult({sum: 0, message: 'ไม่สามารถคำนวณได้'});
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className='space-y-3'>
      <h1>คำนวณผลรวมเบอร์โทรศัพท์</h1>
      <Input
        type='text'
        placeholder='กรอกเบอร์โทรศัพท์'
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        style={{marginRight: '10px'}}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleCalculate}>คำนวณ</button>

      {result && (
        <div>
          <h2>ผลลัพธ์:</h2>
          <p>ผลรวม: {result.sum}</p>
          <p>ข้อความ: {result.message}</p>
        </div>
      )}
    </div>
  );
};

export default CheckResultMeaningPhoneNumber;
