const express = require("express");
const {add_education_details, add_personal_details, upload_resume,upload} = require("../../controller/UserController/UserController");
const router = express.Router();
const path = require('path');




router.post('/upload_resume/:userid',upload.single('file'),upload_resume);


router.post('/personaldetails',add_personal_details);

router.post('/education_details',add_education_details);




module.exports = router;
