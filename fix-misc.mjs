import fs from 'fs';
import path from 'path';

const basePath = 'p:/Agency/Web design/Web Design Samples/Optics Store Web Project 1 Sample/Optical Store Website Design (Community)/src/app';

function fixMisc(dir) {
  fs.readdirSync(dir).forEach(file => {
    let filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fixMisc(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Ensure Link is imported if used
      if (content.includes('<Link ') || content.includes('<Link\n') || content.includes('<Link>')) {
         if (!content.includes('import Link from "next/link"')) {
            content = content.replace(/import {([^}]+)} from "lucide-react";/g, 'import { $1 } from "lucide-react";\nimport Link from "next/link";');
         }
      }

      // Replace navigate('/path') with navigate.push('/path')
      content = content.replace(/navigate\((['"`].*?['"`])\)/g, 'navigate.push($1)');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
}

fixMisc(basePath);
