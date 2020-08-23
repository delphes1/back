const keywords:Object = {
    name: [
        {
            language: {
                type: String,
                required: true,
                lowercase: true,
                trim: true,
                unique: true
            },
            title: {
                type: String,
                required: true,
                trim: true
            }
        }
    ]
}

export default keywords;