export function signIn( email, password, setState, setRecoilState, navigate, recoilState ){

    let flag = true;

    if( !email.toLowerCase().match(/^\S+@\S+\.\S+$/) ){ 
        setState( prevState => ({ ...prevState, emailErr:true }) )
        flag = false;
    };

    if( password < 5 ){ 
        setState( prevState => ({ ...prevState, passwordErr:true }) )
        flag = false;
    };

    if( flag ){

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        let raw = JSON.stringify({
        "email": email,
        "password": password
        });
        
        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        
        fetch("https://api-nodejs-todolist.herokuapp.com/user/login", requestOptions)
        .then(response => response.text())
        .then(result => { 
            console.log(result);
            localStorage.setItem('localhost', JSON.stringify( { email:JSON.parse(result).user.email, token:JSON.parse(result).token } ) );
            setRecoilState( prevState => ({ ...prevState, link:'/', user:JSON.parse(result).user, token:JSON.parse(result).token }) )
            navigate('/', { replace: true })
        })
        .catch(error => { console.log('error', error); alert( error ) } );

    }

}

export function signUp( email, name, password, age, setState, setRecoilState, navigate, recoilState ){
    
    let flag = true;

    if( !email.toLowerCase().match(/^\S+@\S+\.\S+$/) ){ 
        setState( prevState => ({ ...prevState, emailErr:true }) )
        flag = false;
    };

    if( name.length < 4 ){ 
        setState( prevState => ({ ...prevState, nameErr:true }) )
        flag = false;
    };

    if( password.length < 5 ){ 
        setState( prevState => ({ ...prevState, passwordErr:true }) )
        flag = false;
    };

    if( age < 18 ){
        setState( prevState => ({ ...prevState, ageErr:true }) )
        flag = false;
    };

    if( flag ){
        
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
        "age": age
        });

        let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://api-nodejs-todolist.herokuapp.com/user/register", requestOptions)
        .then(response => response.text())
        .then(result => { 
            //console.log(result);
            localStorage.setItem('localhost', JSON.stringify( { email:JSON.parse(result).user.email, token:JSON.parse(result).token } ) );
            setRecoilState( prevState => ({ ...prevState, link:'/', user:JSON.parse(result).user, token:JSON.parse(result).token }) )
            navigate('/', { replace: true })
        })
        .catch(error => { console.error('error', error); alert( error ) } );
    }

}