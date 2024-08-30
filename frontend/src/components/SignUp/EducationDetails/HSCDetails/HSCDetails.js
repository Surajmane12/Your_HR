import React, { useState, useEffect } from 'react';
import '../../SignUpForm/signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Make sure you have axios installed
import Swal from 'sweetalert2';
const HSCDetails = ({ onBack, onNext,userId }) => {
    const [formData, setFormData] = useState({
        userid:userId,
        hsc_type: '',
        hsc_dip_branch: '',
        hsc_dip_spec: '',
        hsc_clg_name: '',
        hsc_university: '',
        hsc_year_admission: '',
        hsc_year_passing: '',
        hsc_percentage: ''
    });

    const [errors, setErrors] = useState({});

   

    const validate = () => {
        const newErrors = {};

        if (!formData.hsc_type.trim()) newErrors.hsc_type = 'Degree Type is required';
        if (!formData.hsc_dip_branch.trim()) newErrors.hsc_dip_branch = 'Stream is required';
        if (!formData.hsc_clg_name.trim()) newErrors.hsc_clg_name = 'College Name is required';
        if (!formData.hsc_university.trim()) newErrors.hsc_university = 'University Name is required';
        if (!formData.hsc_year_admission.trim()) newErrors.hsc_year_admission = 'Year of Admission is required';
        if (!formData.hsc_year_passing.trim()) newErrors.hsc_year_passing = 'Year of Passing is required';
        if (!formData.hsc_percentage.trim()) newErrors.hsc_percentage = 'Percentage/CGPA is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
        localStorage.setItem('HSCDetails', JSON.stringify({ ...formData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validate()) {
            return;
        }
    
        // Save form data before proceeding
        localStorage.setItem('HSCDetails', JSON.stringify(formData));
    
        try {
            console.log("Data to send:", formData);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup/education_details?hsc_details=true`, formData);
            console.log('Success:', response.data);
            Swal.fire({
                title: "HSC Details Added Successfully!!",
                text: "now continuew with SSC Details.",
                icon: "success"
              });
            onNext();
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        }
    };
    

    const handleBack = () => {
        // Save form data before going back
        localStorage.setItem('HSCDetails', JSON.stringify(formData));
        onBack();
    };

    return (
        <>
            <div className='container'>
                <div className="personal_detail_sec">
                    <div className="main_personal_sec">
                        <div className="head">
                            <h4>Education Details</h4>
                           
                        </div>
                        <div>
                            <form className="row g-3">
                                <div className="col-md-12">
                                    <p><b>HSC/Diploma:</b></p>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="hsc_type" className="form-label">Select Education</label>
                                    <select id="hsc_type" className={`form-select ${errors.hsc_type ? 'is-invalid' : ''}`} value={formData.hsc_type} onChange={handleChange}>
                                        <option value="">Choose...</option>
                                        <option value="HSC">HSC</option>
                                        <option value="Diploma">Diploma</option>
                                    </select>
                                    {errors.hsc_type && <div className="invalid-feedback">{errors.hsc_type}</div>}
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="hsc_dip_branch" className="form-label">Stream</label>
                                    <input type="text" className={`form-control ${errors.hsc_dip_branch ? 'is-invalid' : ''}`} id="hsc_dip_branch" value={formData.hsc_dip_branch} onChange={handleChange} />
                                    {errors.hsc_dip_branch && <div className="invalid-feedback">{errors.hsc_dip_branch}</div>}
                                </div>

                                <div className="col-md-4">
                                    <label htmlFor="hsc_dip_spec" className="form-label">Specialization (if any)</label>
                                    <input type="text" className={`form-control`} id="hsc_dip_spec" value={formData.hsc_dip_spec} onChange={handleChange} />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="hsc_clg_name" className="form-label">College Name</label>
                                    <input type="text" className={`form-control ${errors.hsc_clg_name ? 'is-invalid' : ''}`} id="hsc_clg_name" value={formData.hsc_clg_name} onChange={handleChange} />
                                    {errors.hsc_clg_name && <div className="invalid-feedback">{errors.hsc_clg_name}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="hsc_university" className="form-label">University Name</label>
                                    <input type="text" className={`form-control ${errors.hsc_university ? 'is-invalid' : ''}`} id="hsc_university" value={formData.hsc_university} onChange={handleChange} />
                                    {errors.hsc_university && <div className="invalid-feedback">{errors.hsc_university}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="hsc_year_admission" className="form-label">Year of Admission</label>
                                    <input type="number" className={`form-control ${errors.hsc_year_admission ? 'is-invalid' : ''}`} id="hsc_year_admission" value={formData.hsc_year_admission} onChange={handleChange} />
                                    {errors.hsc_year_admission && <div className="invalid-feedback">{errors.hsc_year_admission}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="hsc_year_passing" className="form-label">Year of Passing</label>
                                    <input type="number" className={`form-control ${errors.hsc_year_passing ? 'is-invalid' : ''}`} id="hsc_year_passing" value={formData.hsc_year_passing} onChange={handleChange} />
                                    {errors.hsc_year_passing && <div className="invalid-feedback">{errors.hsc_year_passing}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="hsc_percentage" className="form-label">Percentage/CGPA</label>
                                    <input type="text" className={`form-control ${errors.hsc_percentage ? 'is-invalid' : ''}`} id="hsc_percentage" value={formData.hsc_percentage} onChange={handleChange} />
                                    {errors.hsc_percentage && <div className="invalid-feedback">{errors.hsc_percentage}</div>}
                                </div>

                                <div className="col-12 d-flex justify-content-between mt-4">
                                    {/* <button type="button" className="btn btn-outline-primary" onClick={handleBack}>
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
            </div>
        </>
    );
}

export default HSCDetails;
