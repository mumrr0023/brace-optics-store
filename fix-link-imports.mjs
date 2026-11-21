import fs from 'fs';
import path from 'path';

const basePath = 'p:/Agency/Web design/Web Design Samples/Optics Store Web Project 1 Sample/Optical Store Website Design (Community)/src/app';

function fixLinkImports(dir) {
  fs.readdirSync(dir).forEach(file => {
    let filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fixLinkImports(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      if (content.includes('<Link') && !content.includes('next/link')) {
        if (content.includes('"use client";')) {
          content = content.replace('"use client";\n', '"use client";\nimport Link from "next/link";\n');
        } else {
          content = 'import Link from "next/link";\n' + content;
        }
      }

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
}

fixLinkImports(basePath);
