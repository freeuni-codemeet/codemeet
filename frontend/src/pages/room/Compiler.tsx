import React, { useState } from "react";

interface CompilerProps {
  onCompile: (code: string) => void;
}

const Compiler: React.FC<CompilerProps> = ({ onCompile }) => {
  const [inputCode, setInputCode] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputCode(event.target.value);
  };

  const handleCompileClick = () => {
    onCompile(inputCode);
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
          placeholder="Compiled Output"
          readOnly={true}
          value={"value"}
        />
      </div>
      <button onClick={handleCompileClick}>Compile</button>
    </div>
  );
};

export default Compiler;
