export default {
    name: 'project',
    title: 'project',
    type: 'document',
    fields: [
        {
            name: 'description',
            title: 'description',
            type: 'string',
        },
        {
            name: 'postedBy',
            title: 'postedBy',
            type: 'reference',
            to: [{ type: 'user' }]
        },
        {
            name: 'images',
            title: 'images',
            type: 'array',
            of: [{ type: 'image' }],
      
        },
        {
            name: 'type',
            title: 'type',
            type: 'string',
        },
        {
            name: 'likeds',
            title: 'likeds',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }],
                },
            ],
        },
        {
            name: 'collectioneds',
            title: 'collectioneds',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }],
                },
            ],
        },
        {
            name: 'comments',
            title: 'comments',
            type: 'array',
            of: [{ type: 'comment'}],
        },
        {
            name: 'time',
            title: 'time',
            type: 'datetime',
        }
    ]
}