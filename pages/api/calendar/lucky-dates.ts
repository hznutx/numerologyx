import type {NextApiRequest, NextApiResponse} from 'next';

type LuckyDate = {
  id: string;
  luckyDateTime: string;
};

let luckyDates: LuckyDate[] = [];

// Handler for GET request (fetch lucky dates)
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({luckyDates});
  }

  // Handler for POST request (add new lucky date)
  if (req.method === 'POST') {
    const {luckyDateTime} = req.body;

    // Ensure the luckyDateTime is provided and valid
    if (!luckyDateTime) {
      return res.status(400).json({message: 'luckyDateTime is required'});
    }

    // Optional: Validate if the date-time string is in correct ISO 8601 format
    const parsedDate = new Date(luckyDateTime);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({message: 'Invalid date-time format'});
    }

    // Create the new lucky date object with the provided luckyDateTime
    const newLuckyDate: LuckyDate = {
      id: Math.random().toString(36).substr(2, 9),
      luckyDateTime,
    };

    // Push the new lucky date into the luckyDates array
    luckyDates.push(newLuckyDate);

    return res.status(200).json({
      message: 'Lucky date added successfully',
      luckyDate: newLuckyDate,
    });
  } else {
    // Handle other HTTP methods if necessary
    res.status(405).json({message: 'Method Not Allowed'});
  }

  // Handler for DELETE request (delete a lucky date)
  if (req.method === 'DELETE') {
    const {id} = req.body;
    luckyDates = luckyDates.filter((date) => date.id !== id);
    return res.status(200).json({message: 'Lucky date deleted successfully'});
  }

  // Method Not Allowed for other HTTP methods
  return res.status(405).json({
    message: 'Method not allowed, please use GET, POST, PUT, or DELETE',
  });
}
