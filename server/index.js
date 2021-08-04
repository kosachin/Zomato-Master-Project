// Importing Env Variables
require("dotenv").config();

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";

// Microservice route
import Auth from "./API/Auth";

// DB connection
import ConnectDB from "./database/connection";

const zomato = express();

// Application middlewares
zomato.use(express.json()); 
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());

// Application Routes
zomato.use("/auth", Auth);

zomato.get("/", (req, res) => res.json({ message: "Setup success"}));

zomato.listen(4000, () => 
    ConnectDB()
    .then(() => console.log("Server is running"))
    .catch(() => console.log("Server is running, but DB connection is failed"))
);


 
 


 