import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { stateAtom } from '../../../recoilState/atom.js';
import { Table, Typography } from 'antd';
import { css } from '@emotion/react';

export default function TodoSep(){
    
    const [ state, setState ] = useState({loading:true});

    const [ recoilState, setRecoilState ] = useRecoilState(stateAtom)

    const {Text} = Typography;

    useEffect( () => {
        if( recoilState.token && !state.task && recoilState.sepId ){
            let myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + recoilState.token);
            myHeaders.append("Content-Type", "application/json");

            let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            fetch(`https://api-nodejs-todolist.herokuapp.com/task/${recoilState.sepId}`, requestOptions)
            .then(response => response.text())
            .then(result => setState( prevState => ({
                loading:false,
                task:[{
                    key: 1,
                    total: 1,
                    description: JSON.parse(result).data.description,
                    completed: <Text css={css`color:${JSON.parse(result).data.completed?'#2ecc71':'#c0392b'}`}>{JSON.parse(result).data.completed.toString()}</Text>,
                    switch: '-',
                    id: JSON.parse(result).data._id,
                    createdAt: new Date(JSON.parse(result).data.createdAt).toLocaleString('en-gb')
                }]
            })))
            .catch(error => console.log('error', error));
        }
    }, [ recoilState.token ] )

    let colums = [
        { title:'Index', dataIndex:'total', key:'total' },
        { title:'Description', dataIndex:'description', key:'description' },
        { title:'Completed', dataIndex:'completed', key:'completed' },
        { title:'Switch', dataIndex:'switch', key:'switch' },
        { title:'Task id', dataIndex:'id', key:'id' },
        { title:'CreatedAt', dataIndex:'createdAt', key:'createdAt' },
      ];
    
    let dataSource = [
        {
        key: '1',
        total: '0',
        description: "you don't have any records",
        completed: '-',
        switch:'-',
        id:'-',
        createdAt:'-'
    }]

    return(
        <div css={css`width:calc(100% - 19.7vw);margin-left:19.7vw`}>
            <Table 
            dataSource={state.task?state.task:dataSource}
            columns={colums} 
            pagination={false}
            loading={state.loading} />
        </div>
    )
}