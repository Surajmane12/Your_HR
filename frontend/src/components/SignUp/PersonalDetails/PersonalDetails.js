import React, { useState } from 'react';
import '../../SignUp/SignUpForm/signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Make sure you have axios installed
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const PersonalDetails = ({StepNext}) => {
    
    const navigate=useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        gender: '',
        mobileNumber: '',
        alternateContact: '',
        email: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        nationality: '',
        maritalStatus: ''
    });

    const [userid,setUserID]=useState(0);

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!formData.dob.trim()) newErrors.dob = 'Date of Birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zip.trim()) newErrors.zip = 'Pin code is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validate()) {
            return;
        }
    
        try {
            console.log("Data to send:", formData);
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup/personaldetails`, formData);
            console.log('Success:', response.data.id);
            const id = response.data.id;
    
            if (response.status === 200) {
                Swal.fire({
                    title: "Personal Details Addedd Successfully!!",
                    text: "Now Continue with Education Details.",
                    icon: "success"
                  });
                setUserID(id);
    
                localStorage.setItem('userid',id);

                StepNext();
            }
    
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        }
    };
    

    return (
        <>
            <div className='container'>
                <div className="personal_detail_sec">
                    <div className="main_personal_sec">
                        <div className="head">
                            <h4>Personal Details</h4>
                        </div>
                        <div>
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-md-4">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} id="firstName" value={formData.firstName} onChange={handleChange} />
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="middleName" className="form-label">Middle Name</label>
                                    <input type="text" className="form-control" id="middleName" value={formData.middleName} onChange={handleChange} />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} id="lastName" value={formData.lastName} onChange={handleChange} />
                                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                                    <input type="date" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} id="dob" value={formData.dob} onChange={handleChange} />
                                    {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                                </div>

                                <div className="col-md-6 mb-2">
                                    <label htmlFor="gender" className="form-label">Gender</label>
                                    <select id="gender" className={`form-select ${errors.gender ? 'is-invalid' : ''}`} value={formData.gender} onChange={handleChange}>
                                        <option value="">Choose...</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Transgender">Transgender</option>
                                    </select>
                                    {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                                </div>
                                <hr />
                                <div className="col-md-12">
                                    <p><b>Contact Information *</b></p>
                                </div>
                                <div className="col-md-6 mt-0">
                                    <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
                                    <input type="text" className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`} id="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
                                    {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                                </div>

                                <div className="col-md-6 mt-0">
                                    <label htmlFor="alternateContact" className="form-label">Alternate Contact (Optional)</label>
                                    <input type="text" className="form-control" id="alternateContact" value={formData.alternateContact} onChange={handleChange} />
                                </div>
                                <div className="col-md-12 mb-2">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" value={formData.email} onChange={handleChange} />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <hr />

                                <div className="col-md-12">
                                    <p><b>Address*</b></p>
                                </div>
                                <div className="col-md-6 mt-0">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className={`form-control ${errors.address ? 'is-invalid' : ''}`} id="address" placeholder="1234 Main St" value={formData.address} onChange={handleChange} />
                                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                </div>
                                <div className="col-md-6 mt-0">
                                    <label htmlFor="address2" className="form-label">Address 2</label>
                                    <input type="text" className="form-control" id="address2" placeholder="Apartment, studio, or floor" value={formData.address2} onChange={handleChange} />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className={`form-control ${errors.city ? 'is-invalid' : ''}`} id="city" value={formData.city} onChange={handleChange} />
                                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select id="state" className={`form-select ${errors.state ? 'is-invalid' : ''}`} value={formData.state} onChange={handleChange}>
                                        <option value="">Choose...</option>
                                        <option value="State1">State1</option>
                                        <option value="State2">State2</option>
                                    </select>
                                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="zip" className="form-label">Pin</label>
                                    <input type="text" className={`form-control ${errors.zip ? 'is-invalid' : ''}`} id="zip" value={formData.zip} onChange={handleChange} />
                                    {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                                </div>

                                <div className="col-md-6 mt-4">
                                    <label htmlFor="nationality" className="form-label">Nationality</label>
                                    <select id="nationality" className={`form-select ${errors.nationality ? 'is-invalid' : ''}`} value={formData.nationality} onChange={handleChange}>
                                        <option value="">Choose...</option>
                                        <option value="Indian">Indian</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                                </div>

                                <div className="col-md-6 mt-4">
                                    <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
                                    <select id="maritalStatus" className={`form-select ${errors.maritalStatus ? 'is-invalid' : ''}`} value={formData.maritalStatus} onChange={handleChange}>
                                        <option value="">Choose...</option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                        <option value="Widowed">Widowed</option>
                                    </select>
                                    {errors.maritalStatus && <div className="invalid-feedback">{errors.maritalStatus}</div>}
                                </div>

                                <div className="col-12 d-flex justify-content-center mt-4 mb-4">
                                    {/* <button type="button" className="btn btn-outline-primary">
                                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                                    </button> */}
                                    <button type="submit" className='btn btn-primary'>
                                        Save and Proceed <FontAwesomeIcon icon={faArrowRight} />
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

export default PersonalDetails;
