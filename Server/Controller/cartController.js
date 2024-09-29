import { Cart } from "../Models/cartModel.js";

export const addToCart = async (req,res)=>{
    const restaurantId = req.params.restaurantId;
    const menuId = req.params.menuId;
    const price = req.params.price;
    const userId = req.id;

    try {
        const userCart = await Cart.findOne({userId});
    if(!userCart){
        const firstTimeCart = await Cart.create({
            userId,
            cartItems:[{
              menuId,
              restaurantId, 
              quantity:1,
              price
            }]
        });

        return res.status(200).json({
            message:"Item added to Cart successfully",
            success:true
        })
    }
    if(userCart){
        // Need to check if item already present in cart or not
        const cartItemExists = userCart.cartItems.find((item)=>{
            return item.menuId == menuId;
        })

        if(cartItemExists){
            cartItemExists.quantity += 1; 

            await userCart.save();
            return res.status(200).json({
                message:"Item added to Cart successfully",
                success:true
            })
        }

        // we need to add item to card for first time if not present already

        const item = {
            menuId,
            restaurantId,
            quantity:1,
            price
        }
        userCart.cartItems.push(item);

    }

    await userCart.save();
    return res.status(200).json({
        message:"Item added to Cart successfully",
        success:true
    })
    } catch (error) {
        console.log(error);
    }
}

export const deleteFromCart = async(req , res)=>{
    const userId = req.id;
    const menuId = req.params.menuId;

    try {
        const userCart = await Cart.findOne({userId});
    if(userCart){
        const updatedCartItems = userCart.cartItems.filter((item)=>{
            return item.menuId != menuId;
        })
        userCart.cartItems = updatedCartItems;
        await userCart.save();
        return res.status(200).json({
            message:"Item deleted successfully",
            success:true
        })
    }
    } catch (error) {
        console.log(error);
    }
}