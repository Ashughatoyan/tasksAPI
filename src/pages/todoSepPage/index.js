import React,{ useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import TodoSep from "./mainContainer/index";
import { stateAtom } from '../../recoilState/atom'
import tokenSignIn from '../loginwithToken.js';

export default function TodoSepPage(){

    let navigate = useNavigate();

    const [ recoilState, setRecoilState ] = useRecoilState(stateAtom)

    useEffect( () => {

        setRecoilState( prevState => ({ ...prevState, link:'/todo', pointer:10 }) )

        if( !recoilState.user && !JSON.parse(localStorage.getItem('localhost')) ){
            navigate("/sign", { replace: true })
        }
        else if( !recoilState.user && JSON.parse(localStorage.getItem('localhost')) ){

            tokenSignIn( navigate, setRecoilState, '/todo' )

        }

    },[] )

    useEffect( () => {    
        
        if( recoilState.link ){
            if( recoilState.link !== '/todo' )navigate(recoilState.link, { replace: true }) 
        }

    },[ recoilState.link ])

    return(
        <TodoSep/>
    )
}