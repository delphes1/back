const users: Object = {
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  auth: {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      match: ["Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  stats: {
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    last_connexion: {
      type: Date,
    },
    number_connexion: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  trust_points: {
    type: Number,
    required: true,
    default: 100,
    min: 0,
    max: 200,
  },
  infos: {
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      trim: true,
    },
    birthday: {
      type: Date,
    },
    sexe: {
      type: Number,
      required: true,
      default: 0,
    },
    company: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    network: {
      facebook: {
        type: String,
        lowercase: true,
        trim: true,
      },
      twitter: {
        type: String,
        lowercase: true,
        trim: true,
      },
      github: {
        type: String,
        lowercase: true,
        trim: true,
      },
      gitlab: {
        type: String,
        lowercase: true,
        trim: true,
      },
      linkedin: {
        type: String,
        lowercase: true,
        trim: true,
      },
      perso: [
        {
          nom: {
            type: String,
            trim: true,
          },
          url: {
            type: String,
            lowercase: true,
            trim: true,
          },
        },
      ],
    },
    contact: {
      email: {
        type: String,
        lowercase: true,
        trim: true,
        match: ["Please fill a valid email address"],
      },
      microsoft: {
        type: String,
        trim: true,
      },
      discord: {
        type: String,
        trim: true,
      },
    },
  },
};

export default users;
