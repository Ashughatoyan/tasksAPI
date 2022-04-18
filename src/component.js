import React,{ useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";

export default function Title(props){

    let navigate = useNavigate();

    const [ stateFromAtom, setStateFromAtom ] = useRecoilState(props.atom)

    useEffect( () => {    
        
        navigate(stateFromAtom.link, { replace: true }) 
        if( stateFromAtom.link === '/sign' ){ setStateFromAtom( prevState => ({ ...prevState, user:false }) ) }

    },[ stateFromAtom.link ])

    return(
        <h1>this is {props.link} page</h1>
    )
}