import type {NextApiRequest, NextApiResponse} from 'next';

export type PhoneNumber = {
  phone: string;
  network: string;
  price: number;
  result: number;
  available: boolean;
  rank: string;
};

let phoneNumbers: PhoneNumber[] = [
  {phone: '0912345678', network: 'AIS', price: 9666, result: 55, available: true, rank: 'A+'},
  {phone: '0923456789', network: 'TRUE', price: 8333, result: 60, available: true, rank: 'B'},
  {phone: '0834567890', network: 'DTAC', price: 7200, result: 50, available: false, rank: 'A-'},
  {phone: '0945678901', network: 'AIS', price: 9000, result: 65, available: true, rank: 'A'},
  {phone: '0956789012', network: 'AIS', price: 8700, result: 58, available: true, rank: 'B+'},
  {phone: '0867890223', network: 'TRUE', price: 7500, result: 53, available: true, rank: 'B-'},
  {phone: '0978901234', network: 'DTAC', price: 9200, result: 62, available: false, rank: 'A'},
  {phone: '0689012345', network: 'AIS', price: 9800, result: 70, available: true, rank: 'A+'},
  {phone: '0990123456', network: 'TRUE', price: 8000, result: 56, available: true, rank: 'B'},
  {phone: '0901234568', network: 'DTAC', price: 8900, result: 68, available: true, rank: 'A-'},
];

// Helper function to calculate the sum of digits in a phone number
const calculateSum = (phoneNumber: string): number =>
  phoneNumber
    .split('')
    .filter((char) => !isNaN(Number(char)))
    .reduce((acc, digit) => acc + Number(digit), 0);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method} = req;

  switch (method) {
    case 'GET': {
      const {positionCriteria, includePatterns, excludeNumbers, targetSum} = req.query;

      let filteredNumbers = phoneNumbers;

      // **Filter by specific character positions**
      if (positionCriteria) {
        try {
          const criteria: Record<string, string> = typeof positionCriteria === 'string' ? JSON.parse(positionCriteria) : positionCriteria;

          filteredNumbers = filteredNumbers.filter(({phone}) =>
            Object.entries(criteria).every(([pos, char]) => {
              const position = parseInt(pos, 10) - 1; // Convert 1-based index to 0-based
              return char === '' || phone[position] === char;
            })
          );
        } catch (error) {
          return res.status(400).json({message: 'Invalid positionCriteria format', error: error});
        }
      }

      // **Filter by include patterns**
      if (includePatterns) {
        const patterns = includePatterns.toString().split(',').filter(Boolean);
        if (patterns.length > 0) {
          filteredNumbers = filteredNumbers.filter(({phone}) => patterns.some((pattern) => phone.includes(pattern)));
        }
      }

      // **Exclude specific numbers**
      if (excludeNumbers) {
        const excludes = excludeNumbers.toString().split(',').filter(Boolean);
        if (excludes.length > 0) {
          filteredNumbers = filteredNumbers.filter(({phone}) => excludes.every((exclude) => !phone.includes(exclude)));
        }
      }

      // **Filter by target sum**
      if (targetSum) {
        const sum = parseInt(targetSum as string, 10);
        if (!isNaN(sum)) {
          filteredNumbers = filteredNumbers.filter(({phone}) => calculateSum(phone) === sum);
        }
      }

      return res.status(200).json({message: 'Filtered results', data: filteredNumbers});
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({message: `Method ${method} not allowed.`});
  }
}
