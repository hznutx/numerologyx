import type {NextApiRequest, NextApiResponse} from 'next';

// Handler for GET request to fetch current date and time
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const currentDateTime = new Date().toISOString();
    return res.status(200).json({currentDateTime});
  }

  // Method Not Allowed for other HTTP methods
  return res.status(405).json({
    message: 'Method not allowed, please use GET',
  });
}
