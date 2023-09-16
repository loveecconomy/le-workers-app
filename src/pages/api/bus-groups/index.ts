import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import BusGroup from '@/backend/controllers/BusGroup';
const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        switch (req.method) {
            case 'GET':
                return BusGroup.get(req, res);
            case 'POST':
                return BusGroup.insert(req, res);
            default:
                break;

        }
    } catch (error) {
        return res.status(400).json({ message: error })
    }

}



export default handler;