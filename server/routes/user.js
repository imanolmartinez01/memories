import express from "express";

const router = express.Router();

import { signin, signup, signinupwithgoogle } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signinupwithgoogle", signinupwithgoogle);


export default router;