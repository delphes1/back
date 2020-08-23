const bundles: Object = {
	name: [
		{
			language: {
				type: String,
				required: true,
				lowercase: true,
				trim: true,
				unique: true,
			},
			title: {
				type: String,
				required: true,
				trim: true,
			},
		},
	],
	keywords: [
		{
			type: String,
			trim: true,
		},
	],
	folder: {
		type: String,
		required: true,
		lowercase: true,
		trim: true,
	},
	infos: {
		description: {
			type: String,
			required: true,
			trim: true,
		},
	},
	stats: {
		created_at: {
			type: Date,
			required: true,
			default: Date.now,
		},
		number_views: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
	},
	functions: [
		{
			id_version: {
				type: String,
				required: true,
				trim: true,
			},
			revisions: [
				{
					author: {
						type: String,
						required: true,
						trim: true,
					},
					date: {
						type: Date,
						required: true,
						default: Date.now,
					},
				},
			],
		},
	],
};

export default bundles;
