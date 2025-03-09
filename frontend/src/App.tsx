import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';

function App() {
  const codeRef1 = useRef(null); // Ref for transcription code block

  // State for input field
  const [transcriptionInput, setTranscriptionInput] = useState('');


  // Result for transcriptiono
  const [transcriptionResult, setTranscriptionResult] = useState('');

  // Highlight code block on mount
  useEffect(() => {
    if (codeRef1.current) hljs.highlightElement(codeRef1.current);
  }, []);

  const handleTranscriptionRun = async () => {
    console.log(transcriptionInput)
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
      console.log(data)
    }
    catch (error: any){
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="max-w-[50rem] m-auto space-y-4 md:mt-[50px] mt-[30px] flex flex-col p-6 md:p-0 mb-[30px] md:mb-[40px]">
        {/* Header */}
        <h1 className="lg:text-[40px] text-4xl font-semibold sm:text-3xl text-gray-800 text-center">
          Bioinformatics Algorithms
        </h1>
        <p className="text-gray-600 text-base sm:text-sm text-center">
          Explore key algorithms in bioinformatics for gene expression with interactive examples.
        </p>

        {/* Transcription Section */}
        <div className="transcription w-full space-y-3 rounded-lg p-4">
          <h2 className="text-2xl font-medium sm:text-xl text-gray-700">
            DNA to mRNA Transcription
          </h2>
          <p className="text-[14px] text-gray-600 leading-relaxed">
            Transcription copies DNA into mRNA using RNA polymerase, replacing T with U (e.g., ATCG → AUCG).
          </p>
          <pre className="rounded-md text-sm">
            <code ref={codeRef1} className="language-python">
              {`def transcribe_dna(dna):\n    mrna_table = {"C":"G", "G":"C", "T":"A", "A":"U"}\n    mrna = "".join([mrna_table[nctide] for nctide in dna])`}
            </code>
          </pre>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={transcriptionInput}
              onChange={(e) => setTranscriptionInput(e.target.value)}
              placeholder="Enter DNA sequence (e.g., ATCG)"
              className="flex-1 p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleTranscriptionRun}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
            >
              Run
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;