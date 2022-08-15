import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { nanoid } from 'nanoid';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { userId, projectId, bool } = req.body;

        const data =
            bool ? await client
                .patch(projectId)
                .setIfMissing({ collectioneds: [] })
                .insert('after', 'collectioneds[-1]', [
                    {
                        _key: nanoid(),
                        _ref: userId
                    }
                ])
                .commit()
                : await client
                    .patch(projectId)
                    .unset([`collectioneds[_ref=="${userId}"]`])
                    .commit();

        const hh =             //给user添加收藏的project
            bool ? await client
                .patch(userId)
                .setIfMissing({ collections: [] })
                .insert('after', 'collections[-1]', [
                    {
                        _key: nanoid(),
                        _ref: projectId
                    }
                ])
                .commit()
                : await client
                    .patch(userId)
                    .unset([`collections[_ref=="${projectId}"]`])
                    .commit();

        res.status(200).json(data);
    }
}
