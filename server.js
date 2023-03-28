const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

//Initialize server
const app = express();
const port = process.env.PORT || 8080;

//Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json()); //Body Parser
app.use(express.urlencoded({ extended: false }));

//Database Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() =>
        console.log("MongoDB database connection established successfully")
    )
    .catch((err) => console.log(err));

//Router initializations
const userRouter = require("./routes/User");
// const exerciseRouter = require('./routes/Exercise');
const socialRouter = require("./routes/SocialUpdates");
//Routes
app.use("/user", userRouter);
// app.use('/exercise', exerciseRouter)
app.use("/social", socialRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
