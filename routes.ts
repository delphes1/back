import { Router } from "https://deno.land/x/oak/mod.ts";
import AuthController from "./controllers/AuthController.ts";
import keywordsController from "./controllers/KeywordsController.ts";
import UsersController from "./controllers/UsersController.ts";
import TechnologyController from "./controllers/TechnologyController.ts";
import BundleController from "./controllers/BundleController.ts";
import FunctionController from "./controllers/FunctionController.ts";
import validateToken from "./controllers/authMiddleware.ts";
const router = new Router();

router
  // USER
  .post("/adduser", UsersController.createuser)
  .get("/user", AuthController.fetchUser)
  .get("/fetchallusers", UsersController.fetchAllUsers)
  .get("/user/:id", UsersController.fetchOneUser)
  .patch("/user/:id", UsersController.updateUser)
  .delete("/user/:id", UsersController.deleteUser)
  .post("/forgot", UsersController.forgotPassword)
  .post("/upload/:id", UsersController.uploadImage)
  // KEYWORD
  .post("/addkeyword", keywordsController.createKeyword)
  .get("/fetchallkeywords", keywordsController.fetchAllKeywords)
  .get("/keyword/:id", keywordsController.fetchOneKeyword)
  .patch("/keyword/:id", keywordsController.updateKeyword)
  .delete("/keyword/:id", keywordsController.deleteKeyword)
  // TECHNOLOGY
  .post("/addtechnology", TechnologyController.createTechnology)
  .get("/fetchalltechnology", TechnologyController.fetchAllTechnology)
  .get("/technology/:id", TechnologyController.fetchOneTechnology)
  .patch("/technology/:id", TechnologyController.updateTechnology)
  .delete("/technology/:id", TechnologyController.deleteTechnology)
  // BUNDLE
  .post("/addbundle", BundleController.createBundle)
  .get("/fetchallbundle", BundleController.fetchAllBundle)
  .get("/bundle/:id", BundleController.fetchOneBundle)
  .patch("/bundle/:id", BundleController.updateBundle)
  .delete("/bundle/:id", BundleController.deleteBundle)
  // FUNCTION
  .post("/addfunction", FunctionController.createFunction)
  .get("/fetchallfunction", FunctionController.fetchAllFunction)
  .get("/function/:id", FunctionController.fetchOneFunction)
  .patch("/function/:id", FunctionController.updateFunction)
  .delete("/function/:id", FunctionController.deleteFunction)
  // LOGIN
  .post("/login", AuthController.login);
//.post("/updateuser", AuthController.refresh);

export default router;
