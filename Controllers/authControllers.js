const { Users } = require('../Models/userModel');
// const jwt=require('jsonwebtoken');

// Signing up users
const SignUp = async (req, res, next) => {
  try {
    const signedUser = await Users.create({
      Username: req.body.Username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      jobApplied: req.body.appliedJobs,
    });
    res.status(200).json({
      status: 'success',
      data: signedUser,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: err.message,
    });
  }
  next();
};

// Loggin in already signed up users
const Login = async (req, res, next) => {
  try {
    const { email, Password } = req.body;

    // check if password and email exist
    if (!email || !Password) {
      throw new Error('Please provide email and password');
    }
    // Check if the user in database and the password are matching
    const user = await Users.findOne({ email }).select('+password');
    console.log(user);
    if (!user || !(await user.correctPassword(Password, user.password))) {
      throw new Error('Incorrect email or password');
    }

    // assign a web token to the user and log in the user
    // const token=jwt.sign({id: user._id},'secret-key-is-very-important-now',{
    //     expiresIn:'1h'
    // });
    res.status(200).json({
      status: 'success',
      //token,
      data: { email: user.email, name: user.Username, role: user.role },
    });
    next();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { SignUp, Login };
