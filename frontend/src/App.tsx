import { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import ResponseBox from './components/ResponseBox';

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
      setTranscriptionResult(data)
    }
    catch (error: any){
      console.error(error.message);
    }
  };


  const handleTranslationRun = async () => {
    console.log(translationInput)
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
              Process in which one DNA strand (template strand) is used to synthesize the complimentary RNA for it. (e.g., ATCG → AUCG).
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
        
        {transcriptionResult ?
          <ResponseBox response={transcriptionResult as ResponseType} boxTitle={`Response for transcription of ${transcriptionInput.toUpperCase()} is`} />
          :
          <></>
        }
        {/* Translation Section */}
        <div className="translation w-full space-y-3 rounded-lg p-4">
          <h2 className="text-2xl font-medium sm:text-xl text-gray-700">
           mRNA to Amino Acid Translation
          </h2>
          <p className="text-[14px] text-gray-600 leading-relaxed">
              Process by which ribosomes synthesize proteins using the mRNA sequence created duing transcription.
          </p>
          <pre className="rounded-md text-sm">
            <code ref={codeRef2} className="language-python">
              {`def translate_mrna: mrna = request.data.get('mrna', '').upper()\nmrna = mrna.replace("\\n", "")\nif not all(base in 'AUCG' for base in mrna):\n    return Response({"error": "Invalid mRNA sequence"}, status=status.HTTP_400_BAD_REQUEST)\n\nprotein = []\nfor i in range(0, len(mrna), 3):\n    codon = mrna[i:i+3]\n    if codon in RNA_CODON_TABLE:\n        aa = RNA_CODON_TABLE[codon]\n        if aa == "Stop":\n            break\n        protein.append(aa)\nreturn Response({"protein": "-".join(protein)})`}
            </code>
          </pre>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={translationInput}
              onChange={(e) => setTranslationInput(e.target.value)}
              placeholder="Enter the mRNA sequence to be translated"
              className="flex-1 p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleTranslationRun}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
            >
              Run 
            </button>
          </div>
        </div>

        {translationResult?
          <ResponseBox response={translationResult as ResponseType} boxTitle={`Result for Translation of ${translationInput.toUpperCase()} is`} />
          :
          <></>
        }
      </div>
      
    </>
  );
}

export default App;