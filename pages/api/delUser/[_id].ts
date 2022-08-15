import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
// import { getAllUsers } from '../../utils/queries'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log(req.query,55)
    const id:any = req.query._id
    client
        .delete(id)
        .then(() => {
            console.log('ok')
        })
        .catch((err) => {
            console.error('Delete failed: ', err.message)
        })
    res.status(200).json(12);

}
