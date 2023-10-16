var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var baseRoutes = require("./routes/index");
var authRoutes = require("./routes/auth");
var authorizeMiddleware = require("./controllers/auth/authenticate");
var session = require("express-session");
var FileStore = require("session-file-store")(session);
const env = process.env.NODE_ENV || "development";

//run migrations and seeds- migrations always, seeds run on test only.
require("./migrate");

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// use a secure file store for production and staging, and temporary one for development
if (env == "development") {
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      name: "role_base",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 25 * 60 * 60 * 1000000 },
    }),
  );
} else {
  var fileStoreOptions = {
    secret: process.env.COOKIE_SECRET,
    ttl: 30 * 24 * 60 * 60,
    path: "./storage/sessions",
  };
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      name: "role_base",
      // check compartible session stores here https://github.com/expressjs/session#compatible-session-stores
      store: new FileStore(fileStoreOptions),
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    }),
  );
}
app.use("/auth/", authRoutes);
app.use(authorizeMiddleware.authenticate);
app.use(authorizeMiddleware.authorize);
app.use("/api/", baseRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

app.listen(process.env.PORT || 10107);
