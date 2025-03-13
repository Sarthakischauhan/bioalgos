export const ALGORITHM_CONTENT = {
    transcription: {
      title: "DNA to mRNA Transcription",
      description: "Process in which one DNA strand (template strand) is used to synthesize the complimentary RNA for it. (e.g., ATCG → AUCG).",
      codeSnippet: `def transcribe_dna(dna):\n    mrna_table = {"C":"G", "G":"C", "T":"A", "A":"U"}\n    mrna = "".join([mrna_table[nctide] for nctide in dna])`,
      placeholder: "Enter DNA sequence (e.g., ATCG)"
    },
    translation: {
      title: "mRNA to Amino Acid Translation",
      description: "Process by which ribosomes synthesize proteins using the mRNA sequence created during transcription.",
      codeSnippet: `def translate_mrna: mrna = request.data.get('mrna', '').upper()\nmrna = mrna.replace("\\n", "")\nif not all(base in 'AUCG' for base in mrna):\n    return Response({"error": "Invalid mRNA sequence"}, status=status.HTTP_400_BAD_REQUEST)\n\nprotein = []\nfor i in range(0, len(mrna), 3):\n    codon = mrna[i:i+3]\n    if codon in RNA_CODON_TABLE:\n        aa = RNA_CODON_TABLE[codon]\n        if aa == "Stop":\n            break\n        protein.append(aa)\nreturn Response({"protein": "-".join(protein)})`,
      placeholder: "Enter the mRNA sequence to be translated"
    }
  };