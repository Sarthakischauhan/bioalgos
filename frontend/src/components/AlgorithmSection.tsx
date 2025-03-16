interface AlgorithmSectionProps {
  title: string;
  description: string;
  codeRef: React.RefObject<HTMLElement>;
  codeSnippet: string;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRun: () => void;
  placeholder: string;
  result: any;
  inputLabel?: string;
}

import ResponseBox from "./ResponseBox";

const AlgorithmSection = ({
  title,
  description,
  codeRef,
  codeSnippet,
  inputValue,
  onInputChange,
  onRun,
  placeholder,
  result,
  inputLabel
}: AlgorithmSectionProps) => {
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
        </pre>
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