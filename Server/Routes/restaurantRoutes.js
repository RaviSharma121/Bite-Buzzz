import express from "express";
import { createRestaurant, getRestaurant } from "../Controller/restaurantController.js";
import { isAuthenticated } from "../middlewares/isauthenticated.js";


const router = express.Router();

router.route('/createRestaurant').post(isAuthenticated , createRestaurant)
router.route('/getRestaurants').get(isAuthenticated , getRestaurant)


export default router;