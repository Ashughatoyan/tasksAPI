import React,{ useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Avatar, Image, Typography, Input, Button } from 'antd';
import { BarsOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { styles } from './style.js';
import MenuButton from './button/index.js';
import './style.scss';
import { useRecoilState } from 'recoil';
import { stateAtom } from '../../recoilState/atom';
import Icon, { SearchOutlined } from '@ant-design/icons';

const convertBlobToBase64 = async (blob) => {
    return await blobToBase64(blob);
  }
  
  const blobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });



export default function Sidebar(props){
    
    const { Text } = Typography;

    const [ sidebarState, setSidebarState ] = useState({value:'', valueErr:false});

    const [ recoilState, setRecoilState ] = useRecoilState(stateAtom)

    if( recoilState.user ){

        if( !recoilState.userImg ){
            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            fetch(`https://api-nodejs-todolist.herokuapp.com/user/${recoilState.user._id}/avatar`, requestOptions)
            .then(response => response.text())
            .then(async result => {
                let obj =new File([result], "image.png", {type:"image/png"});
                obj = await convertBlobToBase64(obj);
                //console.log(obj)
                //console.log(Buffer.from(result).toString('base64'))
                setRecoilState( prevState => ({ ...prevState, userImg:true, userImgObj:{ img:obj } }) )
            })
            .catch(error => {
                setRecoilState( prevState => ({ ...prevState, userImg:false }) )
            });
        }

        return(
            <div 
                css={ css(styles.mainDiv) }
            >

                <div css={ css(styles.userCard) }>
                    <Avatar 
                        size={60}
                        shape="square"
                        src={
                        <Image 
                            src={
                                recoilState.userImg === true?
                                recoilState.userImgObj.img:
                                'https://www.artofwei.com/wp-content/uploads/2015/03/portrait_girl_sketch_tint2.jpg'}
                            
                            shape="square" 
                            preview={false}/>}
                    />
                    
                    <div css={css(styles.userNameDiv)}>
                        <Text css={css(styles.userName)}>
                            {recoilState.user.name}
                        </Text>
                        <Text 
                            css={css(styles.nickName)}
                        >
                            {recoilState.user.age} years old
                        </Text>
                    </div>

                </div>

                <div css={css`display:flex`}>

                    <div css={css`width:27%;margin-top:4.54vw;display:flex;justify-content: flex-end;`}>
                        <span css={css`
                            width:10px;
                            height:10px;
                            border-radius:50%;
                            background-color:#000;
                            margin-right:10px;
                            margin-top:${ recoilState.pointer }px;
                            transition: margin 300ms;`}>
                        </span>
                    </div>

                    <div css={css`margin-top:4.54vw`}>
                        <Input.Group compact>
                            <Input 
                                style={{ width:'calc(60% - 45px)' }}
                                status={sidebarState.valueErr?"error":"success"}
                                onChange={ (event) => { setSidebarState({ value:event.target.value, valueErr:false }) } }
                            />
                            <Button 
                                type="primary"
                                loading={false}
                                style={{ width:'45px' }}
                                onClick={ () => { 
                                    if( sidebarState.value.length > 5 ){
                                    setRecoilState( prevState => ({ 
                                        ...prevState,
                                        link:'/todo',
                                        pointer:10,
                                        sepId:sidebarState.value
                                    }) ) }else{ setSidebarState( prevState => ({ ...prevState, valueErr:true }) ) }
                                } }
                            >
                                <SearchOutlined />
                            </Button>
                        </Input.Group>
                        <MenuButton 
                            icon={<BarsOutlined css={css`margin-right:10px`} />}
                            text="Todo lilst"
                            link="/"
                            setGlobState={setRecoilState}
                            setState={ setRecoilState }
                        />
                        <MenuButton
                            icon={<SettingOutlined
                            css={css`margin-right:10px`} />}
                            text="Settings"
                            link="/settings"
                            setGlobState={setRecoilState}
                            setState={ setRecoilState }
                        />
                        <MenuButton 
                            icon={<LogoutOutlined
                            css={css`margin-right:10px`} />}
                            text="Log out"
                            link="/sign"
                            setGlobState={setRecoilState}
                        />
                    </div>

                </div>

            </div>
        )}
}