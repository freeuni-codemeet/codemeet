import React, {useCallback, useContext, useEffect, useState} from "react";
import codeExecutorApi from "../../api/codeExecutor";
import languageMap from "../../../languages.json";
import {ExecuteContext} from "../../context/RoomContext";
import {BsFillCameraVideoFill, BsFillCameraVideoOffFill, BsMicFill, BsMicMuteFill} from "react-icons/bs";
import useVideoChat from "../../hooks/useVideoChat";
import { FaPlay, FaRegCopy } from "react-icons/fa";

interface ControlPanelProps {
    sessionId: string;
    username: string;
    secretToken: string | undefined;
}

const ControlPanel = ({sessionId, username, secretToken}: ControlPanelProps) => {
    const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
    const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

    const {
        publisher,
        joinSession,
        leaveSession,
    } = useVideoChat();

    const navigateToMainPageHard = () => {
        window.location.href = window.location.origin;
    };

    const onBrowserBack = useCallback(
        (e: PopStateEvent) => {
            e.preventDefault();
            leaveSession();
            navigateToMainPageHard();
        },
        [leaveSession]
    );

    useEffect(() => {
        window.addEventListener("popstate", (e) => onBrowserBack(e));
        return window.removeEventListener("popstate", (e) => onBrowserBack(e));
    }, [onBrowserBack]);

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
        leaveSession();
        navigateToMainPageHard();
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
    };

    const {
        stdin,
        rustpad,
        selectedLanguage,
        isLoading,
        setStdout,
        setOutputColor,
        setSelectedLanguage,
        setIsLoading,
    } = useContext(ExecuteContext);


    const executeCode = async () => {
        try {
            const encoded_code = window.btoa(rustpad?.current?.lastValue || "");
            const encoded_stdin = window.btoa(stdin);
            setIsLoading(true);
            const response = await codeExecutorApi.executeCode(languageMap.languages[selectedLanguage], encoded_code, encoded_stdin); // TODO
            const id = response.status.id;
            let responseData;
            switch (id) {
                case 3:
                    responseData = response.stdout;
                    break;
                case 6:
                    responseData = response.compile_output;
                    break;
                default:
                    responseData = response.stderr;
            }
            setOutputColor((id !== 3) ? "text-red-700" : "text-white");
            const decodedStdout = window.atob(responseData);
            setStdout(decodedStdout);
            console.log("Compilation result:", response);
        } catch (error) {
            console.error("Error compiling:", error);
        }finally {
            setIsLoading(false);
        }
    };

    const languageOptions = Object.keys(languageMap.languages).map((language) => (
        <option key={language} value={language}>
            {language}
        </option>
    ));

    return (
        <div className={"flex flex-row justify-between items-center"}>
            <div className={"flex flex-row py-2 gap-3 items-center"}>
            <FaRegCopy
                      className={"w-9 h-9 p-2 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer"}
                        onClick={() => {navigator.clipboard.writeText(window.location.href)}}
                      >
                    </FaRegCopy>
                {videoEnabled ? (
                    <BsFillCameraVideoFill
                        onClick={handleTurnOffVideo}
                        className={
                            "w-9 h-9 p-2 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer"
                        }
                    />
                ) : (
                    <BsFillCameraVideoOffFill
                        onClick={handleTurnOffVideo}
                        className={
                            "w-9 h-9 p-2 bg-red-700 hover:bg-red-800 rounded-full cursor-pointer"
                        }
                    />
                )}

                {audioEnabled ? (
                    <BsMicFill
                        onClick={handleTurnOffAudio}
                        className={
                            "w-9 h-9 p-2 bg-gray-800 hover:bg-gray-700 rounded-full cursor-pointer"
                        }
                    />
                ) : (
                    <BsMicMuteFill
                        onClick={handleTurnOffAudio}
                        className={
                            "w-9 h-9 p-2 bg-red-700 hover:bg-red-800 rounded-full cursor-pointer"
                        }
                    />
                )}

                <button
                    className={
                        "flex bg-red-700 hover:bg-red-800 px-3 py-2 text-sm leading-5 rounded-xl font-semibold text-white h-8 items-center"
                    }
                    onClick={handleLeaveSessionClicked}
                >
                    Leave
                </button>
            </div>
            <div className="flex justify-end items-center gap-2">
                <div className="flex flex-row gap-2 items-center">
                    <label htmlFor="languageSelect" className="font-semibold">Language:</label>
                    <select
                        id="languageSelect"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        className="bg-sky-700 hover:bg-sky-800 px-3 py-2 text-sm leading-5 rounded-xl font-semibold text-white h-9"
                    >
                        {languageOptions}
                    </select>
                </div>
                <div>
                    <button
                        onClick={executeCode}
                        disabled={isLoading}
                        className="flex flex-row bg-sky-700 hover:bg-sky-800 px-3 py-2 text-sm leading-5 rounded-xl font-semibold text-white h-9 items-center justify-center gap-2 disabled:bg-gray-500"
                    >
                        <FaPlay/>
                        <p>Run</p>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ControlPanel;