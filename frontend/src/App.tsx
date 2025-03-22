import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import AlgorithmSection from './components/AlgorithmSection';
import { ALGORITHM_CONTENT } from './content/algorithms'; 

function App() {
  const codeRef1 = useRef(null);
  const codeRef2 = useRef(null); 
  const codeRef3 = useRef(null);
  // State for input field
  const [transcriptionInput, setTranscriptionInput] = useState('');
  const [translationInput, setTranslationInput] = useState('');
  const [seqeunceAlignmentInput, setSequenceAlignment] = useState({
    sequence1 : '',
    sequence2 : '', 
  });
  // Result for transcriptiono
  const [transcriptionResult, setTranscriptionResult] = useState(null);
  const [translationResult, setTranslationResult] = useState(null);
  const [nwAlignmentResult, setNwAlignmentResult] = useState(null);




  const updateSequence = (data:any) => {
    const { name, value } = data
    if (["sequence1", "sequence2"].includes(name)){
      setSequenceAlignment(prevState => ({
        ...prevState,
        [name]: value
      }));
    }else{
      console.log("Check the data you are updating seems wrong!",{name:value})
    }
  }

  // Highlight code block on mount
  useEffect(() => {
    if (codeRef1.current) hljs.highlightElement(codeRef1.current);
    if (codeRef2.current) hljs.highlightElement(codeRef2.current);
    if (codeRef3.current) hljs.highlightElement(codeRef3.current);
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

  const handleNeedlemenRun = async () =>{
    const body = {"sequence1":seqeunceAlignmentInput.sequence1, "sequence2":seqeunceAlignmentInput.sequence2}
    try{
      const response = await fetch("http://127.0.0.1:8000/api/needlemen-align/", {
        method: "POST", 
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json()
      setNwAlignmentResult(data);
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
        inputMode='single'
        inputValue={transcriptionInput}
        onInputChange={(e) => setTranscriptionInput(e.target.value)}
        onRun={handleTranscriptionRun}
        result={transcriptionResult}
      />

      <AlgorithmSection
        {...ALGORITHM_CONTENT.translation}
        codeRef={codeRef2}
        inputMode="single"
        inputValue={translationInput}
        onInputChange={(e) => setTranslationInput(e.target.value)}
        onRun={handleTranslationRun}
        result={translationResult}
      />
      <AlgorithmSection
        {...ALGORITHM_CONTENT.needlemanWunsch}
        codeRef={codeRef3}
        inputMode='multiple'
        multipleInput={seqeunceAlignmentInput}
        onMultipleInputChange ={updateSequence}
        onRun={handleNeedlemenRun}
        result={nwAlignmentResult}
      />
    </div>
  );
}

export default App;