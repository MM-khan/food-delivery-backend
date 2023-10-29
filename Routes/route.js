const express = require("express");
const route = express.Router();
const user = require("../SchemasFolder/schema.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "helloiammehtabalikhanfromsweden";

// signup router
route.post("/createuser",
    [
        body("name").isLength({ min: 5 }),
        body("email").isEmail(),
        body("password", "max length is 5 charectors!").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);
        try {
            await user.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            });
            res.json({ success: true });
            // console.log(secPassword);
        } catch (error) {
            res.json({ success: false })
            console.log(error);
        }
    });

// login router

route.post("/userlogin",
    [body("email").isEmail(),
    body("password", "max length is 5 charectors!").isLength({ min: 5 })
    ],
    async (req, res) => {
        let email = req.body.email;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() })
        }
        try {
            let userData = await user.findOne({email});
            if (!userData) {
                return res.status(404).json({ error: "Invalid email credentials" });
            }
            passCompare = bcrypt.compare(req.body.password,userData.password);

            if (!passCompare) {
                return res.status(404).json({ error: "Try Again with Correct credentials" });
            }
            data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret);

            return res.json({ success: true,authToken:authToken})
        } catch (error) {
            res.json({ success: false })
            console.log(error);
        }
    })
module.exports = route