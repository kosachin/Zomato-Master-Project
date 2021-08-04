import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
      fullname: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String },
      address: [{ detail: { type: String }, for: { type: String } }],
      phoneNumber: [{ type: Number }],
    },
    {
      timestamps: true,
    }
  );

UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({user: this._id.toString() }, "ZomatoAPP");

}; 

UserSchema.statics.findByEmailAndPhoneNumber = async ({email, phoneNumber }) => {
    
    // Check whether email exist
    const checkUserByEmail = await UserModel.findOne({
        email
    });
    const checkUserByPhone = await UserModel.findOne({
        phoneNumber
    });

    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User already Exist...!");
    }

    return false;
};

UserSchema.statics.findByEmailAndPassword = async ({email, password }) => {

    // Check whether email exist
    const user = await UserModel.findOne({email});
    if (!user) {
        throw new Error("User does not Exist!!!");
    }
    
    // Compare password
    const doesPasswordMatch = await bcrypt.compare(password,user.password);
        
    if (!doesPasswordMatch) {        
        throw new Error("Invalid password!!!");
    }

    return user;
};

UserSchema.pre("save", function (next) {
    const user = this;
    
    // Password is modfied?
    if(user.isModified("password")) return next();

    // Generate bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if(error) return next(error);

        // Hash the password
        bcrypt.hash(user.password, salt, (error, hash) => {
            if(error) return next(error);

            // Assigning hased password
            user.password = hash;
            return next();
        });
    });

});

export const UserModel = mongoose.model("Users", UserSchema);