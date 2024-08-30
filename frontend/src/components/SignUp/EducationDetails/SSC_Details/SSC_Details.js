import React, { useState, useEffect } from 'react';
import '../../SignUpForm/signup.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';


const SSC_Details = ({ onBack, onNext, userId }) => {
    const [formData, setFormData] = useState({
        userid: userId,
        ssc_type: 'SSC',
        school_name: '',
        board_name: '',
        school_admission_year: '',
        school_passing_year: '',
        ssc_percentage: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('SSCDetails')) || {};
        setFormData(prevData => ({ ...prevData, ...savedData }));
    }, []);

    const validate = () => {
        const newErrors = {};

        if (!formData.ssc_type.trim()) newErrors.ssc_type = 'Education type is required';
        if (!formData.school_name.trim()) newErrors.school_name = 'School Name is required';
        if (!formData.board_name.trim()) newErrors.board_name = 'Board Name is required';
        if (!formData.school_admission_year.trim()) newErrors.school_admission_year = 'Year of Admission is required';
        if (!formData.school_passing_year.trim()) newErrors.school_passing_year = 'Year of Passing is required';
        if (!formData.ssc_percentage.trim()) newErrors.ssc_percentage = 'Percentage/CGPA is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
        // localStorage.setItem('SSCDetails', JSON.stringify({ ...formData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        // localStorage.setItem('SSCDetails', JSON.stringify(formData));

        try {
            console.log("SSC Data to send:", formData);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup/education_details?ssc_details=true`, formData);

            if (response.status === 200) {
                console.log('Success:', response.data);
                Swal.fire({
                    title: "SSC Details Added Successfully!!",
                    text: "Now continue with Resume uploading!",
                    icon: "success"
                  });
                // localStorage.setItem("userid",response.data.id);
                onNext();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBack = () => {
        localStorage.setItem('SSCDetails', JSON.stringify(formData));
        onBack();
    };

    return (
        <div className='container'>
            <div className="personal_detail_sec">
                <div className="main_personal_sec">
                    <div className="head">
                        <h4>Education Details</h4>
                    </div>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-12">
                            <p><b>SSC Details:</b></p>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="ssc_type" className="form-label">Select Education</label>
                            <select id="ssc_type" className={`form-select ${errors.ssc_type ? 'is-invalid' : ''}`} value={formData.ssc_type} onChange={handleChange}>
                                <option defaultChecked>Select</option>
                                <option value="SSC">SSC</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="school_name" className="form-label">School Name</label>
                            <input type="text" className={`form-control ${errors.school_name ? 'is-invalid' : ''}`} id="school_name" value={formData.school_name} onChange={handleChange} />
                            {errors.school_name && <div className="invalid-feedback">{errors.school_name}</div>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="board_name" className="form-label">Board Name</label>
                            <input type="text" className={`form-control ${errors.board_name ? 'is-invalid' : ''}`} id="board_name" value={formData.board_name} onChange={handleChange} />
                            {errors.board_name && <div className="invalid-feedback">{errors.board_name}</div>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="school_admission_year" className="form-label">Year of Admission</label>
                            <input type="number" className={`form-control ${errors.school_admission_year ? 'is-invalid' : ''}`} id="school_admission_year" value={formData.school_admission_year} onChange={handleChange} />
                            {errors.school_admission_year && <div className="invalid-feedback">{errors.school_admission_year}</div>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="school_passing_year" className="form-label">Year of Passing</label>
                            <input type="number" className={`form-control ${errors.school_passing_year ? 'is-invalid' : ''}`} id="school_passing_year" value={formData.school_passing_year} onChange={handleChange} />
                            {errors.school_passing_year && <div className="invalid-feedback">{errors.school_passing_year}</div>}
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="ssc_percentage" className="form-label">SSC Percentage/CGPA</label>
                            <input type="text" className={`form-control ${errors.ssc_percentage ? 'is-invalid' : ''}`} id="ssc_percentage" value={formData.ssc_percentage} onChange={handleChange} />
                            {errors.ssc_percentage && <div className="invalid-feedback">{errors.ssc_percentage}</div>}
                        </div>

                        <div className="col-12 d-flex justify-content-between mt-4">
                            {/* <button type="button" className="btn btn-outline-primary" onClick={handleBack}>
                                <FontAwesomeIcon icon={faArrowLeft} /> Back
                            </button> */}
                            <button type="submit" className="btn btn-primary">
                                Submit <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>

                        <hr />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SSC_Details;
