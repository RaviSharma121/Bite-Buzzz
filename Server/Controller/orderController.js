import { Order } from "../Models/orderModel.js";
import { Cart } from "../Models/cartModel.js";


export const createSingleOrder = async (req, res) => {
  const userId = req.id;
  const menuId = req.params.menuId;
  const restaurantId = req.params.restaurantId;
  const price = req.params.price;



  try {
    const singleOrder = await Order.create({
        userId,
        orderItems: [
          {
            restaurantId,
            menuId,
            quantity: 1,
            price,
            status: "pending",
          },
        ],
        // deliveryDetails,
        totalAmount:price,
      });
    
      return res.status(200).json({
        message: "Order created Successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const createOrdersFromCart = async (req, res) => {
    const userId = req.id;
    try {
        const cart = await Cart.findOne({userId});

    if (!cart || !cart.cartItems || cart.cartItems.length == 0) {
        return res.status(201).json({
            message:"Cart is empty",
            success:false
        })
    }

    const totalAmount = cart.cartItems.reduce((sum,item)=>{
        return sum + (item.price*item.quantity);
    },0);
  
    const order = await Order.create({
      userId,
      orderItems: cart.cartItems.map((item)=>({
        restaurantId:item.restaurantId,
        menuId:item.menuId,
        quantity:item.quantity,
        price:item.price,
        status:"pending"

      })),
    //   deliveryDetails,
      totalAmount,
    });
  
    return res.status(200).json({
      message: "Order created Successfully",
      success: true,
    });
    } catch (error) {
        console.log(error);
    }
  };
