export default function tokenSignIn( token, navigate, setRecoilState ){

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://api-nodejs-todolist.herokuapp.com/user/logout", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result);
        setRecoilState( prevState => ({ ...prevState, user:{ ...result.user, token:result.token } }) )
    })
    .catch(error => {
        console.log('error', error);
        navigate('/sign')
    });

}