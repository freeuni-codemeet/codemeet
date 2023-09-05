import React, {useContext} from "react";
import {ExecuteContext} from "../../context/RoomContext";
import Spinner from "../../components/Spinner";


const Executor = () => {
    const {
        stdin,
        stdout,
        setStdin,
        outputColor,
        isLoading,
    } = useContext(ExecuteContext);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setStdin(event.target.value);
    };


    return (
        <>
            <div className={"flex flex-col w-1/2"}>
                <p className={"ml-1 font-semibold"}>Input</p>
                <textarea
                    className={`mt-0 w-full flex-1 bg-slate-800 resize-none text-white border border-sky-900 outline-none px-2 rounded-lg`}
                    value={stdin}
                    onChange={handleInputChange}
                    placeholder="Write your input here..."
                />
            </div>
            <div className={"flex flex-col w-1/2"}>
                <p className={"ml-1 font-semibold"}>Output</p>
                <div className={"flex w-full flex-1 border border-sky-900 rounded-lg items-center justify-center"}>
                    {!isLoading ?
                        <textarea
                            className={`w-full flex-1 bg-slate-800 resize-none ${outputColor} focus:outline-none px-2 rounded-lg`}
                            placeholder=""
                            readOnly={true}
                            value={stdout}
                        />
                        :
                        <Spinner/>
                    }
                </div>

            </div>
        </>
    );
};

export default Executor;
