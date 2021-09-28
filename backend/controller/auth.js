const User = require('../model/User')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken')



// ** POST ** Register user

const register = async (req, res) => {

    const {username, password} = req.body;

    if(!username){
        return res.status(400).json({
            success: false,
            message: "Missing username ",
          });
    }

    if(!password || password.length < 6){
        return res.status(400).json({
            success: false,
            message: "Password is required and should be 6 characters long",
          });
    }

    const exist = await User.findOne({username}) //  Todo: Validation does not match email
    if(exist){
        return res.status(400).json({
            success: false,
            message: "Email is taken",
          });
    }

    // ** hashPassword
    const hashPassword = await argon2.hash(password);


    const newUser = await User({
        username,
        password:hashPassword
    })

    const accessToken = jwt.sign({
        _id: newUser._id
    },process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      })

    try {
        await newUser.save();
        // console.log("REGISTERED USE => ", newUser);
        return res.json({
          ok: true,
          message: "Successfully registered",
          accessToken
        });

    } catch (error) {
        console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
    }

}

// ** POST ** Login user

const login =  async (req, res) => {
    const {username, password} = req.body

    if(!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username and password  ",
          });
    }


    try {
        const user = await User.findOne({username}).populate("user",['username']);
        if(!user){
            return res.status(400).json({
                success: false,
                message:'Incorrect username and password'
            })
        }

        // validate password

        const passwordValidate = await argon2.verify(user.password, password);
        if(!passwordValidate){
            return res.status(400).json({
                success: false,
                message: "Incorrect username and password"
            })
        }

        user.password = undefined;
        user.secret = undefined;

        const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
          });

          res.status(200).json({
              username: user.username,
              success:true,
              message: 'Login success',
              accessToken
          })

    } catch (error) {
        console.log("LOGIN FAILED => ", err);
        return res.status(400).send("Error. Try again.");
    }
}



module.exports = { register, login}
