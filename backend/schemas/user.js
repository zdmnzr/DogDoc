export default {
    name: 'user',
    title: 'user',
    type: 'document',
    fields: [
        {
            name: 'nickName',
            title: 'nickName',
            type: 'string',
        },
        {
            name: 'image',
            title: 'image',
            type: 'image',
        },
        {
            name: 'account',
            title: 'account',
            type: 'string',
        },
        {
            name: 'password',
            title: 'password',
            type: 'string',
        },

        {
            name: 'slogan',
            title: 'slogan',
            type: 'string',
        },
        {
            name: 'likes',
            title: 'likes',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'project' }],
                },
            ],
        },
        {
            name: 'collections',
            title: 'collections',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'project' }],
                },
            ],
        },
        {
            name: 'follows',
            title: 'follows',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }],
                },
            ],
        },

        {
            name: 'followeds',
            title: 'followeds',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }],
                },
            ],
        },
        {
            name: 'posts',
            title: 'posts',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'project' }],
                },
            ],
        }
    ]
}