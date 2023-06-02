import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import openviduApi from "../../api/openvidu";

const MainPage = () => {
    const [username, setUsername] = useState<string>('');

    const navigate = useNavigate();

    const onCreate = async () => {
        const sessionId = await openviduApi.createSession();
        navigate(`/room/${sessionId}`, { state: { username: username } });
    }

    const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);

    return (
        <div>
            <div className="jumbotron vertical-center">
                <h1> Join a video session </h1>
                <div className="form-group">
                    <p>
                        <label>Participant: </label>
                        <input
                            className="form-control"
                            type="text"
                            id="userName"
                            value={username}
                            onChange={handleChangeUserName}
                            required
                        />
                    </p>
                    <p className="text-center">
                        <button className="btn btn-lg btn-success" onClick={onCreate}> CREATE </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MainPage;