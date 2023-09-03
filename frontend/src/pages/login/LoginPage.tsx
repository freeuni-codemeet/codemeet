import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import openviduApi from "../../api/openvidu";
import axios from "axios";




const LoginPage = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [incorrectUser, setIncorrectUser] = useState<boolean>(false);

    const navigate = useNavigate();

    const onCreate = async () => {
           try {
            const response = await axios.get("/core-api/users/getUser", {
                params: { usernameOrEmail: usernameOrEmail }
            });

            if (response.data === null) {
                setIncorrectUser(true);
            } else {
                console.log("User found:", response.data);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    const responseGoogle = (response) => {
    if (response.tokenId){
      fetch('http://localhost:80/auth?token='+ response.tokenId,{
        credentials: 'include',
        // To cause browsers to send a request with credentials included on both same-origin and cross-origin calls,
        // add credentials: 'include' to the init object you pass to the fetch() method.
       })
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        alert(myJson)
      });
    }
}

const temp = () =>{
  fetch('http://localhost:80',{
    credentials:'include'
  })
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    alert(myJson)
  });
}


    const handleChangeUserNameOrEmail = (e: React.ChangeEvent<HTMLInputElement>) => setUsernameOrEmail(e.target.value);
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    return (
        <div>
            <div className="jumbotron vertical-center">
                <h1> Login </h1>
                <div className="form-group">
                    <p>
                        <label>Username/Email: </label>
                        <input
                            className="form-control"
                            type="text"
                            id="userName"
                            value={usernameOrEmail}
                            onChange={handleChangeUserNameOrEmail}
                            required
                        />
                    </p>
                    <p>
                        <label>Password: </label>
                        <input
                            className="form-control"
                            type="password"
                            id="userName"
                            value={password}
                            onChange={handleChangePassword}
                            required
                        />
                    </p>
                    <p className="text-center">
                        <button className="btn btn-lg btn-success" onClick={onCreate}> CREATE </button>
                    </p>
                    {incorrectUser && <h4> User not found </h4>}
                </div>
            </div>
        </div>
    );
}

export default LoginPage;