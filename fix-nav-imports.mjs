import fs from 'fs';
import path from 'path';

const basePath = 'p:/Agency/Web design/Web Design Samples/Optics Store Web Project 1 Sample/Optical Store Website Design (Community)/src/app';

function ensureImports(dir) {
  fs.readdirSync(dir).forEach(file => {
    let filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      ensureImports(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      let needed = [];
      if (content.includes('usePathname(') && !content.includes('usePathname')) needed.push('usePathname');
      // Actually checking includes('usePathname') matches both usePathname() and the import. 
      // Better: if it has usePathname() but not import { ... usePathname ... }
      if (content.match(/\busePathname\(\)/) && !content.match(/import\s+\{.*usePathname.*\}\s+from/)) needed.push('usePathname');
      if (content.match(/\buseRouter\(\)/) && !content.match(/import\s+\{.*useRouter.*\}\s+from/)) needed.push('useRouter');
      if (content.match(/\buseParams\(\)/) && !content.match(/import\s+\{.*useParams.*\}\s+from/)) needed.push('useParams');

      if (needed.length > 0) {
        content = `import { ${needed.join(', ')} } from "next/navigation";\n` + content;
      }

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
}

ensureImports(basePath);
