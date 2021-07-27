import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
    name:{type:String, required:true},
    city:{type:String, required:true},
    address:{type:String, required:true},
    mapLocation: {type:String, required:true},
    cuisines:[String],
    resturantTimings:String,
    contactNumber: Number,
    website:Number,
    popularDishes:[String],
    averageCost:Number,
    amenities: [String],
    menuImages: {
        type: mongoose.Types.ObjectId,
        ref:"Menus",
    },
    reviews:[{type:mongoose.Types.ObjectId, ref:"Reviews"}],
    reviews:[{type:mongoose.Types.ObjectId, ref:"Images"}],

})

export const ResturantModel = mongoose.model("Resturant", ResturantSchema);