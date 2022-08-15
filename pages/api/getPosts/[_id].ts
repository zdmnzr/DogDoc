import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { getPosts } from '../../../utils/queries'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        console.log(req.query._id)
        const _id = req.query._id
        // const query = getPosts();
        const data = await client.fetch(getPosts(_id));
        res.status(200).json(data);
    }
}
