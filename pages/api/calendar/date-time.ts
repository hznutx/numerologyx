import type {NextApiRequest, NextApiResponse} from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const currentDateTime = new Date().toISOString();
    return res.status(200).json({currentDateTime});
  }

  return res.status(405).json({
    message: 'Method not allowed, please use GET',
  });
}
