export default {
    name: 'comment',
    title: 'comment',
    type: 'document',
    fields: [
        {
            name: 'content',
            title: 'content',
            type: 'string'
        },
        // {
        //     name: 'postedBy',
        //     title: 'postedBy',
        //     type: 'reference',
        //     to: [{ type: 'user' }]
        // },
        {
            name: 'postedBy',
            title: 'postedBy',
            type: 'user',
            // to: [{ type: 'user' }]
        },
    ]
}