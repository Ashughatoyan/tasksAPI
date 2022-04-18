import React,{ useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Typography, Button } from 'antd';
import { css } from '@emotion/react';
import { stateAtom } from '../../../recoilState/atom.js';
import axios from 'axios';

export function useFetch({ limit, skip }) {
  
  const [ recoilState, setRecoilState ] = useRecoilState(stateAtom)

  const { Text } = Typography;
  
  function deletTask( id ){
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + recoilState.token);
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => setRecoilState( prevState => ({
        ...prevState,
        todoEnd: prevState.todoList.count - 1,
        count: prevState.todoList.count - 1,
        todoList:{ ...prevState.todoList, list:prevState.todoList.list.filter( (item, index) => {
            if( item.id != id){
              return { ...item }
            }
          }).map( (item,index) => ({ ...item, key:index+1, index:index+1, total:index+1  }) ) }
      }) ))
      .catch(error => console.log('error', error));
  }

  function updateTaskById( id ){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + recoilState.token);
    myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
      "completed": true
    });
  
    let requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch(`https://api-nodejs-todolist.herokuapp.com/task/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        setRecoilState( prevState => ({
          ...prevState,
          todoList:{ ...prevState.todoList, 
            list:prevState.todoList.list.map( item => {
              if( item.id === id){
                return { 
                  ...item, 
                  completed:<Text css={css`color:#2ecc71`}>true</Text>,
                  switch:<Button css={css`color:#c0392b;border-color:#c0392b`}>Delet</Button>
                }
              }
              else{
                return item
              }
            }) }
        }) )
      })
      .catch(error => console.log('error', error));
  
  }

  function getList(quantity, from ){

    if( !recoilState.todoList || recoilState.todoList.todoEnd === recoilState.todoList.count ){
      
      let myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + recoilState.token);
      myHeaders.append("Content-Type", "application/json");

      let response = axios.get(`https://api-nodejs-todolist.herokuapp.com/task?limit=${quantity}&skip=${from}`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + recoilState.token,
          "Content-Type": "application/json"
        },
        redirect: 'follow',
      })
      .then( imp => {
        set(imp, quantity)
      })
    }
  }
  
  function set(imp, quantity){
    if( imp.data ){
      setRecoilState( prevState => ({ ...prevState,
        todoList:{
          todoEnd:(prevState.todoList?prevState.todoList.todoEnd:0)+quantity,
          count:(prevState.todoList?prevState.todoList.count:0)+imp.data.count,
          list:[
            ...prevState.todoList?prevState.todoList.list:[],
            ...imp.data.data.map( (item,index) => ({
              key: (prevState.todoList?prevState.todoList.count:0) + index+1,
              total: (prevState.todoList?prevState.todoList.count:0) + index+1,
              description: item.description,
              completed: <Text css={css`color:${item.completed?'#2ecc71':'#c0392b'}`}>{item.completed.toString()}</Text>,
              switch:<> 
                {item.completed?false:
                  <Button 
                    css={css`color:#2ecc71;border-color:#2ecc71`}
                    onClick={ () => { 
                      updateTaskById( item._id ) 
                    }}
                  >
                    Complet
                  </Button>
                }
                <Button 
                  css={css`color:#c0392b;border-color:#c0392b`}
                  onClick={ () => { 
                    deletTask( item._id ) 
                  }}
                >
                  Delet
                </Button>
              </>,
              id:item._id,
              createdAt: new Date(item.createdAt).toLocaleString('en-gb')
            }))
          ]}
        }))
      };
    }

    useEffect( () => {
      
      if( recoilState.token && !recoilState.todoList){ 
        getList( limit, skip );
      }
    },[ recoilState.token ])

    return function( switc_h, newLimit, newSkip  ){
      switc_h?
      setRecoilState( prevState => ({ ...prevState, todoList:{ ...prevState.todoList, todoEnd:prevState.todoList.count } }) ):
      getList( newLimit, newSkip);
    }

  }
