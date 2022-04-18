import React,{ useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { css } from '@emotion/react';
import { Table, Typography, Input, Button } from 'antd';
import { stateAtom } from '../../../recoilState/atom.js';
import { useFetch } from './hooks.js';
import axios from 'axios';

function addTask( content = '', token, setState, loadMore, count ){
  
  setState( prevState => ({ ...prevState, inputLoading:true }) )
  if( content.length > 3 && content.length < 30 ){
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    myHeaders.append("Content-Type", "application/json");

    fetch("https://api-nodejs-todolist.herokuapp.com/task",  {
      method:'POST',
      headers:myHeaders,
      body:JSON.stringify({
        "description": content
      }),
      redirect: 'follow'
    })
    .then(response => response.text())
    .then(result => {
      loadMore( true );
      setState( prevState => ({ ...prevState, alert:{status:true,message:'Youre task successfuly added'}, inputLoading:false }) )
    })
    .catch(error => console.log('error', error));
  }
  else{ setState( prevState => ({ ...prevState, alert:{status:false,message:'Task length must contain 3-30 letters'}, inputLoading:false }) )}

}

export default function TodoListContainer(props){
  
  
  const [ state, setState ] = useState({ list:[], count:0, updateList:true, alert:{}, inputLoading:false })
  
  const [ recoilState, setRecoilState ] = useRecoilState(stateAtom)
  
  let loadMore = useFetch({ limit:12, skip:0 })

  useEffect(() => {

    if( recoilState.token && !state.event ){
      window.onscroll = function(){ 
        if(window.scrollY + window.innerHeight === document.body.scrollHeight){
          loadMore( false, 5, recoilState.todoList.todoEnd )
          console.log('from inside', recoilState.todoList)
        }
      }
      setState( prevState => ({ ...prevState, event:false }) )
    }

  }, [ recoilState.todoList ]);

  const {Text}=Typography;
  
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
    }
  ];

//console.log(recoilState)

  return(
    <div css={css`width:calc(100% - 19.7vw);margin-left:19.7vw;heigth:100%;`}>
      
      <Input css={css`width:50%`} 
      onChange={ (event) => {
        setState( prevState => ({ ...prevState, addTaskInput:event.target.value }) )
      } }/>
      
      <Button 
          type="primary"
          loading={state.inputLoading}
          onClick={ () => { addTask( state.addTaskInput, recoilState.token, setState, loadMore, recoilState.todoList.count ) } } 
      >
          submit
      </Button>
      
      <Text css={css`color:${state.alert.status?'#2ecc71':'#c0392b'}`}>
        { state.alert?state.alert.message:false }
      </Text>
      
      {
        <Table 
          dataSource={recoilState.todoList?recoilState.todoList.list:dataSource}
          columns={colums} 
          pagination={false}
          loading={recoilState.user?!recoilState.todoList : true}
        />
      }
      
    </div>
  )
}