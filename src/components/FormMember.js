import React, { useState } from 'react'
import FormSignUp from './FormSignUp'
import FormLogin from './FormLogin'

const FormMember = () => {
    const [SignUpSuccess, setSignUpSuccess] = useState(false);


    function SignUpSuccessForm(){
        setSignUpSuccess(true)
    }
    
    return (
        <div>
            {!SignUpSuccess ? (<FormSignUp SignUpSuccessForm={SignUpSuccessForm} />) : (<FormLogin />) }
        </div>
    )
}

export default FormMember;
