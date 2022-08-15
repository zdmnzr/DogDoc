import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { getUserProfile } from '../../../utils/queries'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // console.log(req.query.account,66666)
        const query = getUserProfile(req.query.account);

        const data = await client.fetch(query);

        res.status(200).json(data);
    }
}
