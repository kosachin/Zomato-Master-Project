// Library
import express from 'express';
import passport from 'passport';
import multer from "multer";

// Db Model
import {ImageModel} from "../../database/allModels";

// Utilities
import {s3Upload} from "../../Utils/AWS/s3"

// Validation
import ValidationImage from "../../validation/image";

const Router = express.Router();

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({storage});

/*
Route     /image
Des       Uploads given image to S3 bucket, and saves file link to mongodb
Params    none
Access    Public
Method    POST  
*/
Router.post("/", upload.single("file", 4) ,async (req, res) => {
    try {
        await ValidateUploadImage(req.file);
        const file = req.file;

        // S3 bucket options
        const bucketOptions = {
            Bucket: "master-project-zomato-clone",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",
        };

        const uploadImage = await s3Upload(bucketOptions);

        return res.status(200).json({file});

    }catch (error) {
        return res.status(500).json({ error: error.message});
    }
})

export default Router;
