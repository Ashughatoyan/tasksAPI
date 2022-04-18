import React,{ useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import SettingsContaier from "./mainContainer/index"
import { stateAtom } from '../../recoilState/atom'
import tokenSignIn from '../loginwithToken.js';

export default function SettingsPage(){

    let navigate = useNavigate();

    const [ recoilState, setRecoilState ] = useRecoilState(stateAtom)

    useEffect( () => {

        setRecoilState( prevState => ({ ...prevState, link:'/settings', pointer:86 }) )

        if( !recoilState.user && !JSON.parse(localStorage.getItem('localhost')) ){
            navigate("/sign", { replace: true })
        }
        else if( !recoilState.user && JSON.parse(localStorage.getItem('localhost')) ){

            tokenSignIn( navigate, setRecoilState, '/settings' )

        }

    },[] )

    useEffect( () => {    
        
        if( recoilState.link ){
            if( recoilState.link !== '/settings' )navigate(recoilState.link, { replace: true }) 
        }

    },[ recoilState.link ])

    return(
        <SettingsContaier/>
    )
}