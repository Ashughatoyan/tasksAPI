import React from 'react';
import { css } from '@emotion/react';

export default function MenuButton(props){

    return(
        <button css={css`
            background:none;
            border:none;font-size: 17px;line-height: 1.4vw;cursor:pointer;transition:0.1s;&:hover{color:#808080}
            height:40px;width:85%;text-align:left`}
            onClick={ () => { 
                if( props.link != '/sign' ){
                    props.setGlobState( prevState => ({ ...prevState, link:props.link }) )
                }
                else{
                    props.setGlobState( prevState => ({ link:props.link, user:false, pointer:10 }) )
                    localStorage.removeItem('localhost')
                }
            }}
            >
            {props.icon}
            {props.text}
        </button>
    )
}