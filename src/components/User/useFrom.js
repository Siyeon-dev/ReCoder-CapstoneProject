import axios from 'axios';
import {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useLocation } from "react-router";

const useForm = (callback, validate) => {

    const location = useLocation();
    const signUpType = location.state.signOtion;

    const [values, setValues] = useState({
        userName : '',
        userEmail : '',
        userPasswd : '',
        userPasswdConfirm : '',
        userTel : '',
        signType : ''
    });
    const [errors, setErrors] = useState({});
    const [SignUpSuccess, setSignUpSuccess] = useState(false);
    const history = useHistory();
    const [data, setData] = useState();

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name] : value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        
        let datas;

        if(signUpType === "teacher") {
            datas = {
                t_email : values.userEmail,
                t_name : values.userName,
                t_password : values.userPasswd,
                t_phone : values.userTel,
                type : signUpType
            };
            setData(datas);
        } else if (signUpType === "student"){
            datas = {
                s_email : values.userEmail,
                s_name : values.userName,
                s_password : values.userPasswd,
                s_phone : values.userTel,
                type : signUpType
            };
            setData(datas);
        }

        
        console.log(datas);
        setErrors(validate(values));

        axios.post('signup', datas).then(res => {
            console.log(res.data.mes);
                if(res.data.mes === "success" && res.status === 200){
                    alert("회원가입 되었습니다.");
                    history.push("/")
                }
        })
        .catch(err => {
            console.log(err)
        })

    }

    useEffect (() => {
            if (Object.keys(errors).length === 0 && SignUpSuccess) {
                callback();
            }
        },
        [errors]
    );

    return {handleChange, values, handleSubmit, errors};
};

export default useForm;