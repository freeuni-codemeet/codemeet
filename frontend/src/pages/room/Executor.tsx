import React, { useState } from "react";

interface ExecutorProps {
  onExecute: (code: string) => void;
}

const Executor: React.FC<ExecutorProps> = ({ onExecute }) => {
  const [inputCode, setInputCode] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCode(event.target.value);
  };

  const handleExecuteClick = () => {
    onExecute(inputCode);
  };

  return (
    <div className={"flex flex-col ml-auto h-[40vh] overflow-hidden"}>
      <div className={"h-full"}>
        <textarea
          className={`w-1/2 bg-slate-900 text-white`}
          style={{ width: "50%" }}
          rows={10}
          cols={50}
          value={inputCode}
          onChange={handleInputChange}
          placeholder=""
        />
        <textarea
          className={`w-1/2 bg-slate-900 text-white`}
          style={{ width: "50%" }}
          rows={10}
          cols={50}
          placeholder="Output"
          readOnly={true}
          value={"value"}
        />
      </div>
    </div>
  );
};

export default Executor;
