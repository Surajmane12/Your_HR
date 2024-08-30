import React, { useState } from 'react';
import '../../SignUp/SignUpForm/signup.css';
import DegreeDetails from './Degree/DegreeDetails';
import HSCDetails from './HSCDetails/HSCDetails';
import SSC_Details from './SSC_Details/SSC_Details';
import { useEffect } from 'react';


const EducationDetails = ({StepNext}) => {

    const [currentSection, setCurrentSection] = useState('degree'); // 'degree', 'hsc', 'ssc', etc.

    const [userId, setUserId] = useState(0);

    useEffect(() => {
      const storedUserId = localStorage.getItem('userid');
      setUserId(storedUserId);
      console.log(localStorage.getItem('userid'))
    }, [localStorage.getItem('userid')]);
  

    console.log("Edu Compo: ",userId)

    const handleNext = () => {
        console.log("clikced")

        if (currentSection === 'degree') {
            setCurrentSection('hsc');
        } else if (currentSection === 'hsc') {
            setCurrentSection('ssc')
        }
        else if(currentSection==='ssc') {
            console.log("SSC")
            StepNext();
           
        }
    };

    const handleBack = () => {
        if (currentSection === 'hsc') {
            console.log("Back")
            setCurrentSection('degree');
        } else if (currentSection === 'ssc') {
            setCurrentSection('hsc');
        }
       
    
}

    return (
        <div className='container'>


            <div className="education-details">
                {currentSection === 'degree' && (
                    <DegreeDetails onNext={handleNext} userId={userId} />
                )}
                {currentSection === 'hsc' && (
                    <HSCDetails onBack={handleBack} onNext={handleNext} userId={userId}/>
                )}
                {currentSection === 'ssc' && (
                    <SSC_Details onBack={handleBack} onNext={StepNext} userId={userId}/>
                )}

            </div>
        </div>
    );
}

export default EducationDetails;
