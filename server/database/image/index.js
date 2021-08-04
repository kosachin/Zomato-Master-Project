import moongose from "moongose";

const ImageSchema = new moongose.Schema({
    images:[{
        location: {type:String, required:true},
    }, 
]
},
{
    timestamps: true,
}

)

export const ImageModel = mongoose.model("Images", ImageSchema)