import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description: {type:String, required:true},
    isVeg: {type:Boolean, required:true},
    isContains: {type:Boolean, required:true},
    category: {type:String, required:true},
    photos: {
        type:mongoose.Types.Object,
        ref:"Images", 
    },
    price: {type:Number, default:150, required:true},
    addOns: [{
        type:mongoose.Types.Object,
        ref:"Foods",
    }],
    restaurant: {
        type:mongoose.Types.Object, required:true,
        ref:"Restaurant",
        required:true,
    }

    
})

export const FoodModel = mongoose.model("Foods",FoodSchema);
