import mongoose from "mongoose";


const Schema = mongoose.Schema;
// loadType(mongoose);

const OrderSchema= new Schema({
        user: {type:mongoose.Types.ObjectId, ref:"User", required:true},
        items:[{type:mongoose.Types.ObjectId, ref:"OrderItem", required:true}],
        totalAmount:{type:Number, required: true},
        createdAt: {type: Date, default: Date.now}
    }
)

const Order = mongoose.model("Order", OrderSchema);

export default Order;