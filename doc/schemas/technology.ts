const technology: Object = {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    infos: {
        description: {
            type: String,
            required: true,
            trim: true
        }
    },
    versions: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
                unique: true
            },
            slug: {
                type: String,
                required: true,
                lowercase: true,
                trim: true
            },
            date: {
                type: Date,
                required: true,
                default: Date.now
            }
        }
    ],
    parents: [
        {
            order: {
                type: Number,
                required: true,
                default: 1,
                min: 1
            },
            id: {
                type: String,
                required: true,
                trim: true
            } 
        }
    ]
}

export default technology;