// Importing Env Variables
require("dotenv").config();

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./config/google.config"

// Microservice route
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";

// DB connection
import ConnectDB from "./database/connection";

const zomato = express();

// Application middlewares
zomato.use(express.json()); 
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

// passport config
googleAuthConfig(passport)

// Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);

zomato.get("/", (req, res) => res.json({ message: "Setup success"}));

zomato.listen(4000, () => 
    ConnectDB()
    .then(() => console.log("Server is running"))
    .catch(() => console.log("Server is running, but DB connection is failed"))
);


 
 


 