import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
// import useAuthStore from '../../../store/authStore'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { userProfile } = useAuthStore();

    if (req.method === 'PUT') {
        const {content,postedBy} = req.body;
        // console.log(postedBy,123)
        const {project_id}:any = req.query
        const data = await client
            .patch(project_id)
            .setIfMissing({ comments: [] })
            .insert('before', 'comments[0]', [
                {
                    content:content,
                    _key: nanoid(),
                    postedBy:{_type:'user', nickName:postedBy.nickName, _id:postedBy._id, image:postedBy.image}
                }
            ])
            .commit();

            res.status(200).json(data);
    }
}
