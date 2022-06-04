const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./Utils/appError");

const authRouter = require("./Routes/authRoutes");
const userRoute = require("./Routes/userRoute");
const adminRoute = require("./Routes/adminRoutes");
const commonRoute = require("./Routes/commonRoutes");
const groupRoute = require("./Routes/groupRoutes");
const researchTopic = require("./Routes/researchTopicRoutes");
const topic = require("./Routes/topicRoutes");
const supervisors = require("./Routes/superCosupervisorRoutes");
const feedback = require("./Routes/feedBackRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const fileDownload = require("./Routes/fileDownloadRoutes");
const document = require("./Routes/documentRoutes");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// 3) ROUTES
// app.use('/api/v1/tours', tourRouter);
app.use("/", authRouter);
app.use("/api/", commonRoute);
app.use("/api/users", userRoute);
app.use("/api/admins", adminRoute);
app.use("/api/groups", groupRoute);
app.use("/api/topics", researchTopic);
app.use("/api/submit-topic", topic);
app.use("/api/supervisors", supervisors);
app.use("/api/feedback", feedback);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/download", fileDownload);
app.use("/api/document", document);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;
