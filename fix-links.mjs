import fs from 'fs';
import path from 'path';

const basePath = 'p:/Agency/Web design/Web Design Samples/Optics Store Web Project 1 Sample/Optical Store Website Design (Community)/src/app';

function fixLinkProps(dir) {
  fs.readdirSync(dir).forEach(file => {
    let filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fixLinkProps(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Replace to="/" with href="/"
      content = content.replace(/<Link([^>]*?)\bto=/g, '<Link$1href=');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
}

fixLinkProps(basePath);
