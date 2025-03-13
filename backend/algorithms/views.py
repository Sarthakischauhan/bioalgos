from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from bioapp.constants import MRNA_TABLE, RNA_CODON_TABLE

# Transcription Algorithm
@api_view(['POST'])
def transcribe_dna(request):
    dna = request.data.get('dna', '').upper()
    dna = dna.replace("\n","")
    if not all(ncltide in "ATCG" for ncltide in dna):
        return Response({"error":"Bad request: Can only have ATCG nucleotide"}, status=status.HTTP_400_BAD_REQUEST)
    
    mrna = "".join([MRNA_TABLE[nctide] for nctide in dna])

    return Response({"response":mrna}, status=200)

# Translation Algorithm
@api_view(['POST'])
def translate_mrna(request):
    mrna = request.data.get('mrna', '').upper()
    mrna = mrna.replace("\n", "")
    if not all(base in 'AUCG' for base in mrna):
        return Response({"error": "Invalid mRNA sequence"}, status=status.HTTP_400_BAD_REQUEST)
    
    protein = []
    for i in range(0, len(mrna), 3):
        codon = mrna[i:i+3]
        if codon in RNA_CODON_TABLE:
            aa = RNA_CODON_TABLE[codon]
            if aa == "Stop":
                break
            protein.append(aa)
    return Response({"response": "-".join(protein)})

# GC Content Algorithm
@api_view(['POST'])
def gc_content(request):
    dna = request.data.get('dna', '').upper()
    if not all(base in 'ATCG' for base in dna):
        return Response({"error": "Invalid DNA sequence"}, status=status.HTTP_400_BAD_REQUEST)
    gc_count = dna.count('G') + dna.count('C')
    gc_percentage = (gc_count / len(dna)) * 100 if dna else 0
    return Response({"gc_percentage": gc_percentage})
