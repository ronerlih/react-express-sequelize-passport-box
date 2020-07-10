module.exports = function (error, req, res, next) {
  console.log("\n--error handler--");
  // before response was sent
  console.log("New Error");
    if (res.headersSent) {
      console.log('error sent');
      return next(error)
    }
    console.log(`error ${error.message} will be sent`);
    // if no status code return code 500
    if(!error.statusCode) error.statusCode = 500;
    res.json(error.message.toString())
  }