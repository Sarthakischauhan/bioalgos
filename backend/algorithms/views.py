from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Transcription Algorithm
@api_view(['POST'])
def transcribe_dna(request):
    dna = request.data.get('dna', '').upper()
    dna.replace("\n","")
    if not all(ncltide in "ATCG" for ncltide in dna):
        return Response({"message":"Bad request: Can only have ATCG nucleotide"}, status=400)

    mrna_table = {"C":"G", "G":"C", "T":"A", "A":"U"}
    mrna = "".join([mrna_table[nctide] for nctide in dna])

    return Response({"mrna":mrna}, status=200)

# Translation Algorithm
@api_view(['POST'])
def translate_mrna(request):
    mrna = request.data.get('mrna', '').upper()
    if not all(base in 'AUCG' for base in mrna) or len(mrna) % 3 != 0:
        return Response({"error": "Invalid mRNA sequence"}, status=status.HTTP_400_BAD_REQUEST)
    
    codon_table = {
        "AUG": "Met", "UUU": "Phe", "UUC": "Phe", "UUA": "Leu", "UUG": "Leu",
        "UAA": "Stop", "UAG": "Stop", "UGA": "Stop" 
    }
    protein = []
    for i in range(0, len(mrna), 3):
        codon = mrna[i:i+3]
        if codon in codon_table:
            aa = codon_table[codon]
            if aa == "Stop":
                break
            protein.append(aa)
    return Response({"protein": "-".join(protein)})

# GC Content Algorithm
@api_view(['POST'])
def gc_content(request):
    dna = request.data.get('dna', '').upper()
    if not all(base in 'ATCG' for base in dna):
        return Response({"error": "Invalid DNA sequence"}, status=status.HTTP_400_BAD_REQUEST)
    gc_count = dna.count('G') + dna.count('C')
    gc_percentage = (gc_count / len(dna)) * 100 if dna else 0
    return Response({"gc_percentage": gc_percentage})