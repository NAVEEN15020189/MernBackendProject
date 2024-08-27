var express = require('express');
let Users = require('./Person');
let Signup = require('./reg');
let cors = require('cors');
let jwt = require('jsonwebtoken');
let SignupMiddleware =require('./SignupMiddleware')
require('./db');
var app = express();
app.use(express.json());
app.use(cors());

app.get('/student', async (req, res) => {
  let user = await Users.find();
  if (user.length > 0) {
    res.send(user);
  } else {
    res.send('no data found');
  }
});
app.post('/student', async (req, res) => {
  let user = new Users(req.body);
  let result = await user.save();
  res.send(result);
});

app.delete('/student/:_id', async (req, res) => {
  let user = await Users.deleteOne(req.params);
  res.send(user);
});

app.get('/student/:id', async (req, res) => {
  let user = await Users.findOne({ _id: req.params.id });
  res.send(user);
});

app.put('/student/:id', async (req, res) => {
  let user = await Users.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(user);
});

//searching based on key

app.get('/search/:key', async (req, res) => {
  let user = await Users.find({
    $or: [
      { name: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
      { address: { $regex: req.params.key } },
    ],
  });

  res.send(user);
});

// signupForm

app.post('/signup', async (req, res) => {
  let user = new Signup(req.body);
  let result = await user.save();
  res.send(result);
});

//login form

app.post('/loginav', async (req, res) => {
  const { email, password } = req.body;
  let user = await Signup.findOne({ email: email });
  console.log(user); // user object coming
  if (!user) {
    res.send('Invalid');
  }
  // no need to validate this one otherwise it will give error without token we are login  //    else if(user.password==password){
    //   res.send("valid");
    //     }
   else if (user.password !== password) {
     res.send('invalidpassword');}
    else {
    let payload = {
      user1: {
        id: user._id,
      },
    };
    jwt.sign(payload, 'jwtSecure', { expiresIn: 2500 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  }
});

app.get("/",SignupMiddleware,async(req,res)=>{
  // res.send("Home page")
  let user=Signup.findById(req.user1.id)
  if(user){
    res.send("Home page")
  }
})

// app.post('/add', SignupMiddleware, async (req, res) => {
//   let user = new Users(req.body);
//   let result = await user.save();
//   res.send(result);
// });


app.listen(4000);
