import React, { useState, useEffect } from 'react';
import '../../SignUp/SignUpForm/signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUpload, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const UploadDocuments = ({ onNext }) => {


    const navigate=useNavigate();

    const [userid, setUserId] = useState(0);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userid');
        setUserId(storedUserId);
        console.log(localStorage.getItem('userid'))
        console.log("Reusme ID :", localStorage.getItem('userid'));
    }, [localStorage.getItem('userid')]);


    console.log("Resume ID: ", userid)
    const [formData, setFormData] = useState({
        resume: null
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.resume) newErrors.resume = 'Resume is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, files } = e.target;
        console.log(files[0]);
        setFormData(prevData => ({ ...prevData, [id]: files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('file', formData.resume);

        try {
            console.log("Data to send:", formDataToSend);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup/upload_resume/${userid}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Success:', response.data);
            Swal.fire({
                title: "Resume Uploaded Successfully!!",
                icon: "success"
            });

        } catch (error) {
            Swal.fire({
                title: `Error: ${error}`,
                text: "Something went wrong",
                icon: "error"
            });

        }
    };

    const handleFinalSubmit = () => {
        Swal.fire({
            title: "Account Created Successfully!!",
            text: "Thanks for submitting form!",
            icon: "success"
        });
        navigate('/')
    }

    return (
        <>
            <div className='container'>
                <div className="personal_detail_sec">
                    <div className="main_personal_sec">
                        <div className="head">
                            <h4>Upload Documents</h4>
                            <p>Make sure you have the latest resume:</p>
                        </div>
                        <div>
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-md-12">
                                    <p><b>Upload Documents :</b></p>
                                </div>
                                <div className='col-md-12'>
                                    <label htmlFor="resume" className="form-label">Upload Resume</label>
                                    <div className="input-group">
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            className={`form-control ${errors.resume ? 'is-invalid' : ''}`}
                                            id="resume"
                                            aria-describedby="inputGroupFileAddon04"
                                            aria-label="Upload"
                                            onChange={handleChange}
                                        />
                                        <button type="submit" className="btn btn-primary">
                                            Upload <FontAwesomeIcon icon={faUpload} />
                                        </button>
                                    </div>
                                    {errors.resume && <div className="invalid-feedback">{errors.resume}</div>}
                                </div>
                                <div className="col-12 d-flex justify-content-center mt-4 mb-4">

                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={handleFinalSubmit}>
                                        Confirm Registration <FontAwesomeIcon icon={faCircleCheck} />
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UploadDocuments;
