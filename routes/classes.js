const express = require('express');
const classController = require('../controller/classes');
const router = express.Router();
const user = require('../models/users');
const { route } = require('./users');

//kd45UzTiPpcSHlSZ
/* GET home page. */

router.get('/', classController.getAllClass)

router.get('/create-class', (req, res, next) => {
  res.render('layout', {
    contentPage: './classes/createClass'
  });
});

router.post('/create-class', classController.createClass);

router.post('/class-detail/:classCode', classController.postComments);

router.post('/class-detail/edit/:classCode', classController.postEditClass);

//

router.get('/class-detail/edit/:classCode', classController.getEditClassDetail);

router.get('/class-detail/:classCode', classController.getClassDetail);

router.get('/user', async (req, res, next) => {
  const users = await user.find();
  res.send(users);
})

router.delete('/class-detail/delete/:classcode', classController.deleteClass)

router.delete('/class-detail/:classcode/delete-member/:username', classController.deleteMemberInClass)


module.exports = router;
