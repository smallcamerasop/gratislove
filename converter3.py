from striprtf.striprtf import rtf_to_text
import sys

with open(sys.argv[1], 'r') as f:
    text = rtf_to_text(f.read())

print(text)
