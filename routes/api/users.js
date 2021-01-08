const express = require('express');
// creates a routing object that handles routing od responses from application endpoints (URIs)
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');


router.post('/', (req, res) => {
    const {name, email, password} = req.body;

    //Simple Validation 
    if(!name||!email||!password){
        return res.status(400).json({ msg: 'Please enter all fields'});
    }

    //Check for existing user
    User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg:'USer already exists'});

            const newUser = new User({
                name,
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                {id :user.id},
                                config.get('jwtSecret'),
                                //3600 seconds
                                {expiresIn: 3600},
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )                           
                        });
                })
            })
        })
});
 
/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */

/** 
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});
*/

module.exports = router;