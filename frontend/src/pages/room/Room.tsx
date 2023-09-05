import React from "react";
import {useLocation, useParams} from "react-router-dom";
import CodeEditor from "./CodeEditor";
import VideoChat from "./VideoChat";
import Modal from "../../components/Modal";
import UsernameInputModal from "./UsernameInputModal";
import Executor from "./Executor";
import ControlPanel from "./ControlPanel";


const Room = () => {
    const {state} = useLocation();
    const {sessionId} = useParams();

    const getAppropriateElement = (
        sessionId: string | undefined,
        username: string | undefined
    ) => {
        if (sessionId) {
            if (username && username !== "") {
                return (
                    <div className={"flex flex-col w-full h-screen px-2"}>
                        <div className={"px-5"}>
                            <ControlPanel sessionId={sessionId}
                                          username={username}
                                          secretToken={state?.secretToken}/>
                        </div>
                        <div className={"flex flex-row flex-1 gap-3 pb-2"}>
                            <div className={"w-[29%]"}>
                                <VideoChat/>
                            </div>
                            <div className={"w-[71%] flex flex-col gap-3"}>
                                <div className={"h-[71%] rounded-xl p-2 bg-slate-800"}>
                                    <CodeEditor sessionId={sessionId} username={username}/>
                                </div>
                                <div className={"flex flex-row h-[29%] bg-slate-800 rounded-xl px-4 py-2 gap-2"}>
                                    <Executor/>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <Modal open={true}>
                        <UsernameInputModal sessionId={sessionId}/>
                    </Modal>
                );
            }
        } else {
            return <></>;
        }
    };

    return (
        <div className={"flex flex-row"}>
            {getAppropriateElement(sessionId, state?.username)}
        </div>
    );
};

export default Room;
