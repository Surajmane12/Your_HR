const bcrypt = require('bcrypt');
const connection = require('../../config/dbConfig');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../../config/dbConfig');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve('controller/UserController/Uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });





const upload_resume = asyncHandler(async (req, res) => {
  const id = req.params.userid;
  console.log("To upload resume:", req.body,req.params.userid);


  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  if (!req.file.originalname.match(/\.(pdf)$/)) {
    res.send({ msg: 'Only image files (pdf) are allowed!' })
  };

  const filename = req.file.filename;
  console.log(filename)
  const postDate = new Date();

  const sql = `INSERT INTO user_resume(id,resume) VALUES (?,?)`;

  connection.query(sql, [id, filename], (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'PDF file uploaded and saved in database' });
  });
});





const add_personal_details = asyncHandler(async (req, res) => {

  console.log("Data:", req.body)

  const {
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    mobileNumber,
    alternateContact,
    email,
    address,
    address2,
    city,
    state,
    zip,
    nationality,
    maritalStatus } = req.body;


  const sql = `INSERT INTO employee_personaldetails (
    first_name, middle_name, last_name, dob, gender, mobile_number, alternate_contact, 
    email, address1, address2, city, state, zip, nationality, marital_status
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`

  connection.query(sql, [firstName, middleName, lastName, dob, gender, mobileNumber, alternateContact, email, address, address2, city, state, zip, nationality, maritalStatus], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Added Successfully!!', id: result.insertId });
  });
});


const add_education_details = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body);
  const HSCParam = req.query.hsc_details;
  const SSCParam=req.query.ssc_details;

  const { userid } = req.body;
  console.log(req.body);
  if (!userid) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    if (HSCParam) {
      const {
        hsc_type,
        hsc_dip_branch,
        hsc_dip_spec,
        hsc_clg_name,
        hsc_university,
        hsc_year_admission,
        hsc_year_passing,
        hsc_percentage,
      } = req.body;

      const sql = `INSERT INTO hsc_details (
        user_id,
        hsc_type,
        hsc_dip_branch,
        hsc_dip_spec,
        hsc_clg_name,
        hsc_university,
        hsc_year_admission,
        hsc_year_passing,
        hsc_percentage
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      connection.query(sql, [
        userid,
        hsc_type,
        hsc_dip_branch,
        hsc_dip_spec,
        hsc_clg_name,
        hsc_university,
        hsc_year_admission,
        hsc_year_passing,
        hsc_percentage
      ], (err, result) => {
        if (err) {
          console.log('Error:', err);
          return res.status(500).json({ error: 'An error occurred while saving HSC details.' });
        }
        return res.status(200).json({ message: 'HSC Details Successfully Added!', id: result.insertId });
      });
    } 
    
    else if (SSCParam) {
      console.log("SSC Called!!");
      const {
          userid,
          ssc_type,
          school_name,
          board_name,
          school_admission_year,
          school_passing_year,
          ssc_percentage,
      } = req.body;
  
      const sql = `INSERT INTO ssc_details (
          user_id,
          ssc_type,
          school_name,
          board_name,
          school_admission_year,
          school_passing_year,
          ssc_percentage
      ) VALUES (?, ?, ?, ?, ?, ?, ?);`;
  
      connection.query(sql, [
          userid,
          ssc_type,
          school_name,
          board_name,
          school_admission_year,
          school_passing_year,
          ssc_percentage,
      ], (err, result) => {
          if (err) {
              console.log('Error:', err);
              return res.status(500).json({ error: 'An error occurred while saving SSC details.' });
          }
          return res.status(200).json({ message: 'SSC Details Successfully Added!', id: result.insertId });
      });
  }
  
    else {
      console.log("Degree Insertion")
      const {
        highestQualification,
        branch,
        specialization,
        collegeName,
        universityName,
        yearOfAdmission,
        yearOfPassing,
        percentageCGPA
      } = req.body;

      const sql = `INSERT INTO education_details (
        userid,
        highest_qualification,
        branch,
        specialization,
        college_name,
        university_name,
        year_of_admission,
        year_of_passing,
        percentage_CGPA
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      connection.query(sql, [
        userid,
        highestQualification,
        branch,
        specialization,
        collegeName,
        universityName,
        yearOfAdmission,
        yearOfPassing,
        percentageCGPA
      ], (err, result) => {
        if (err) {
          console.log('Error:', err);
          return res.status(500).json({ error: 'An error occurred while saving education details.' });
        }
        return res.status(200).json({ message: 'Education Details Successfully Added!', id: result.insertId });
      });
    }
  } catch (error) {
    console.error('Error:', error);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
});



module.exports = { upload_resume,add_education_details, add_personal_details, upload };