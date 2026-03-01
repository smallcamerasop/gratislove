
from rtf_converter import rtf_to_txt
import sys

with open(sys.argv[1], 'r') as f:
    rtf_content = f.read()

text = rtf_to_txt(rtf_content)
print(text)
