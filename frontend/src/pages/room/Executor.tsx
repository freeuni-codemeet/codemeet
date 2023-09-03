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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" , height:"30%"}}>
      <div style={{ display: "flex", gap: "16px" }}>
        <textarea
          style={{ width: "50%" }}
          rows={10}
          cols={50}
          value={inputCode}
          onChange={handleInputChange}
          placeholder="Enter your code here..."
        />
        <textarea
          style={{ width: "50%" }}
          rows={10}
          cols={50}
          placeholder="Output"
          readOnly={true}
          value={"value"}
        />
      </div>
      <button onClick={handleExecuteClick}>Execute</button>
    </div>
  );
};

export default Executor;
