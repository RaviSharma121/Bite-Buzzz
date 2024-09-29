import express from "express";
import { isAuthenticated } from "../middlewares/isauthenticated.js";
import { addToCart, deleteFromCart } from "../Controller/cartController.js";

const router = express.Router();

router.route("/addToCart/:restaurantId/:menuId/:price").post(isAuthenticated, addToCart);
router.route("/deleteFromCart/:menuId").delete(isAuthenticated, deleteFromCart);

export default router;
