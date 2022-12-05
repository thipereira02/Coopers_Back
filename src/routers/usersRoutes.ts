import express from "express";

import * as usersController from "../controllers/usersController";

const router = express.Router();

router.post("/signup", usersController.signup);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);

export default router;