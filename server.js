require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./src/mongo_async_crud-main/config/corsOptions");
const { logger } = require("./src/mongo_async_crud-main/middleware/logEvents");
const errorHandler = require("./src/mongo_async_crud-main/middleware/errorHandler");
const verifyJWT = require("./src/mongo_async_crud-main/middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./src/mongo_async_crud-main/middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./src/mongo_async_crud-main/config/dbConn");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./src/mongo_async_crud-main/routes/root"));
app.use("/register", require("./src/mongo_async_crud-main/routes/register"));
app.use("/auth", require("./src/mongo_async_crud-main/routes/auth"));
app.use("/refresh", require("./src/mongo_async_crud-main/routes/refresh"));
app.use("/logout", require("./src/mongo_async_crud-main/routes/logout"));
app.use(
  "/reset-email",
  require("./src/mongo_async_crud-main/routes/sendResetEmail")
);
app.use(
  "/reset-password",
  require("./src/mongo_async_crud-main/routes/resetPwd")
);

app.use(verifyJWT);
app.use("/users", require("./src/mongo_async_crud-main/routes/api/users"));
app.use("/vote", require("./src/mongo_async_crud-main/routes/vote"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
