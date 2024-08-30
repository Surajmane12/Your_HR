import React, { useState,useEffect } from 'react';
import Stepper from 'react-stepper-horizontal';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import UploadDocuments from '../Upload Documents/UploadDocuments';
import EducationDetails from '../EducationDetails/EducationDetails';
import './signup.css';

const SignUpForm = () => {


  const [currentStep, setCurrentStep] = useState(0);
  const [userid, setUserID] = useState(0);


  const steps = [
    { title: 'Personal Info' },
    { title: 'Education Details' },
    { title: 'Upload Resume' },
  ];


    useEffect(() => {
        const storedUserID = localStorage.getItem('userid');
        if (storedUserID) {
            setUserID(storedUserID);
        }
    }, [localStorage.getItem('userid')]);

  const handleStepNext = () => {
   
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => setCurrentStep((prevStep) => prevStep - 1);

  const handleSubmit = () => {
    console.log("Form submitted");
    // You can also retrieve the userId from localStorage here if needed
    const storedUserId = localStorage.getItem('userId');
    console.log("Stored User ID:", storedUserId);
  };

  return (
    <div className="container">
      <div className="outer_sign_up_form">
        <div className="outer_actual_steps">
          <div className="actual_steps">
            <Stepper
              steps={steps}
              activeStep={currentStep}
              activeColor="#4caf50"
              completeColor="#4caf50"
              size={42}
              circleFontSize={20}
            />
            <hr />
          </div>

          <div>
            {currentStep === 0 && (
              <PersonalDetails StepNext={handleStepNext} />
            )}
            {currentStep === 1 && (
              <EducationDetails
                StepNext={handleStepNext}
                handleBack={handleBack}
                userId={userid} // Get userId from localStorage
              />
            )}
            {currentStep === 2 && (
              <UploadDocuments StepNext={handleStepNext}  userId={userid} />
            )}
          </div>

          {/* <div style={{ marginTop: 20 }}>
            <button
              disabled={currentStep === 0}
              onClick={handleBack}
              style={{ marginRight: 10 }}
            >
              Back
            </button>
            {currentStep === steps.length - 1 ? (
              <button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <button variant="contained" color="primary" onClick={() => handleStepNext()}>
                Next
              </button>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
