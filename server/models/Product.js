import mongoose from "mongoose";
// import loadType from "mongoose-type-url";

const Schema = mongoose.Schema;
// loadType(mongoose);

const ProductSchema = new Schema({
    name: { type: String, required: true },
    user: {type: mongoose.Types.ObjectId, ref:"User", required:true}, //added user id as Foreign key to keep track of the user who posted the product
    price: { type: Number, required: true },
    category: { type: String },
    description: { type: String },
    breakdown: { type: String, required: true },
    // image: { type: mongoose.SchemaTypes.Url },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
