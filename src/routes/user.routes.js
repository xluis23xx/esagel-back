import { Router } from "express";
const router = Router();

import * as userCtrl from "../controllers/user.controller";
import { authJwt, verifySignUp } from "../middlewares";

router.post("/consult", [authJwt.verifyToken, authJwt.isModerator], userCtrl.getUsers);

router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isModerator,
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  userCtrl.createUser
);

router.post(
  "/newPassword",
  [
    authJwt.verifyToken,
    authJwt.isModerator,
  ],
  userCtrl.generateNewUserPassword
);

router.get(
  "/:userId",
  [authJwt.verifyToken, authJwt.isUser],
  userCtrl.getUserById
);

router.put(
  "/:userId",
  [authJwt.verifyToken, authJwt.isModerator],
  userCtrl.updateUserById
);

router.delete(
  "/:userId",
  [authJwt.verifyToken, authJwt.isModerator],
  userCtrl.deleteUserById
);

export default router;
