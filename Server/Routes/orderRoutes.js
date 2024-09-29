import express from "express";
import { isAuthenticated } from "../middlewares/isauthenticated.js";
import { createOrdersFromCart, createSingleOrder } from "../Controller/orderController.js";


const router  = express.Router();

router.route('/createSingleOrder/:restaurantId/:menuId/:price').post(isAuthenticated ,createSingleOrder);
router.route('/createOrdersFromCart').post(isAuthenticated ,createOrdersFromCart);


export default router;