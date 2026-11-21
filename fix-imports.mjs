import fs from 'fs';
import path from 'path';

const basePath = 'p:/Agency/Web design/Web Design Samples/Optics Store Web Project 1 Sample/Optical Store Website Design (Community)/src/app';

function fixImports(dir, depth) {
  fs.readdirSync(dir).forEach(file => {
    let filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fixImports(filePath, depth + 1);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      if (depth === 0) { // e.g., page.tsx (formerly Home.tsx)
        content = content.replace(/\.\.\/components/g, './components');
        content = content.replace(/\.\.\/data/g, './data');
        content = content.replace(/\.\.\/context/g, './context');
      } else if (depth === 1) { // e.g., shop/page.tsx
        // depth is unchanged from pages/Shop.tsx, so ../components is correct.
      } else if (depth === 2) { // e.g., product/[id]/page.tsx
        // original was pages/ProductDetail.tsx (depth 1 relative to app)
        // now it is product/[id]/page.tsx (depth 2)
        content = content.replace(/\.\.\/components/g, '../../components');
        content = content.replace(/\.\.\/data/g, '../../data');
        content = content.replace(/\.\.\/context/g, '../../context');
      }

      // We need to add "use client" to files using hooks
      if (content.match(/useRouter|usePathname|useParams|useState|useEffect|useCart|motion\//)) {
         if (!content.includes('"use client"')) {
            content = '"use client";\n' + content;
         }
      }

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  });
}

fixImports(basePath, 0);
