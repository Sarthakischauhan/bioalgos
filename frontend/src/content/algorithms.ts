export const ALGORITHM_CONTENT = {
    transcription: {
      title: "DNA to mRNA Transcription",
      description: "Process in which one DNA strand (template strand) is used to synthesize the complimentary RNA for it. (e.g., ATCG → AUCG).",
      codeSnippet: 
`def transcribe_dna(dna):
    mrna_table = {
        "C": "G",
        "G": "C",
        "T": "A",
        "A": "U"
    }
    mrna = "".join([mrna_table[nctide] for nctide in dna])
    return mrna`,
      placeholder: "Enter DNA sequence (e.g., ATCG)"
    },
    translation: {
      title: "mRNA to Amino Acid Translation",
      description: "Process by which ribosomes synthesize proteins using the mRNA sequence created during transcription.",
      codeSnippet: 
`def translate_mrna(mrna):
    mrna = mrna.replace("\\n", "")
    
    if not all(base in 'AUCG' for base in mrna):
        return "Incorrect sequence"
    
    protein = []
    for i in range(0, len(mrna), 3):
        codon = mrna[i:i+3]
        if codon in RNA_CODON_TABLE:
            aa = RNA_CODON_TABLE[codon]
            if aa == "Stop":
                break
            protein.append(aa)
    
    return "-".join(protein)`,
      placeholder: "Enter the mRNA sequence to be translated"
    },
    needlemanWunsch:{
      title:"Global sequence alignment",
      description: "Sequence alignment using dynamic programming", 
      codeSnippet:
`
# Sequences
# Penalties 
match = 1
mismatch = -1
gap = -2
indel = -1

def nWAlign(s1,s2):
    mat = []

    m = len(s1)
    n = len(s2)

# initialising the matrix with all 0's
    for i in range(m+1):
        cols = []
        for j in range(n+1):
           cols.append(0)
        mat.append(cols)

# Populate the matrix with correct penalities for padding
    for i in range(m+1):
        mat[i][0] = -1 * i

    for j in range(n+1):
        mat[0][j] = -1 * j

# Matrix filling based on penalties
## We start from the 1,1 point as the 0,0 point is 0
    for i in range(1, m+1):
        for j in range(1, n+1):
            # Check if nucleotide matches 
            top = mat[i-1][j]
            left = mat[i][j-1]
            dgnl = mat[i-1][j-1]
            if s1[i-1] == s2[j-1]:
                mat[i][j] = max(top + indel, left + indel, dgnl + match)
            else:
                mat[i][j] = max(top + indel, left + indel, dgnl + mismatch)
      
    r, c = m, n
    new_s1 = ""
    new_s2 = "" 

    while (r > 0 or c > 0):

        # check for two sequence if match proceed in the same direction
        if s1[r-1] == s2[c-1]:
            new_s1 += s1[r-1]
            new_s2 += s2[c-1]
            r -= 1
            c -= 1

        else:
            top = mat[r-1][c]
            left = mat[r][c-1]
            dgnl = mat[r-1][c-1]

            values = [dgnl, top, left]
            
            if max(values) == dgnl:
                new_s1 += s1[r-1]
                new_s2 += s2[c-1]
                r -= 1
                c -= 1
            
            elif max(values) == top:
                new_s1 += s1[r-1]
                new_s2 += "-"
                r -= 1 
            
            elif max(values) == left:
                new_s1 += "-"
                new_s2 += s2[c-1]
                c -= 1

    new_s1 = new_s1[::-1]
    new_s2 = new_s2[::-1]

    return {"aligned_sequence_1":new_s1, "aligned_sequence_2":new_s2}


def calculate_score(s1,s2):
    score = 0
    match_string = ""
    for i in range(len(s1)):
        if s1[i] == s2[i]:
            match_string += "|"
            score += 1
        elif s1[i] != s2[i]:
            if (s1[i] == "-" or s2[i] == "-"):
                match_string += " "
            else:
                match_string += "*"
            score -= 1
    return score, match_string
`,
    placehodler: "Enter upto 6 bases of CDS",
    }
  };