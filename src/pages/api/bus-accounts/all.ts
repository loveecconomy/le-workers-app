import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import BusAccount from '@/backend/controllers/BusAccount';
import { routeGuard } from '@/backend/middlewares/routeGuard';
const handler: NextApiHandler = async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {
        switch (req.method) {
            case 'POST':
                return BusAccount.getAccount(req, res);
            default:
                return res.status(405).json({ message: "Method not allowed" });

        }
    } catch (error) {
        return res.status(400).json({ message: error })
    }

}



export default routeGuard(true)(handler);