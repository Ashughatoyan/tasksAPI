import React,{ useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import TodoListContainer from "./mainContainer/index";
import { stateAtom } from '../../recoilState/atom.js'
import tokenSignIn from '../loginwithToken.js';

export default function TodoListPage(){

    let navigate = useNavigate();

    const [ recoilState, setRecoilState ] = useRecoilState(stateAtom)

    useEffect( () => {

        setRecoilState( prevState => ({ ...prevState, link:'/', pointer:46 }) )

        if( !recoilState.user && !JSON.parse(localStorage.getItem('localhost')) ){
            navigate("/sign", { replace: true })
        }
        else if( !recoilState.user && JSON.parse(localStorage.getItem('localhost')) ){

            tokenSignIn( navigate, setRecoilState, '/' );
        }

    },[] )

    useEffect( () => {    
        
        if( recoilState.link ){
            if( recoilState.link !== '/' )navigate(recoilState.link, { replace: true }) 
        }

    },[ recoilState.link ])

    return(
        <>
            <TodoListContainer/>
        </>
    )
}