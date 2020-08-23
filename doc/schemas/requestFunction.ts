const requestFunction: Object = {
    id_version: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    date: {
        created: {
            type: Date,
            required: true,
            default: Date.now
        },
        progress: {
            type: Date
        },
        ended: {
            type: Date
        },
        deny: {
            type: Date
        }
    },
    bundle: {
        id: {
            type: String,
            trim: true
        },
        keywords: [
            {
                type: String,
                trim: true
            }
        ]
    },
    rating: [
        {
            id_user: {
                type: String,
                required: true,
                trim: true
            },
            accept: {
                type: Boolean,
                required: true
            },
            review: {
                type: String,
                required: true,
                trim: true
            },
            date: {
                type: Date,
                required: true,
                default: Date.now
            },
            comments: [
                {
                    id_user: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    comment: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    date: {
                        type: Date,
                        required: true,
                        default: Date.now
                    }
                }
            ]
        }
    ]
}

export default requestFunction;