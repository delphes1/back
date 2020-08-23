import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt@v0.9.0/validate.ts";
const key = "your-secret";

const validateToken = async (ctx: Context, next: any) => {
  /*	const jwtToken: string = ctx.request.headers.get("Authorization")
		? ctx.request.headers.get("Authorization")!
		: "";
	console.log(jwtToken);
	const isValid = await validateJwt(jwtToken, key, { isThrowing: false });
	if (!isValid) {
		ctx.response.body = { msg: "Unauthorized" };
		ctx.response.status = 401;
		return;
	}
    await next();*/
  const authorization = ctx.request.headers.get("Authorization");
  if (!authorization) {
    return;
  }
  console.log("authorization : ", authorization);
  const headerToken = authorization.replace("Bearer ", "");
  const isTokenValid = await validateJwt(headerToken, key, {
    isThrowing: false,
  });
  console.log("isTokenvalid : ", isTokenValid);
  if (!isTokenValid) {
    ctx.response.status = 401; // unauthorized
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  ctx.response.body = "success";
};
export default validateToken;
