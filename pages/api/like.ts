import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { nanoid } from 'nanoid';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { userId, projectId, bool } = req.body;

        const data =                  //给project添加点赞的user
            bool ? await client
                .patch(projectId)
                .setIfMissing({ likeds: [] })
                .insert('after', 'likeds[-1]', [
                    {
                        _key: nanoid(),
                        _ref: userId
                    }
                ])
                .commit()
                : await client
                    .patch(projectId)
                    .unset([`likeds[_ref=="${userId}"]`])
                    .commit();

        const hh =             //给user添加点过赞的project
            bool ? await client
                .patch(userId)
                .setIfMissing({ likes: [] })
                .insert('after', 'likes[-1]', [
                    {
                        _key: nanoid(),
                        _ref: projectId
                    }
                ])
                .commit()
                : await client
                    .patch(userId)
                    .unset([`likes[_ref=="${projectId}"]`])
                    .commit();

        res.status(200).json(data);
    }
}
