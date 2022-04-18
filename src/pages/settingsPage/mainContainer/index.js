import React,{ useState } from 'react';
import { useRecoilState } from 'recoil';
import { Input, Button, Typography, Alert, InputNumber } from 'antd'
import { css } from '@emotion/react';
import { stateAtom } from '../../../recoilState/atom';
import { changeInfo, uploadeImage, deletImage, deletUser } from './changeFunctions.js';

export default function SettingsContaier(){
    
    const { Text } = Typography;

    const [ recoilState, setRecoilState ] = useRecoilState(stateAtom)

    const [ containerState, setContainerState ] = useState({ 
        name:'',
        nameErr:false,
        nameLoading:false,
        email:'',
        emailErr:false,
        emailLoading:false,
        password:'',
        passwordErr:false,
        passwordLoading:false,
        age:18,
        ageErr:false,
        ageLoading:false,
        img:'',
        imgErr:false,
        imgLoading:false,
        deletImgLoading:false,
        alert:{ show:false }
    })

    return(
        <div css={css`display:flex;width:calc(100% - 19.7vw);margin-left:19.7vw`}>
            <div css={css`margin-left:10vw;margin-top:5vw;`}>
                
                <Text css={css`font-family:sans-serif;margin-bottom:0,5vw`}>Change name</Text>
                <div css={css`display:flex;margin:0.5vw 0 2vw`}>
                    <Input 
                        value={containerState.name}
                        status={containerState.nameErr?"error":"success"}
                        onChange={ (event) => { 
                            setContainerState( prevState => ({ ...prevState, name:event.target.value, nameErr:false }) )
                        }}    
                    />
                    <Button 
                        type="primary"
                        loading={containerState.nameLoading}
                        onClick={ () => { 
                            setContainerState( prevState => ({ ...prevState, nameLoading:true }) )
                            changeInfo(
                                recoilState.token,
                                { name:containerState.name },
                                setContainerState,
                                setRecoilState,
                                'name'
                                )
                                }
                        }
                    >
                        change
                    </Button>
                </div>

                <Text css={css`font-family:sans-serif;margin-bottom:0,5vw`}>Change email</Text>
                <div css={css`display:flex;margin:0.5vw 0 2vw`}>
                    <Input 
                        value={containerState.email}
                        status={containerState.emailErr?"error":"success"}
                        onChange={ (event) => { 
                            setContainerState( prevState => ({ ...prevState, email:event.target.value, emailErr:false }) )
                    }}
                    />
                    <Button 
                        type="primary"
                        loading={containerState.emailLoading}
                        onClick={ () => { 
                            setContainerState( prevState => ({ ...prevState, emailLoading:true }) )
                            changeInfo( 
                                recoilState.token,
                                { email:containerState.email },
                                setContainerState ,
                                setRecoilState,
                                'email'
                            )}
                        }
                    >
                        change
                    </Button>
                </div>
                
                <Text css={css`font-family:sans-serif;margin-bottom:0,5vw`}>Change password</Text>
                <div css={css`display:flex;margin:0.5vw 0 2vw`}>
                    <Input 
                        value={containerState.password}
                        status={containerState.passwordErr?"error":"success"}
                        onChange={ (event) => { setContainerState( prevState => ({ ...prevState, password:event.target.value, passwordErr:false }) ) } }    
                    />
                    <Button 
                        type="primary"
                        loading={containerState.passwordLoading}
                        onClick={ () => {
                            setContainerState( prevState => ({ ...prevState, passwordLoading:true }) )
                            changeInfo(
                                recoilState.token,
                                { password:containerState.password },
                                setContainerState,
                                setRecoilState,
                                'password'
                            )}
                        }
                    >
                        change
                    </Button>
                </div>
                
                <Text css={css`font-family:sans-serif;margin-bottom:0,5vw`}>Change age</Text>
                <div css={css`display:flex;margin:0.5vw 0 2vw`}>
                    <InputNumber min={18} 
                        value={containerState.age} 
                        status={containerState.ageErr?"error":"success"}
                        onChange={ (event) => {
                            setContainerState( prevState => ({ ...prevState, age:event, ageErr:false }) ) 
                        }}
                    />
                    <Button 
                        type="primary"
                        loading={containerState.ageLoading}
                        onClick={ () => {
                            setContainerState( prevState => ({ ...prevState, ageLoading:true }) )
                            changeInfo(
                                recoilState.token,
                                { age:containerState.age },
                                setContainerState,
                                setRecoilState,
                                'age'
                            )}
                        }
                    >
                        change
                    </Button>
                </div>

                <Text css={css`font-family:sans-serif;margin-bottom:0,5vw`}>Change profile img</Text>
                <div css={css`display:flex;margin:0.5vw 0 2vw`}>
                    <Input 
                        type='file'
                        accept="image/png, image/gif, image/jpeg"
                        onChange={ (event) => { 
                            setContainerState( prevState => ({ ...prevState, img:event }) ) } }
                    />
                    <Button 
                        type="primary"
                        loading={containerState.changeImgLoading}
                        onClick={ () => {
                            setContainerState( prevState => ({ ...prevState, changeImgLoading:true }) )
                            uploadeImage(
                                recoilState.token,
                                containerState.img,
                                setContainerState,
                                setRecoilState
                            )
                        } }
                    >
                        change
                    </Button>
                </div>

                <div css={css`display:flex;margin:50px 0 2vw`}>
                    <Text>Delet profile picture</Text>
                    <Button 
                        type="primary"
                        loading={containerState.deletImgLoading}
                        css={css`margin-left:10px`}
                        onClick={ () => { 
                            setContainerState( prevState => ({ ...prevState, deletImgLoading:true }) )
                            deletImage( recoilState.token, recoilState.user, setContainerState, setRecoilState ) }
                        }
                    >
                        Submit
                    </Button>
                </div>

                <div css={css`display:flex;margin:50px 0 2vw`}>
                    <Text>Delet profile</Text>
                    <Button 
                        type="primary"
                        css={css`margin-left:10px`}
                        onClick={ () => { deletUser( recoilState.token, setContainerState, setRecoilState ) } }
                    >
                            Submit
                    </Button>
                </div>
                
            </div>
            <div css={css`margin-left:50%;position:fixed`}>
            { containerState.alert.show ? 
                    containerState.alert.status === 'info'?
                        <Alert message={ containerState.alert.message } type="info" showIcon />:
                        <Alert message={ containerState.alert.message } type="error" showIcon />:false}
            </div>
        </div>
    )
}