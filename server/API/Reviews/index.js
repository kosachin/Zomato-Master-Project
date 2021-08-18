// Libraries
import express from "express";
import passport from "passport";

// Database modal
import { ReviewModel } from "../../database/allModels";

// Validation
import { ValidateFoodReview,ValidateFoodReviewId } from "../../validation/review";


const Router = express.Router();

/*
Route     /new
Des       Add new food review/rating
Params    none
BODY      review object
Access    Public
Method    POST  
*/
Router.post("/new", async (req, res) => {
  try {
    await ValidateFoodReview(req.body);
    const { reviewData } = req.body;

    await ReviewModel.create(reviewData);

    return res.json({ review: "Sucessfully Created Review." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/*
Route     /delete
Des       Delete food review/rating
Params    _id
BODY      none
Access    Public
Method    DELETE  
*/
Router.delete("/delete/:_id", async (req, res) => {
  try {
    await ValidateFoodReviewId(req.params);
    const { _id } = req.params;

    await ReviewModel.findByIdAndDelete(_id);

    return res.json({ review: "Sucessfully Deleted the Review." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;