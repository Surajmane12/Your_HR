import React, { useState, useEffect } from 'react';
import '../../SignUpForm/signup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

const DegreeDetails = ({ onNext, userId }) => {

    console.log("Degree",userId)

    const [formData, setFormData] = useState({
        userid: userId,
        highestQualification: '',
        branch: '',
        specialization: '',
        collegeName: '',
        universityName: '',
        yearOfAdmission: '',
        yearOfPassing: '',
        percentageCGPA: ''
        // ...personalDetails // Include personal details in the formData state
    });

    const [errors, setErrors] = useState({});


    useEffect(() => {
        setFormData(prevData => ({ ...prevData, userid: userId }));
    }, [userId]);

   

    const validate = () => {
        const newErrors = {};

        if (!formData.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
        if (!formData.branch) newErrors.branch = 'Branch is required';
        if (!formData.specialization) newErrors.specialization = 'Specialization is required';
        if (!formData.collegeName.trim()) newErrors.collegeName = 'College Name is required';
        if (!formData.universityName.trim()) newErrors.universityName = 'University Name is required';
        if (!formData.yearOfAdmission) newErrors.yearOfAdmission = 'Year of Admission is required';
        if (!formData.yearOfPassing) newErrors.yearOfPassing = 'Year of Passing is required';
        if (!formData.percentageCGPA) newErrors.percentageCGPA = 'Percentage/CGPA is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
        localStorage.setItem('DegreeDetails', JSON.stringify({ ...formData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        // Save form data before proceeding
        localStorage.setItem('DegreeDetails', JSON.stringify(formData));

        try {
            console.log("Data to send:", formData);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup/education_details`, formData);
            console.log('Success:', response.data);
            Swal.fire({
                title: "Highest Qualification Added Successfully!!",
                icon: "success"
              });
            onNext(); // Proceed to the next step only after successful validation and submission
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className='container'>
            <div className="personal_detail_sec">
                <div className="main_personal_sec">
                    <div className="head">
                        <h4>Education Details</h4>
                    </div>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <p><b>Degree Details:</b></p>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="highestQualification" className="form-label">(Degree/Masters)</label>
                            <select id="highestQualification" className={`form-select ${errors.highestQualification ? 'is-invalid' : ''}`} value={formData.highestQualification} onChange={handleChange}>
                                <option value="">Choose...</option>
                                <option value="Bachelors">Bachelors</option>
                                <option value="Masters">Masters</option>
                            </select>
                            {errors.highestQualification && <div className="invalid-feedback">{errors.highestQualification}</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="branch" className="form-label">Branch</label>
                            <select id="branch" className={`form-select ${errors.branch ? 'is-invalid' : ''}`} value={formData.branch} onChange={handleChange}>
                                <option value="">Choose...</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Electrical">Electrical</option>
                            </select>
                            {errors.branch && <div className="invalid-feedback">{errors.branch}</div>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="specialization" className="form-label">Specialization (if any)</label>
                            <select id="specialization" className={`form-select ${errors.specialization ? 'is-invalid' : ''}`} value={formData.specialization} onChange={handleChange}>
                                <option value="">Choose...</option>
                                <option value="AI">AI</option>
                                <option value="Data Science">Data Science</option>
                            </select>
                            {errors.specialization && <div className="invalid-feedback">{errors.specialization}</div>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="collegeName" className="form-label">College Name</label>
                            <input type="text" className={`form-control ${errors.collegeName ? 'is-invalid' : ''}`} id="collegeName" value={formData.collegeName} onChange={handleChange} />
                            {errors.collegeName && <div className="invalid-feedback">{errors.collegeName}</div>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="universityName" className="form-label">University Name</label>
                            <input type="text" className={`form-control ${errors.universityName ? 'is-invalid' : ''}`} id="universityName" value={formData.universityName} onChange={handleChange} />
                            {errors.universityName && <div className="invalid-feedback">{errors.universityName}</div>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="yearOfAdmission" className="form-label">Year of Admission</label>
                            <input type="number" className={`form-control ${errors.yearOfAdmission ? 'is-invalid' : ''}`} id="yearOfAdmission" value={formData.yearOfAdmission} onChange={handleChange} />
                            {errors.yearOfAdmission && <div className="invalid-feedback">{errors.yearOfAdmission}</div>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="yearOfPassing" className="form-label">Year of Passing</label>
                            <input type="number" className={`form-control ${errors.yearOfPassing ? 'is-invalid' : ''}`} id="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} />
                            {errors.yearOfPassing && <div className="invalid-feedback">{errors.yearOfPassing}</div>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="percentageCGPA" className="form-label">Percentage/CGPA</label>
                            <input type="text" className={`form-control ${errors.percentageCGPA ? 'is-invalid' : ''}`} id="percentageCGPA" value={formData.percentageCGPA} onChange={handleChange} />
                            {errors.percentageCGPA && <div className="invalid-feedback">{errors.percentageCGPA}</div>}
                        </div>

                        <div className="col-12 d-flex justify-content-between mt-4">
                            {/* <button type="button" className="btn btn-outline-primary" onClick={() => onNext('back')}>
                                <FontAwesomeIcon icon={faArrowLeft} /> Back
                            </button> */}
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                Save and Continue <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>

                        <hr />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DegreeDetails;
