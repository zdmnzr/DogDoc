import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { getUserProfileById } from '../../../utils/queries'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        console.log(req.query._id,77777)
        const query = getUserProfileById(req.query._id);

        const data = await client.fetch(query);

        res.status(200).json(data);
    }
}
