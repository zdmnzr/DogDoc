import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { nanoid } from 'nanoid';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { followId, followedId, bool } = req.body;

        const data =                  //给project添加点赞的user
            bool ? await client
                .patch(followId)
                .setIfMissing({ follows: [] })
                .insert('after', 'follows[-1]', [
                    {
                        _key: nanoid(),
                        _ref: followedId
                    }
                ])
                .commit()
                : await client
                    .patch(followId)
                    .unset([`follows[_ref=="${followedId}"]`])
                    .commit();

        const hh =             //给user添加点过赞的project
            bool ? await client
                .patch(followedId)
                .setIfMissing({ followeds: [] })
                .insert('after', 'followeds[-1]', [
                    {
                        _key: nanoid(),
                        _ref: followId
                    }
                ])
                .commit()
                : await client
                    .patch(followedId)
                    .unset([`followeds[_ref=="${followId}"]`])
                    .commit();

        res.status(200).json('ok');
    }
}
