require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const workoutRoutes = require("./routes/workouts.js");

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listener
    app.listen(process.env.PORT, () => {
      console.log("connected to mongodb & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

//routes
app.use("/api/workouts/", workoutRoutes);
