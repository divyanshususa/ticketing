const sendToken = (res, user, message, statusCode = 201) => {
  const token = user.getJWTToken();
  console.log("token ", token)
  // const options = {
  //   expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  // };
  // user.role === "admin" ?
  //   res.status(statusCode).cookie("token", token, options).json({
  //     success: true,
  //     message: message,
  //     isAdmin: true,
  //     user
  //   }) : res.status(statusCode).cookie("token", token, options).json({
  //     success: true,
  //     message: message,
  //     user
  //   })
  user.role === "admin" ?
    res.status(statusCode).json({
      success: true,
      message: message,
      token: token,
      isAdmin: true,
      user
    }) : res.status(statusCode).json({
      success: true,
      message: message,
      token: token,
      user
    })
};

export default sendToken;
