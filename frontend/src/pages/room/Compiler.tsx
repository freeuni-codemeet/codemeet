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
    <div>
      <div>
        <textarea
          rows={10}
          cols={50}
          value={inputCode}
          onChange={handleInputChange}
          placeholder="Enter your code here..."
        />
      </div>
      <div>
        <textarea
          rows={10}
          cols={50}
          placeholder="Compiled Output"
          readOnly={true}
          value={/* Set the value from the Axios response */}
        />
      </div>
      <button onClick={handleCompileClick}>Compile</button>
    </div>
  );
};

export default Compiler;
