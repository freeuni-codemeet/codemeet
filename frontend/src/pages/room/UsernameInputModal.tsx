import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

interface UsernameInputModalProps {
    sessionId: string;
}

const UsernameInputModal = ({sessionId}: UsernameInputModalProps) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");

    const onJoin = async () => {
        if (username === "") {
            return;
        }
        navigate(`/room/${sessionId}`, {
            state: {username: username, secretToken: undefined},
            replace: true
        });
    };

    const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.target.value);

    return (
        <div className="relative w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow-lg bg-slate-800">
                <div className="px-6 py-6 lg:px-8">
                    <p className="mb-4 text-3xl font-medium text-white">Join Room</p>
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-2 text-lg font-medium text-white"
                            >
                                Your username
                            </label>
                            <input
                                type="email"
                                name="username"
                                id="username"
                                className="text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-slate-700 border-slate-700 placeholder-gray-400 text-white"
                                placeholder="example123"
                                value={username}
                                onChange={handleChangeUserName}
                                required
                                pattern="[A-Za-z0-9]{1,20}"
                            />
                        </div>
                        <button
                            onClick={onJoin}
                            className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-xl px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700"
                        >
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsernameInputModal;