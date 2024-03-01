const express = require("express");
const auth = require("../middleware/auth");
const User = require("../schemas/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require('cors');

const router = express.Router();
router.use(cors());

function logUserMiddleware(req, res, next) {
    req.logUser = function(user) {
      console.log('测试-user', user);
    }
    next();
  }

  router.use(logUserMiddleware);

  router.post('/recharge/:userId', auth, async (req, res) => {
    const userId = req.params.userId;
    const { rechargeValue } = req.body;
  
    // 这里应该根据你的需求来设置过滤条件
    if (true) {
      try {
        const user = await User.findById(userId);
  
        // 如果用户没有currency属性，创建它并设值为0
        if (!user.currency) {
          user.currency = { value: 0 };
        }
  
        user.currency.value += rechargeValue;
        await user.save();
        res.json({ message: 'Recharge successful', value: user.currency.value });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while recharging.' });
      }
    } else {
      res.status(403).json({ error: 'User is not allowed to recharge.' });
    }
  });

  router.get('/profile/:userId', auth, async (req, res) => {
    try {
        const userId = req.params.userId; // 从URL获取用户ID
        console.log('/profile请求-userId',userId)

        const user = await User.findById(userId).populate('currency');
        //req.logUser(user); // 使用中间件方法打印用户信息
        //console.log('测试-user',user)
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

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
        //req.logUser(user); // 使用中间件方法打印用户信息
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

console.log('/profile请求路由设置')


module.exports = router;