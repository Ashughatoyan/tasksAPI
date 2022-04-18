import { ControlOutlined } from "@ant-design/icons";

export default function tokenSignIn( navigate, setRecoilState, link ){

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + JSON.parse(localStorage.getItem('localhost')).token);

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://api-nodejs-todolist.herokuapp.com/user/me", requestOptions)
    .then(response => response.text())
    .then(result => {
        //console.log(result);
        if( JSON.parse(result).error ){ navigate("/sign", { replace: true }) }
        else{
            setRecoilState( prevState => ({ 
                ...prevState, link:link,
                user:JSON.parse(result),
                token:JSON.parse(localStorage.getItem('localhost')).token 
            }) )
        }
    })
    .catch(error => {
        navigate("/sign", { replace: true })
        console.error('error', error)
    });

}