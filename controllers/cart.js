const Cart = require ('../models/cart');

exports.addItemToCart = (req, res) =>{

        Cart.findOne({user: req.user._id})
        .exec((error,cart ) =>{
            if(error) return res.status(400).json({error})
            if(cart){
                const product =req.body.cartItems.product;
                const item = cart.cartItems.find(c=>c.product == product);
                if(item){
                    Cart.findOneAndUpdate({"user": req.user._id, "cartItems.product": product},{
                        "$set":{
                            "cartItems": {
                                ...req.body.cartItems,
                                quantity:item.quantity + req.body.cartItems.quantity
                            }
                        }
                    })
                    .exec((error,_cart) => {
                        if(error) return res.status(400).json({error});
                        if(_cart){
                            return res.status(201).json({cart : _cart});
                        }
                    })
                }else{
                    Cart.findOneAndUpdate({user: req.user._id},{
                        "$push":{
                            "cartItems": req.body.cartItems
                        }
                    })
                    .exec((error,_cart) => {
                        if(error) return res.status(400).json({error});
                        if(_cart){
                            return res.status(201).json({cart : _cart});
                        }
                    })
                }
                //if cart already exist then update cart by quantity
               
                
                //res.status(200).json({message : cart})
            }else
            {
                //if cart note exist thn create new cart
                const cart = new Cart({
                    user:req.user._id,
                    cartItems: [req.body.cartItems]
                });
            
                cart.save((error,cart) => {
                    if(error) return res.status(400).json({error});
                    if(cart){
                        return res.status(201).json({cart});
                    }
                })
            }
        });
            
}

exports.getCartItems = (req, res) => {
    //const { user } = req.body.payload;
    //if(user){
    Cart.findOne({ user: req.user._id })
      .populate("cartItems.product", "_id name price productPictures")
      .exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          let cartItems = {};
          cart.cartItems.forEach((item, index) => {
            cartItems[item.product._id.toString()] = {
              _id: item.product._id.toString(),
              name: item.product.name,
              img: item.product.productPictures[0].img,
              price: item.product.price,
              qty: item.quantity,
            };
          });
          res.status(200).json({ cartItems });
        }
      });
    //}
  };
  
  