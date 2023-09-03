import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import openviduApi from "../../api/openvidu";
import ModalCloseButton from "../../components/ModalCloseButton";
import Modal from "../../components/Modal";

const CreateRoomModal = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  const onCreate = async () => {
    if (username === "") {
      return;
    }
    const { sessionId, secretToken } = await openviduApi.createSession();
    navigate(`/room/${sessionId}`, {
      state: { username: username, secretToken: secretToken },
    });
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const closeModal = () => {
    navigate("/");
  };

  return (
    <Modal open={true}>
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow-lg bg-slate-800">
          <ModalCloseButton closeModal={closeModal} />
          <div className="px-6 py-6 lg:px-8">
            <p className="mb-4 text-3xl font-medium text-white">Create Room</p>
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
                />
              </div>
              <button
                onClick={onCreate}
                className="w-full text-white focus:ring-2 focus:outline-none font-medium rounded-lg text-xl px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
