import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import ResponseBox from './components/ResponseBox';
import AlgorithmSection from './components/AlgorithmSection';
import { ALGORITHM_CONTENT } from './content/algorithms'; 

function App() {
  const codeRef1 = useRef(null);
  const codeRef2 = useRef(null);
  // State for input field
  const [transcriptionInput, setTranscriptionInput] = useState('');
  const [translationInput, setTranslationInput] = useState('');

  // Result for transcriptiono
  const [transcriptionResult, setTranscriptionResult] = useState(null);
  const [translationResult, setTranslationResult] = useState(null);

  // Highlight code block on mount
  useEffect(() => {
    if (codeRef1.current) hljs.highlightElement(codeRef1.current);
    if (codeRef2.current) hljs.highlightElement(codeRef2.current);
  }, []);

  const handleTranscriptionRun = async () => {
    try{
      const response = await fetch("http://127.0.0.1:8000/api/transcribe/", {
        method: "POST", 
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"dna":transcriptionInput})
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json()
      setTranscriptionResult(data)
    }
    catch (error: any){
      console.error(error.message);
    }
  };


  const handleTranslationRun = async () => {
    try{
      const response = await fetch("http://127.0.0.1:8000/api/translate/", {
        method: "POST", 
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"mrna":translationInput})
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json()
      setTranslationResult(data);
    }
    catch (error: any){
      console.error(error.message);
    } 
  }

  return (
    <div className="max-w-[50rem] m-auto space-y-4 md:mt-[50px] mt-[30px] flex flex-col p-6 md:p-0 mb-[30px] md:mb-[40px]">
      <h1 className="lg:text-[40px] text-4xl font-semibold sm:text-3xl text-gray-800 text-center">
        Bioinformatics Algorithms
      </h1>
      <p className="text-gray-600 text-base sm:text-sm text-center">
        Explore key algorithms in bioinformatics for gene expression with interactive examples.
      </p>
      
      <AlgorithmSection
        {...ALGORITHM_CONTENT.transcription}
        codeRef={codeRef1}
        inputValue={transcriptionInput}
        onInputChange={(e) => setTranscriptionInput(e.target.value)}
        onRun={handleTranscriptionRun}
        result={transcriptionResult}
      />

      <AlgorithmSection
        {...ALGORITHM_CONTENT.translation}
        codeRef={codeRef2}
        inputValue={translationInput}
        onInputChange={(e) => setTranslationInput(e.target.value)}
        onRun={handleTranslationRun}
        result={translationResult}
      />
    </div>
  );
}

export default App;