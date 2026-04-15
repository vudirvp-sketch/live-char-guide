#!/usr/bin/env python3
"""
CI Script: Validate anchors declared in structure.json exist in HTML files.

Exit codes:
  0 - All anchors valid
  1 - Missing anchors found
"""
import json
import re
import sys
from pathlib import Path

def main():
    repo_root = Path(__file__).parent.parent
    structure_path = repo_root / "src" / "manifest" / "structure.json"
    parts_dir = repo_root / "src" / "parts"
    
    with open(structure_path, encoding='utf-8') as f:
        structure = json.load(f)
    
    errors = []
    
    for part in structure.get("parts", []):
        if "anchors" not in part:
            continue
        
        file_path = parts_dir / part["file"]
        if not file_path.exists():
            errors.append(f"File not found: {part['file']}")
            continue
        
        content = file_path.read_text(encoding='utf-8')
        
        for anchor in part["anchors"]:
            anchor_id = anchor.lstrip("#")
            pattern = rf'id=["\']?{re.escape(anchor_id)}["\']?'
            if not re.search(pattern, content, re.IGNORECASE):
                errors.append(f"Anchor '{anchor}' not found in {part['file']}")
    
    if errors:
        print("❌ Anchor validation failed:")
        for error in errors:
            print(f"  - {error}")
        sys.exit(1)
    else:
        print("✅ All anchors validated")
        sys.exit(0)

if __name__ == "__main__":
    main()
