import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log(req.query, req.body, 8494465)
    const { image, nickName, slogan } = req.body;
    // console.log(image,nickName,slogan)
    const id:any = req.query._id
    if (req.method === 'PUT') {
        client
            .patch(id)
            .set({ slogan,nickName,image:image })
            .commit()
    }
    res.status(200).json(123);
}
