import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import openviduApi from "../../api/openvidu";

const MainPage = () => {
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  const onCreate = async () => {
    const sessionId = await openviduApi.createSession();
    navigate(`/room/${sessionId}`, { state: { username: username } });
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  return (
    <div className={"flex h-screen justify-center items-center"}>
      <div
        className={
          "flex flex-col justify-center border border-sky-700 rounded-xl py-8 px-12 gap-10 shadow-2xl shadow-slate-950"
        }
      >
        <h1 className={"text-5xl"}> Create Room </h1>
        <div className={"flex flex-col content-center items-center"}>
          <div className={"flex flex-col gap-4 w-full"}>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="block px-2.5 pb-2.5 pt-4 w-full text-lg text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-700 focus:outline-none focus:ring-0 focus:border-sky-700 peer"
                placeholder=" "
                value={username}
                onChange={handleChangeUserName}
                required
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-sky-700 peer-focus:dark:text-sky-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                Nickname
              </label>
            </div>
            <button
              className="bg-sky-500 hover:bg-sky-700 px-5 py-3 text-lg leading-5 rounded-full font-semibold text-white"
              onClick={onCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
