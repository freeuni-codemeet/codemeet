import React, { useState } from "react";
import { useContext } from "react";
import { ExecuteContext } from "../../context/RoomContext";



const Executor: React.FC<ExecuteContext> = () => {
  const {
    stdin,
    stdout,
    setStdin,
  } = useContext(ExecuteContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStdin(event.target.value);
  };


  return (
    <div className={"flex flex-col ml-auto h-[40vh] overflow-hidden"}>
      <div className={"h-full"}>
        <textarea
          className={`w-1/2 bg-slate-900 text-white`}
          style={{ width: "50%" }}
          rows={10}
          cols={50}
          value={stdin}
          onChange={handleInputChange}
          placeholder=""
        />
        <textarea
          className={`w-1/2 bg-slate-900 text-white`}
          style={{ width: "50%" }}
          rows={10}
          cols={50}
          placeholder=""
          readOnly={true}
          value={stdout}
        />
      </div>
    </div>
  );
};

export default Executor;
