export function changeInfo( token, value, setState, setRecoilState, change ){

  let flag = true;

  if( change === 'email'){
    if(!value.email.toLowerCase().match(/^\S+@\S+\.\S+$/) ){ 
      setState( prevState => ({ ...prevState, emailLoading:false, alert:{ status:'error', show:true, message:'Wrong! email' } }) )
      flag = false;
  }};

  if( change==='password' && value.password.length < 5 ){ 
      setState( prevState => ({ ...prevState, paswordLoading:false, alert:{ status:'error', show:true, message:'Wrong! password' } }) )
      flag = false;
    };
    
  if( change==='name' && value.name.length < 4 ){ 
    setState( prevState => ({ ...prevState, nameLoading:false, alert:{ status:'error', show:true, message:'Wrong! name' } }) )
    flag = false;
  };

  if( change==='age' && value.age < 18 ){
    setState( prevState => ({ ...prevState, ageLoading:false, alert:{ status:'error', show:true, message:'Wrong! age' } }) )
    flag = false;
  };

  if( flag ){

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    let raw = JSON.stringify(value);

    let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://api-nodejs-todolist.herokuapp.com/user/me", requestOptions)
    .then(response => response.text())
    .then(result => {
        //console.log(result)
        if( JSON.parse(result).success = true ){
          setState( prevState => ({ 
            ...prevState, 
            nameLoading:false,
            emailLoading:false,
            passwordLoading:false,
            ageLoading:false,
            alert:{ status:'info', show:true, message:`${change} was changed` 
          } }) )
          setRecoilState( prevState => ({ ...prevState, user:JSON.parse(result).data }) );
        }
    })
    .catch(error => {
      console.error('error', error)
      setState( prevState => ({ ...prevState,
        nameLoading:false,
        emailLoading:false,
        passwordLoading:false,
        ageLoading:false,
        alert:{ status:'error', show:true, message:error 
      } }) )
    });

  }

}



export function uploadeImage( token, event={target:{defaultValue:0}}, setState, setRecoilState ){

  if(event){



      let myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);

      var formdata = new FormData();
      formdata.append("avatar", event.target.files[0], "blog-header.jpg");

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://api-nodejs-todolist.herokuapp.com/user/me/avatar", requestOptions)
        .then(response => response.text())
        .then(result => {
          //console.log(result)
          setState( prevState => ({ ...prevState, imgLoading:false, alert:{ status:'info', show:true, message:`img was changed` } }) )
          setRecoilState( prevState => ({ ...prevState, user:{ ...prevState.user, img:JSON.parse(result) } }) );
        })
        .catch(error => {
          console.error('error', error)
          setState( prevState => ({ ...prevState, alert:{ status:'error', show:true, message:error } }) )
        });
        

  }

  else{
    setState( prevState => ({ ...prevState, imgLoading:false, imgErr:true, alert:{ status:'error', show:true, message:'Wrong! image' } }) )
  }

}

export function deletImage( token, user, setState, setRecoilState ){
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://api-nodejs-todolist.herokuapp.com/user/me/avatar", requestOptions)
    .then(response => response.text())
    .then(result => {
      //console.log(result)
      setState( prevState => ({ ...prevState, deletImgLoading:false, alert:{ status:'info', show:true, message:`img was deleted` } }) )
      setRecoilState( prevState => ({ ...prevState, userImg:false }) );
    })
    .catch(error => {
      console.error('error', error)
      setState( prevState => ({ ...prevState, deletImgLoading:false, imgErr:true, alert:{ status:'error', show:true, message:error } }) )
    });
  
}



export function deletUser( token, setState, setRecoilState ){

  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("https://api-nodejs-todolist.herokuapp.com/user/me", requestOptions)
    .then(response => response.text())
    .then(result => {
      //console.log(result)
      setState( prevState => ({ ...prevState, alert:{ status:'info', show:true, message:`account was deleted you will be redirected to sign page` } }) )
      setTimeout( () => {
        setRecoilState( prevState => ({ ...prevState, link:'/sign', user:false }) );
        localStorage.removeItem('localhost') } , 2000)
    })
    .catch(error => {
      console.error('error', error)
      setState( prevState => ({ ...prevState, imgErr:true, alert:{ status:'error', show:true, message:error } }) )
    });

}