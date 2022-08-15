import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { getProjectById } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET'){
        const {project_id} = req.query;
        // console.log(project_id)
        const projctQuery = getProjectById(project_id);
        const project = await client.fetch(projctQuery);
        res.status(200).json(project)
    }
}
