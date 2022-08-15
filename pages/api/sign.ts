import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
// import { getAllProjects } from '../../utils/queries'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const newUser = req.body;
        console.log(newUser)
        client.create(newUser).then(() => {
            res.status(200).json('user created');
        });
    }
}
