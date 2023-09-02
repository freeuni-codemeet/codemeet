import useVideoChat from "../../hooks/useVideoChat";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BsFillCameraVideoFill, BsFillCameraVideoOffFill, BsMicFill, BsMicMuteFill} from "react-icons/bs";
import UserVideoComponent from "./UserVideoComponent";

interface VideoChatProps {
    sessionId: string;
    username: string;
    secretToken: string | undefined;
}

const VideoChat = ({sessionId, username, secretToken}: VideoChatProps) => {
    const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

    const {
        mainStreamManager,
        publisher,
        subscribers,
        joinSession,
        leaveSession,
    } = useVideoChat();

    const navigateToMainPageHard = (e?: PopStateEvent) => {
        e?.preventDefault();
        leaveSession();
        window.location.href = window.location.origin;
    }

    useEffect(() => {
        window.addEventListener("popstate", (e) => navigateToMainPageHard(e))
        return window.removeEventListener("popstate", (e) => navigateToMainPageHard(e));
    }, [])

    useEffect(() => {
        joinSession(sessionId, username, secretToken);
    }, [username, secretToken, sessionId, joinSession]);

    const handleTurnOffVideo = () => {
        const enabled = !videoEnabled;
        publisher?.publishVideo(enabled);
        setVideoEnabled(enabled);
    };

    const handleTurnOffAudio = () => {
        const enabled = !audioEnabled;
        publisher?.publishAudio(enabled);
        setAudioEnabled(enabled);
    };

    const handleLeaveSessionClicked = () => {
        navigateToMainPageHard();
    };

    return (
        <>
            {/*TODO add skeletons*/}
            {mainStreamManager === undefined ? (
                <h1>loading...</h1>
            ) : (
                <div className={"flex flex-col max-h-screen px-2 gap-2"}>
                    <div className={"flex flex-row py-4 px-2 gap-3 items-center"}>
                        {videoEnabled ? (
                            <BsFillCameraVideoFill
                                onClick={handleTurnOffVideo}
                                className={
                                    "w-10 h-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer"
                                }
                            />
                        ) : (
                            <BsFillCameraVideoOffFill
                                onClick={handleTurnOffVideo}
                                className={
                                    "w-10 h-10 p-2 bg-red-700 hover:bg-red-800 rounded-full cursor-pointer"
                                }
                            />
                        )}

                        {audioEnabled ? (
                            <BsMicFill
                                onClick={handleTurnOffAudio}
                                className={
                                    "w-10 h-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer"
                                }
                            />
                        ) : (
                            <BsMicMuteFill
                                onClick={handleTurnOffAudio}
                                className={
                                    "w-10 h-10 p-2 bg-red-700 hover:bg-red-800 rounded-full cursor-pointer"
                                }
                            />
                        )}

                        <button
                            className={
                                "bg-red-700 hover:bg-red-800 px-3 py-2 text leading-5 rounded-xl font-semibold text-white"
                            }
                            onClick={handleLeaveSessionClicked}
                        >
                            Leave
                        </button>
                    </div>

                    <div
                        className={"flex flex-col max-h-full overflow-y-auto px-2 gap-2"}
                    >
                        {publisher !== undefined ? (
                            <div>
                                <UserVideoComponent streamManager={publisher}/>
                            </div>
                        ) : null}
                        {subscribers.map((sub, i) => (
                            <UserVideoComponent key={i} streamManager={sub}/>
                        ))}
                    </div>
                </div>
            )}
        </>
    )

}

export default VideoChat;