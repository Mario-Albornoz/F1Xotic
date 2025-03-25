import mongoose from "mongoose";


const Schema = mongoose.Schema;
// loadType(mongoose);

const OrderItemSchema= new Schema({
        user: {type:mongoose.Types.ObjectId, ref:"User", required:true},
        product: [{type:mongoose.Types.ObjectId, ref:"Product", required: true}],
        quantity: {type: Number, required:true},
        subTotal:{type:Number, required: true},
        
    }
)

const OrderItem = mongoose.model("OrderItem", OrderItemSchema)

export default OrderItem;