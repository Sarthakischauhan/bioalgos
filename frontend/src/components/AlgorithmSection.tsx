interface AlgorithmSectionProps {
  title: string;
  description: string;
  inputMode : "single" | "multiple";
  codeRef: React.RefObject<HTMLElement>;
  codeSnippet: string;
  onRun: () => void;
  placeholder: string;
  result: any;
  inputLabel?: string;
}

type ConditionalAlgorithmSectionProps = 
| {
  inputValue? : string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  multipleInput: never;
  onMultipleInputChange: never;
}
| {
  multipleInput : {sequence1:string, sequence2:string};
  onMultipleInputChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue? : never 
  onInputChange: never; 
};

type finalAlgorithmSectionProps = AlgorithmSectionProps & ConditionalAlgorithmSectionProps;

import ResponseBox from "./ResponseBox";
const AlgorithmSection = ({
  title,
  description,
  codeRef,
  codeSnippet,
  inputMode,
  inputValue,
  onInputChange,
  multipleInput, 
  onMultipleInputChange,
  onRun,
  placeholder,
  result,
  inputLabel
}: finalAlgorithmSectionProps) => {
  return (
    <>
      <div className="w-full space-y-3 rounded-lg p-4">
        <h2 className="text-2xl font-medium sm:text-xl text-gray-700">
          {title}
        </h2>
        <p className="text-[14px] text-gray-600 leading-relaxed">
          {description}
        </p>
        <pre className="rounded-md text-sm">
          <code ref={codeRef} className="language-python">
            {codeSnippet}
          </code>
        </pre >
        {inputMode == "single" && 
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={onInputChange}
              placeholder={placeholder}
              className="flex-1 p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={onRun}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
            >
              Run
            </button>
          </div>
        }
        {inputMode == "multiple" && 
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={multipleInput?.sequence1}
              onChange={(e) => onMultipleInputChange({name:"sequence1", value:e.target.value})}
              placeholder={"Enter Sequence 1"}
              className="flex-1 p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
              type="text"
              value={multipleInput?.sequence2}
              onChange={(e) => onMultipleInputChange({name:"sequence2", value:e.target.value})}
              placeholder={"Enter Sequence 2"}
              className="flex-1 p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={onRun}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
            >
              Run
            </button>
          </div>
        }
      </div>
      {result && (
        <ResponseBox 
          response={result} 
          boxTitle={`Result for ${title} is`} 
        />
      )}
    </>
  );
};

export default AlgorithmSection; 