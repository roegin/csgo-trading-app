const express = require("express");
const auth = require("../middleware/auth");
const User = require("../schemas/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

function logUserMiddleware(req, res, next) {
    req.logUser = function(user) {
      console.log('测试-user', user);
    }
    next();
  }

  router.use(logUserMiddleware);

router.post("/register", async(req, res) => {
    const {username, password} = req.body;

    try {
        let user = await User.findOne({username});
        if(user) {
            return res.status(400).json({
                msg:"User already exists"
            });
        }
        user = new User({
            username,
            password
        });
        const s = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, s);

        await user.save();

        res.status(200).json({
            msg: "User created successfully"
        });
    } catch(error) {
        res.status(500).json({
            msg: error.message
        });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username: username });

        if(!user) {
            return res.status(400).json({
                msg: "Invalid username"
            });
        }

        const flag = await bcrypt.compare(password, user.password);
        if(!flag) {
            return res.status(400).json({
                msg: "Invalid password"
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'secret-key', { expiresIn: 10000 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                token,
            });
        });
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        req.logUser(user); // 使用中间件方法打印用户信息
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});

router.get("/secure-api", auth, async (req, res) => {
    try {
        res.json({
            msg : 'Secure Api Tested'
        });
    } catch (e) {
        res.send({ msg: "Error in Fetching user" });
    }
});

router.get('/profile', auth, async (req, res) => {
    console.log('/profile请求')
    try {
     const user = await User.findById(req.user.id).populate('currency');
     req.logUser(user); // 使用中间件方法打印用户信息
     console.log('测试-user',user)
     res.json(user);
    } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
   });

module.exports = router;