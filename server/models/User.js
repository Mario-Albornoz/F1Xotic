import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema


const UserSchema= new Schema(
    {
        username: {type: String, requiredd : true, unique: true },
        password: {type: String, requiredd: true}
    }
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", UserSchema)

export default User;