import fs from 'fs';
import path from 'path';

const basePath = 'p:/Agency/Web design/Web Design Samples/Optics Store Web Project 1 Sample/Optical Store Website Design (Community)/src/app';

// 1. Move files
const routes = {
  'Home.tsx': 'page.tsx',
  'Shop.tsx': 'shop/page.tsx',
  'ProductDetail.tsx': 'product/[id]/page.tsx',
  'Cart.tsx': 'cart/page.tsx',
  'Checkout.tsx': 'checkout/page.tsx',
  'OrderSuccess.tsx': 'order-success/page.tsx',
  'Login.tsx': 'login/page.tsx',
  'Register.tsx': 'register/page.tsx',
  'Profile.tsx': 'profile/page.tsx',
};

for (const [file, dest] of Object.entries(routes)) {
  const src = path.join(basePath, 'pages', file);
  const destPath = path.join(basePath, dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  if (fs.existsSync(src)) {
    fs.renameSync(src, destPath);
  }
}

// 2. Replace react-router imports in all files in src
function walkSync(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let dirPath = path.join(dir, file);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkSync(dirPath, callback);
    } else {
      callback(path.join(dir, file));
    }
  });
}

walkSync(basePath, (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // React Router replacements
  content = content.replace(/import\s+\{\s*Link[^\}]*\}\s+from\s+["']react-router["'];?/g, 'import Link from "next/link";');
  content = content.replace(/import\s+\{\s*useNavigate[^\}]*\}\s+from\s+["']react-router["'];?/g, 'import { useRouter } from "next/navigation";');
  content = content.replace(/useNavigate\(\)/g, 'useRouter()');
  content = content.replace(/import\s+\{\s*useParams[^\}]*\}\s+from\s+["']react-router["'];?/g, 'import { useParams } from "next/navigation";');
  content = content.replace(/import\s+\{\s*useLocation[^\}]*\}\s+from\s+["']react-router["'];?/g, 'import { usePathname } from "next/navigation";');
  content = content.replace(/useLocation\(\)/g, '{ pathname: usePathname() }');

  // Also replace multiple imports like: import { useNavigate, Link } from "react-router";
  if (content.includes('react-router')) {
     if (content.match(/import\s+\{.*\}\s+from\s+["']react-router["'];?/)) {
         content = content.replace(/import\s+\{.*\}\s+from\s+["']react-router["'];?/, `import Link from "next/link";\nimport { useRouter, useParams, usePathname } from "next/navigation";`);
     }
  }

  // Export default adjustments for pages
  if (filePath.includes('page.tsx') && !filePath.includes('components')) {
      // Find export function Name() and replace with export default function Name()
      content = content.replace(/export\s+function\s+([A-Za-z0-9_]+)/g, 'export default function $1');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
