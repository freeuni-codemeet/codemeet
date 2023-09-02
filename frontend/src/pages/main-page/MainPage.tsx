import React, {useState} from "react";
import {BsCodeSlash} from "react-icons/bs";
import GetStartedModalContent from "./GetStartedModalContent";
import Modal from "../../components/Modal";
import CreateRoomModalContent from "./CreateRoomModalContent";

const MainPage = () => {
    const [getStartedModalOpen, setGetStartedModalOpen] = useState<boolean>(false);
    const [createRoomModalOpen, setCreateRoomModalOpen] = useState<boolean>(false);

    return (
        <>
            <nav className="absolute w-full flex flex-row justify-between items-center px-8 py-5">
                <div className={"flex flex-row gap-2 items-center"}>
                    <BsCodeSlash
                        className={
                            "w-12 h-12 p-2 font-bold rounded-full bg-sky-950 shadow-2xl"
                        }
                    />
                    <p className={"text-4xl font-bold"}>Codemeet</p>
                </div>
                <a href={"https://github.com/freeuni-codemeet/codemeet"}>
                    <svg
                        className="w-8 h-8 opacity-60 hover:opacity-100"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </nav>
            <div
                className={
                    "flex h-screen justify-center items-center bg-gradient-to-t from-slate-800 to-slate-900"
                }
            >
                <div className={"w-full md:w-2/3 flex flex-col justify-center items-center gap-10"}>
                    <p className={"text-6xl text-center"}>
                        Connect, Collaborate, Code <br/> with <span className={"text-sky-500 font-bold"}>Codemeet</span>
                    </p>
                    <div className={"flex flex-row gap-5"}>
                        <button
                            className="bg-sky-500 hover:bg-sky-700 px-6 py-4 text-2xl leading-5 rounded-full font-semibold text-white"
                            onClick={() => setGetStartedModalOpen(true)}
                        >
                            Get Started
                        </button>
                        <button
                            className="border border-sky-700 hover:bg-slate-900 px-6 py-4 text-2xl leading-5 rounded-full font-semibold text-white"
                            onClick={() => setCreateRoomModalOpen(true)}
                        >
                            Try Without Registration
                        </button>
                    </div>
                </div>
                {
                    getStartedModalOpen ? <Modal open={getStartedModalOpen}>
                        <GetStartedModalContent closeModal={() => setGetStartedModalOpen(false)}/>
                    </Modal> : <></>
                }
                {
                    createRoomModalOpen ? <Modal open={createRoomModalOpen}>
                        <CreateRoomModalContent closeModal={() => setCreateRoomModalOpen(false)}/>
                    </Modal> : <></>
                }
            </div>
        </>
    );
};

export default MainPage;
