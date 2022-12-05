import express from "express";

import * as contactController from "../controllers/contactController";

const router = express.Router();

router.post("/contact", contactController.saveMessage);

export default router;