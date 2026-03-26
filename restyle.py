import os
import re

dir_path = r'c:\Users\rjcan\Desktop\website\new\MustacheMedia\src'

replacements = {
    r'bg-\[\#060010\]': 'bg-[var(--bg-primary)]',
    r'bg-\[rgb\(26,28,30\)\]': 'bg-[var(--bg-secondary)]',
    r'bg-\[rgb\(17,17,19\)\]': 'bg-[var(--bg-primary)]',
    r'bg-\[rgba\(218,255,1,0\.1\)\]': 'bg-[var(--accent-bg)]',
    r'bg-\[rgba\(26,28,30,0\.8\)\]': 'bg-[var(--bg-secondary)]',
    r'text-\[rgb\(218,255,1\)\]': 'text-[var(--accent-primary)]',
    r'text-\[rgb\(230,230,230\)\]': 'text-[var(--text-secondary)]',
    r'text-\[rgb\(180,180,190\)\]': 'text-[var(--text-muted)]',
    r'\btext-white\b': 'text-[var(--text-primary)]',
    r'border-\[rgb\(218,255,1\)\]': 'border-[var(--accent-primary)]',
    r'faceColor="\#060010"': 'faceColor="var(--bg-primary)"',
    r'borderStyle="1px solid rgba\(255,255,255,0\.05\)"': 'borderStyle="1px solid var(--border-subtle)"',
    r'borderStyle="1px solid rgba\(218,255,1,0\.2\)"': 'borderStyle="1px solid var(--accent-primary)"',
    r'rippleColor="rgba\(218,255,1,0\.5\)"': 'rippleColor="var(--accent-primary)"',
    r'rippleColor="rgba\(218,255,1,0\.3\)"': 'rippleColor="var(--accent-primary)"',
    r'"#1a1c1e"': '"var(--bg-secondary)"',
    r'"#060010"': '"var(--bg-primary)"',
    r'"rgba\(218,255,1,0\.1\)"': '"var(--accent-bg)"',
    r'"#daff01"': '"var(--accent-primary)"',
    r'#daff01': 'var(--accent-primary)',
    r'rgba\(255,255,255,0\.1\)': 'var(--border-subtle)'
}

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    for old_regex, new_val in replacements.items():
        new_content = re.sub(old_regex, new_val, new_content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file_path)}")

for root, _, files in os.walk(dir_path):
    for filename in files:
        if filename.endswith(('.jsx', '.js', '.tsx', '.css')):
            if filename == 'App.css': continue
            process_file(os.path.join(root, filename))
