const classes = require('../models/classes');
const comments = require('../models/comments')

//https://www.npmjs.com/package/dotenv
const cloudinary = require("cloudinary");
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const classController = {};

classController.getAllClass = async (req, res, next) => {
    try {
        const classesList = await classes.find();
        res.render('layout', {
            contentPage: '../views/classes/classes',
            classesList: classesList
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.createClass = async (req, res, next) => {
    const classData = req.body
    const newClass = new classes({
        className: classData.className,
        classCode: classData.classCode,
        numberOfStudent: classData.numberOfStudent,
        classStudents: [],
        classTeachers: [res.locals.username]
    });
    try {
        const classes = await newClass.save();
        console.log(classes)
        res.redirect("/classes/")
    } catch (err) {
        if (err)
            console.log(err);
    }
}

classController.postEditClass = async (req, res, next) => {
    const classData = req.body
    let classExist = await classes.findOne({
        classCode: req.params.classCode
    })
    try {
        classExist.classCode = classData.classCode;
        classExist.className = classData.className;
        classExist.numberOfStudent = classData.numberOfStudent;
        const classResult = await classExist.save();
        console.log(classResult)
        res.redirect("/classes/class-detail/" + classData.classCode)
    } catch (err) {
        if (err)
            console.log(err);
    }
}

classController.getClassDetail = async (req, res, next) => {
    const classCode = req.params.classCode;
    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });
        const listComments = await comments.find({
            classCode: classCode
        })

        res.render('layout', {
            contentPage: '../views/classes/classDetailAdmin',
            classDetail: classDetail,
            listComments: listComments.reverse()
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.getEditClassDetail = async (req, res, next) => {
    const classCode = req.params.classCode;
    try {
        const classDetail = await classes.findOne({
            classCode: classCode
        });

        res.render('layout', {
            contentPage: '../views/classes/editClass',
            classDetail: classDetail,
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.postComments = async (req, res, next) => {
    var currentdate = new Date()
    var month = currentdate.getMonth() + 1
    var datetime = month + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " - "
        + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    const newComments = new comments({
        user: res.locals.username,
        classCode: req.params.classCode,
        createDate: datetime,
        text: req.body.comment
    });
    try {
        const resultComment = await newComments.save();
        console.log(resultComment)
        res.redirect("/classes/class-detail/" + req.params.classCode)
    } catch (err) {
        if (err)
            console.log(err);
    }
}

classController.getAdduser = async (req, res, next) => {
    const classCode = req.params.classCode;
    try {
        const addUser = await classes.findOne({
            classCode: classCode
        });
        res.render('layout', {
            contentPage: '../views/classes/addUser',
            addUser: addUser
        })
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.deleteClass = async (req, res, next) => {
    const classCode = req.body.classCode;
    console.log(classCode)
    try {
        await classes.deleteOne({
            classCode: classCode
        });
        res.send("Class with classcode " + classCode + " deleted successfully")
    } catch (err) {
        console.log(err);
        throw err;
    }
}

classController.deleteMemberInClass = async (req, res, next) => {
    const data = req.body;
    console.log(data)
    try {
        let classDetail = await classes.findOne({
            classCode: data.classCode
        });
        if (data.member == "teacher") {
            const j = classDetail.classTeachers.indexOf(data.username)
            classDetail.classTeachers.splice(j, 1)
        } else {
            const j = classDetail.classStudents.indexOf(data.username)
            classDetail.classStudents.splice(j, 1)
        }
        const classResult = await classDetail.save()
        console.log(classResult)
        res.send("Member with username " + data.username + " deleted successfully")
    } catch (err) {
        console.log(err);
        throw err;
    }
}
module.exports = classController;