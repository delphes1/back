import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default {
	bcrypt(stringToHash: string) {
		const hashed = bcrypt.hashSync(stringToHash);
		return hashed;
	},
	verify(hash: string, text: string): boolean {
		const result = bcrypt.compareSync(text, hash);
		return result;
	},
};
