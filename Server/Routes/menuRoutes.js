import express from "express";
import { createMenu } from "../Controller/menuController.js";
import { isAuthenticated } from "../middlewares/isauthenticated.js";


const router  = express.Router();

router.route('/createMenu/:id').post(isAuthenticated ,createMenu);

export default router;