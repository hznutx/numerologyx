import type { NextApiRequest, NextApiResponse } from 'next';

type SumResponse = {
  phoneNumber: string;
  sum: number;
  message: string;
};

const calculateSum = (phoneNumber: string): number => {
  return phoneNumber
    .split('')
    .filter((char) => !isNaN(Number(char)))
    .reduce((acc, digit) => acc + Number(digit), 0);
};

export default function handler(req: NextApiRequest, res: NextApiResponse<SumResponse>) {
  if (req.method === 'POST') {
    const { phoneNumber } = req.body;

    if (!phoneNumber || typeof phoneNumber !== 'string') {
      return res.status(400).json({
        phoneNumber: '',
        sum: 0,
        message: 'กรุณาส่งหมายเลขโทรศัพท์ที่ถูกต้อง',
      });
    }

    const sum = calculateSum(phoneNumber);

    return res.status(200).json({
      phoneNumber,
      sum,
      message: 'คำนวณผลรวมสำเร็จ',
    });
  } else {
    return res.status(405).json({
      phoneNumber: '',
      sum: 0,
      message: 'Method ไม่รองรับ, กรุณาใช้ POST',
    });
  }
}
