import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import openviduApi from "../../api/openvidu";
import axios from "axios";


const MainPage = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
    const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    const onCreate = async () => {
        if(password == repeatedPassword){
            try {
                const response = axios.post("/core-api/users/add", {
                username: username,
                email: email,
                password: password
            });

                } catch (error) {
            console.error("Error creating user:", error);
        }
            const sessionId = await openviduApi.createSession();
            navigate(`/room/${sessionId}`, { state: { username: username } });
        }else{
            setIncorrectPassword(true);
        }
    }

     const getMaskedPassword = (input: string) => {
        return input.replace(/./g, "*");
    };

    const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleChangeRepeatedPassword = (e: React.ChangeEvent<HTMLInputElement>) => setRepeatedPassword(e.target.value);

    return (
        <div>
            <div className="jumbotron vertical-center">
                <h1> Register </h1>
                <div className="form-group">
                    <p>
                        <label>Username: </label>
                        <input
                            className="form-control"
                            type="text"
                            id="userName"
                            value={username}
                            onChange={handleChangeUserName}
                            required
                        />
                    </p>
                    <p>
                        <label>Email: </label>
                        <input
                            className="form-control"
                            type="text"
                            id="userName"
                            value={email}
                            onChange={handleChangeEmail}
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
                    <p>
                        <label>Repeat Password: </label>
                        <input
                            className="form-control"
                            type="password"
                            id="userName"
                            value={repeatedPassword}
                            onChange={handleChangeRepeatedPassword}
                            required
                        />
                    </p>
                    <p className="text-center">
                        <button className="btn btn-lg btn-success" onClick={onCreate}> CREATE </button>
                    </p>
                    {incorrectPassword && <h4> Passwords do not match</h4>}
                </div>
            </div>
        </div>
    );
}

export default MainPage;