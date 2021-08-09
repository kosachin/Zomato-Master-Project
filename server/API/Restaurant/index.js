// Libraries
import express from "express";
import passport from "passport";

// DB model
import {RestaurantModel} from "../../database/allModels";

const Router = express.Router();

/*
Route     /
Des       Get all restaurant details based on city
Params    none
Access    Public
Method    GET
*/
Router.get("/", async (req, res) => {
    try{
        const { city } = req.query;
    const restaurants = await RestaurantModel.fing({city});

    return res.json({restaurants});
    } catch(error) {
        return res
        .status(500)
        .json({error: error.message});
    }
});

/*
Route     /
Des       Get individual resturant detail based on id 
Params    none
Access    Public
Method    GET
*/
Router.get("/:_id", async (req, res) => {
    try{
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findOne(_id);

        if (!restaurant) 
            return res
            .status(404)
            .json({error:"Restaurant Not Found"
        });
        
        return res.json({restaurant});
        
    } catch(error) {
        return res
        .status(500)
        .json({error: error.message});
    }
})

/*
Route     /search
Des       Get restaurant details based on search string
Params    none
Body      searchSting  
Access    Public
Method    GET  
*/
Router.get("/search", async(req, res) => {
    try{
        const {searchstring} = req.body;
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchstring, $options: "i"},
        });
        
        if (!restaurants) 
            return res
            .status(404)
            .json({error:`No Restaurant matched with ${searchString}`});
        
        return res.json({restaurants});
    } catch (error) {
        return res
        .status(500)
        .json({error: error.message});
    }
})

export default Router;

