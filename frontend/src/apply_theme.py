import os
import re

directories = [
    r"c:\Users\leeza\OneDrive\Desktop\Kaapde\my project\frontend\src\components\landing",
    r"c:\Users\leeza\OneDrive\Desktop\Kaapde\my project\frontend\src"
]

files_to_process = []
for root, _, files in os.walk(directories[0]):
    for f in files:
        if f.endswith(".jsx"):
            files_to_process.append(os.path.join(root, f))

files_to_process.append(os.path.join(directories[1], "App.jsx"))

replacements = [
    # Backgrounds
    (r"bg-black", "bg-coffee-cream"),
    (r"bg-\[\#050505\]", "bg-coffee-cream"),
    (r"bg-\[\#0a0a0a\]", "bg-coffee-cream"),
    (r"bg-gray-900", "bg-white/80"),
    (r"bg-white/5", "bg-white/40"),
    (r"bg-white/10", "bg-white/60"),
    (r"bg-white/20", "bg-white/80"),
    (r"bg-black/50", "bg-white/50"),
    (r"bg-black/40", "bg-white/40"),
    (r"bg-black/60", "bg-white/60"),
    # Text
    (r"text-white", "text-coffee-dark"),
    (r"text-gray-200", "text-coffee-dark"),
    (r"text-gray-300", "text-coffee-mid"),
    (r"text-gray-400", "text-coffee-mid"),
    (r"text-gray-500", "text-coffee-mid/80"),
    # Borders
    (r"border-white/10", "border-coffee-dark/10"),
    (r"border-white/5", "border-coffee-dark/5"),
    (r"border-white/20", "border-coffee-dark/20"),
    # Colors
    (r"purple-600", "coffee-dark"),
    (r"purple-500", "coffee-mid"),
    (r"purple-400", "coffee-mid"),
    (r"purple-900", "coffee-dark"),
    (r"blue-600", "coffee-dark"),
    (r"blue-500", "coffee-mid"),
    (r"blue-400", "coffee-mid"),
    (r"pink-600", "coffee-dark"),
    (r"pink-500", "coffee-mid"),
    (r"pink-400", "coffee-mid"),
    (r"emerald-400", "coffee-mid"),
    (r"teal-500", "coffee-dark"),
    (r"cyan-400", "coffee-light"),
    (r"orange-400", "coffee-mid"),
    (r"red-500", "coffee-dark"),
    # Specifics
    (r"text-transparent bg-clip-text bg-gradient-to-r from-coffee-mid to-coffee-light", "text-coffee-mid"),
    (r"text-transparent bg-clip-text bg-gradient-to-r from-coffee-mid to-coffee-mid", "text-coffee-mid"),
    (r"text-transparent bg-clip-text bg-gradient-to-r from-coffee-light to-coffee-mid", "text-coffee-mid"),
    (r"bg-gradient-to-r from-coffee-dark to-coffee-dark", "bg-coffee-dark"),
    (r"bg-gradient-to-br from-coffee-mid to-coffee-mid", "bg-coffee-mid"),
    (r"bg-gradient-to-br from-coffee-dark to-coffee-light", "bg-coffee-mid"),
    (r"bg-gradient-to-t from-black/80", "bg-gradient-to-t from-coffee-cream/80"),
    (r"bg-\[radial-gradient\(ellipse_at_center,_var\(--tw-gradient-stops\)\)\] from-coffee-dark/10 via-black to-black", "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-coffee-light/20 via-coffee-cream to-coffee-cream"),
    (r"from-coffee-dark/20 via-black to-black", "from-coffee-light/20 via-coffee-cream to-coffee-cream"),
    (r"shadow-\[0_0_30px_rgba\(255,255,255,0.05\)\]", "shadow-xl"),
    (r"shadow-\[0_0_30px_rgba\(147,51,234,0.3\)\]", "shadow-xl"),
    (r"shadow-\[0_0_40px_rgba\(147,51,234,0.5\)\]", "shadow-2xl"),
    (r"shadow-\[0_20px_60px_-15px_rgba\(0,0,0,0.7\)\]", "shadow-2xl")
]

for file_path in set(files_to_process):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for pattern, replacement in replacements:
            new_content = re.sub(pattern, replacement, new_content)
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Processed {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print("Done")
