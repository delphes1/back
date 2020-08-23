/*import { validate } from "https://deno.land/x/validasaur/mod.ts";
import db from "../config/databases.ts";
import { requestTechnologyValidasaur } from "../schemas/requestTechnologyValidasaur.ts";
const requestTechnologyCollection = db.collection("requestTechnology");

interface RequestTechnology {
	_id: { $oid: string };
    name: string,
    slug: string,
    infos: {
        description: string,
        image: string
    },
    author: string,
    date: {
        created: number,
        ended: number,
        deny: number
    },
    bundle: {
        id: string,
        keywords: string[]
    },
    rating: [
        {
            id_user: string,
            accept: boolean,
            review: string,
            date: number,
            comments: [
                {
                    id_user: string,
                    comment: string,
                    date: number
                }
            ]
        }
    ]
}

export default {
	async createRequestTechnology(ctx: any) {
		try {
			const value  = await ctx.request.body().value;
			if (!Object.keys(value).length) {
				ctx.response.status = 400;
				ctx.response.body = { error: "Request can't be empty" };
				return;
			}
			const [passes, errors] = await validate(value, requestTechnologyValidasaur);
			if (!passes) {
				ctx.response.body = errors;
				return;
			}
			const requestTechnology = value;
			const insertRequestTechnology = await requestTechnologyCollection.insertOne(bundle);
			ctx.response.status = 201;
			ctx.response.body = insertRequestTechnology;
			return;
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = error;
		}
	},
	async fetchAllBundle(ctx: any) {
		try {
			const fetchedBundle: Bundle[] = await bundleCollection.find();

			if (fetchedBundle) {
				const fetchedBundleList = fetchedBundle.length
					? fetchedBundle.map((bundle) => {
							const {
								_id: { $oid },
								name,
								keywords,
								folder,
								infos,
								stats,
								functions,
							} = bundle;
							return {
								id: $oid,
								name,
								keywords,
								folder,
								infos,
								stats,
								functions,
							};
					  })
					: [];
				ctx.response.status = 200;
				ctx.response.body = fetchedBundleList;
				return;
			}
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = error;
		}
	},
	async fetchOneBundle(ctx: any) {
		try {
			const { id } = ctx.params as { id: string };

			const fetchedBundle = await bundleCollection.findOne({
				_id: { $oid: id },
			});

			if (fetchedBundle) {
				const {
					_id: { $oid },
					name,
					keywords,
					folder,
					infos,
					stats,
					functions,
				} = fetchedBundle;
				ctx.response.status = 200;
				ctx.response.body = {
					_id: $oid,
					name,
					keywords,
					folder,
					infos,
					stats,
					functions,
				};
				return;
			}
			ctx.response.status = 404;
			ctx.response.body = { error: "Bundle not found" };
			return;
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = error;
		}
	},
	async updateBundle(ctx: any) {
		try {
			const { id } = ctx.params as { id: string };

			const value  = await ctx.request.body().value;
			const [passes, errors] = await validate(value, bundleValidasaur);
			if (!passes) {
				ctx.response.body = errors;
				ctx.response.status = 500;
				return;
			}

			if (!Object.keys(value).length) {
				ctx.response.status = 400;
				ctx.response.body = { error: "Request can't be empty" };
				return;
			}
			const bundle: Bundle = value;
			const fetchedBundle = await bundleCollection.findOne({
				_id: { $oid: id },
			});

			if (fetchedBundle) {
				const { matchedCount } = await bundleCollection.updateOne(
					{ _id: { $oid: id } },
					{ $set: bundle }
				);
				if (matchedCount) {
					ctx.response.status = 204;
					ctx.response.body = "Bundle updated successfully!";
					return;
				}
				ctx.response.status = 500;
				ctx.response.body = { error: "Unable to update Bundle" };
				return;
			}
			ctx.response.status = 404;
			ctx.response.body = { error: "Bundle not found" };
			return;
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = error;
		}
	},
	async deleteBundle(ctx: any) {
		try {
			const { id } = ctx.params as { id: string };

			const fetchedBundle = await bundleCollection.findOne({
				_id: { $oid: id },
			});

			if (fetchedBundle) {
				const deleteCount = await bundleCollection.deleteOne({
					_id: { $oid: id },
				});

				if (deleteCount) {
					ctx.response.status = 204;
					ctx.response.body = "Bundle deleted successfully!";
					return;
				}
				ctx.response.status = 500;
				ctx.response.body = { error: "Unable to delete Bundle" };
				return;
			}
			ctx.response.status = 404;
			ctx.response.body = { error: "Bundle not found" };
			return;
		} catch (error) {
			ctx.response.status = 500;
			ctx.response.body = error;
		}
	},
};*/
