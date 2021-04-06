let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let users = require('../models/users').usersModel;
let JWT_SECRET = require('../config').JWT_SECRET;
let JWT_EXPIRES_IN = require('../config').JWT_EXPIRES_IN;
let jwt = require('jsonwebtoken');

router.post('/login', function(req, res, next) {
  try {
    users.findOne({email: req.body.email}, function(err, data) {
      if (err) {
        return res.status(500).send({ message: 'Internal server error'});
      } else if (data != undefined && data != null) {
        
        if (data.password !== req.body.password) {
          return res.status(400).send({ message: 'auth/wrong-password'});
        }
        const accessToken = jwt.sign({ userId: data._id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN
        });

        return res.json({ status: 200, user: data,  accessToken });
      } else {
        return res.status(400).send({ message: 'auth/user-not-found'});
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
});

router.post('/register', function(req, res, next) {
  try {
    let saveUser = () => {
      user = new users;
      user.displayName = req.body.firstName + ' ' + req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.role = 'user';
      user.isPublic = true;
      user.save((err, doc) => {
        if (err) {
          return res.status(500).send({ message: 'Internal server error'});
        }
        const accessToken = jwt.sign({ userId: doc._id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN
        });
    
        return res.json({status: 200, accessToken, user });
      });
    }
    users.findOne({email: req.body.email, password: req.body.password}, function(err, data) {
      if (err) {
        
            return res.status(500).send({ message: 'Internal server error'});
      } else if (data != undefined && data != null) {
        if (data.length == 0) {
          return saveUser();
        }
        return res.status(400).send({ message: "auth/email-already-in-use"});
      } else {
        return saveUser();
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
});

router.get('/my-account', function(req, res, next) {

  try {
    const Authorization  = req.rawHeaders[req.rawHeaders.indexOf('Authorization') + 1];

    if (!Authorization) {
      return res.status(401).send({ message: 'Authorization token missing'});
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);
    users.findOne({_id: userId}, (err, data) => {
      if (err) {
        return res.status(500).send({ message: 'Internal server error'});
      } else if (data != undefined && data != null) {
        if (data.length == 0) {
          return res.status(401).send({ message: 'Invalid authorization token'});
        }

        return res.json({ status: 200, user: data});
      } else {
        return res.status(401).send({ message: 'Invalid authorization token'});
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
});

router.post('/update-profile', function(req, res, next) {

  try {
    const Authorization  = req.rawHeaders[req.rawHeaders.indexOf('Authorization') + 1];

    if (!Authorization) {
      return res.status(401).send({ message: 'Authorization token missing'});
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);

    console.log(userId, req.body);

    users.updateOne({_id: userId}, {...req.body}, (err, data) => {
      if (err) {
        return res.status(500).send({ message: 'Internal server error'});
      } else if (data != undefined && data != null) {
        if (data.length == 0) {
          return res.status(401).send({ message: 'User not exists'});
        }
        users.findOne({_id: userId}, (err, doc) => {
          const accessToken = jwt.sign({ userId: doc._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
          });
  
          return res.json({ status: 200, user: doc,  accessToken });
        });
      } else {
        return res.status(401).send({ message: 'User not exists'});
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
});

router.post('/reset-password', function(req, res, next) {

  try {

    users.updateOne({email: req.body.email, password: req.body.password}, {password: req.body.newPassword}, (err, data) => {
      if (err) {
        return res.status(500).send({ message: 'Internal server error'});
      } else if (data != undefined && data != null) {
        if (data.length == 0) {
          return res.status(401).send({ message: 'Password mismatch'});
        }
        console.log(data);
        users.findOne({email: req.body.email, password: req.body.newPassword}, (err, doc) => {
          const accessToken = jwt.sign({ userId: doc._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
          });
         
          return res.json({ status: 200, user: doc,  accessToken });
        });
      } else {
        return res.status(401).send({ message: 'Password mismatch'});
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
});
module.exports = router;
