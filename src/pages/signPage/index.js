import React,{ useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Input, InputNumber, Button, Typography, Radio } from 'antd';
import { useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { stateAtom } from '../../recoilState/atom';
import { signUp, signIn } from './signFunction';

export default function Sign(){
    
    const [ signState, setSignState ] = useState({
        password:'',
        passwordErr:false,
        name:'',
        nameErr:false,
        email:'',
        emailErr:false,
        age:18,
        ageErr:false,
        account:'signin'
    })

    const [ recoilState, setRecoilState ] = useRecoilState(stateAtom)

    let navigate = useNavigate();

    const { Text } = Typography;

    useEffect( () => {

        if( JSON.parse(localStorage.getItem('localhost')) && !recoilState.user ){

            let myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + JSON.parse(localStorage.getItem('localhost')).token);

            let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch("https://api-nodejs-todolist.herokuapp.com/user/me", requestOptions)
            .then(response => response.text())
            .then(result => {
                //console.log(result);
                if( !JSON.parse(result).error ){ 
                    setRecoilState( prevState => ({ ...prevState, link:'/', user:JSON.parse(result) }) )
                    navigate("/", { replace: true })
                }
            })
            .catch(error => {
                navigate("/sign", { replace: true })
                console.error('error', error)
            });

        }

    },[] )


    return(
        <>
            <div css={css`
                opacity:0.7;
                width:100%;
                height:100%;
                position:absolute;
                background-image:url(https://media.istockphoto.com/vectors/set-of-contact-us-and-support-icons-vector-pattern-design-vector-id1183632265?k=20&m=1183632265&s=612x612&w=0&h=WrdRJWCQdgJbjFt9xaJ1ycGps16x2Xb7M1EwcfNFNcQ=);
                display: flex;
                align-items: center;`}
            >
            </div>
            <div 
                css={css`
                    position:absolute;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width:380px;
                    height:${signState.account==='signin'?'280px;':'390px;'}
                    border-radius:20px;
                    background:#353b48;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;`}
            >
                <Text css={css`color:#fff;font-size:20px;margin-bottom:25px`}>Sign in</Text>
                <div css={css`width:90%;margin-bottom:20px`}>
                    <Radio.Group 
                        value={ signState.account } 
                        onChange={ (event) => { setSignState( prevState => ({ ...prevState, account:event.target.value }) ) } }
                    >
                        <Radio.Button value="signin" >Sign in</Radio.Button>
                        <Radio.Button value="signup" >Sign up</Radio.Button>
                    </Radio.Group>
                </div>
                {
                    signState.account != 'signin'?
                    <>
                        <div css={ css`width:90%` }>
                            <InputNumber 
                                css={css`margin-bottom:20px`}
                                min={18}
                                value={signState.age}
                                onChange={ (event) => { setSignState( prevState => ({ ...prevState, age:event.target.value, ageErr:false }) ); } }
                                status={signState.ageErr?"error":"success"}
                            />
                            <Text css={css`color:#fff`}>{" Age"}</Text>
                        </div>
                        <Input 
                            placeholder="Name"
                            css={css`width:90%;margin-bottom:20px`}
                            value={signState.name}
                            onChange={ (event) => { setSignState( prevState => ({ ...prevState, name:event.target.value, nameErr:false }) ); } }
                            status={signState.nameErr?"error":"success"}
                        />
                    </>:false
                }
                <Input 
                    placeholder="Email"
                    css={css`width:90%;margin-bottom:20px`}
                    value={signState.email}
                    onChange={ (event) => { setSignState( prevState => ({ ...prevState, email:event.target.value, emailErr:false }) ); } }
                    status={signState.emailErr?"error":"success"}
                />
                <Input 
                    placeholder="Password"
                    css={css`width:90%;margin-bottom:20px`}
                    type="password"
                    value={signState.password}
                    onChange={ (event) => { setSignState( prevState => ({ ...prevState, password:event.target.value, passwordErr:false }) ); } }
                    status={signState.passwordErr?"error":"success"}
                />
                <Button 
                    css={css`width:90%`}
                    type='primary'
                    onClick={ () => { 
                        signState.account === 'signin'?
                        signIn( signState.email, signState.password, setSignState, setRecoilState, navigate, recoilState ):
                        signUp( signState.email, signState.name, signState.password, signState.age, setSignState, setRecoilState, navigate, recoilState );
                    }}
                >
                    Submit
                </Button>
            </div>
        </>
    )
}