# Comprehensive Assets Guide: 2D & 3D Websites

This guide outlines the mandatory assets you need to prepare, create, or generate for both standard **2D Websites** and immersive **3D Websites**.

## 1. Standard 2D Websites (Next.js + Tailwind)

For a premium, lightning-fast 2D website, your primary goal is visual sharpness paired with tiny file sizes to maximize SEO and load speed.

| Asset Type | Recommended Format | Target File Size | Description & Best Practices |
| :--- | :--- | :--- | :--- |
| **Hero / Photography** | `.webp` (or `.avif`) | `< 150KB - 200KB` | Large banner or product photos. Never use raw `.png` or `.jpg` for large photos unless strictly necessary. Export at `1920x1080` max for web. |
| **Graphics & Icons** | `.svg` | `< 10KB` | Logos, UI icons, and flat illustrations. SVGs scale infinitely without losing quality. Run them through SVGO to strip bloated metadata. |
| **Typography / Fonts** | `.woff2` | `< 30KB per weight` | Variable fonts are highly recommended. Never load `.ttf` or `.otf` files as they are uncompressed and heavy. |
| **Favicons & Metadata** | `.svg`, `.png`, `.ico` | `< 5KB` | You need a `favicon.ico` (fallback), a `icon.svg` (modern), and an `apple-touch-icon.png` (180x180) for users pinning the site to their phones. |
| **Micro-Animations** | `.json` (Lottie) or `.mp4` | `< 500KB` | For small animated graphics, Lottie files are tiny and scalable. If using video backgrounds, compress heavily and mute it. |

---

## 2. 3D Websites (Next.js + React Three Fiber)

3D websites are much heavier. You must strictly control the size of geometry and textures so the user doesn't stare at a loading screen for 10 seconds.

| Asset Type | Recommended Format | Target File Size | Description & Best Practices |
| :--- | :--- | :--- | :--- |
| **3D Models** | `.glb` or `.gltf` | `< 2MB - 4MB total` | The absolute standard for the web. **Critical:** You must compress your models using **Draco Compression** (via Blender or `gltf-pipeline`), which can reduce file sizes by up to 80%. |
| **3D Textures** | WebP (inside GLTF) or `.ktx2` | `< 500KB per map` | Avoid 4K textures; bake your textures at `1024x1024` or `2048x2048` max. Combine Metallic, Roughness, and Ambient Occlusion into a single RGB map to save memory. |
| **Environment Maps (HDRI)** | `.hdr` or `.exr` | `< 1MB` | Used for realistic reflections and lighting. Use low-resolution blurred HDRIs (e.g., `512x256`) because the web doesn't need 4K skies just for lighting math. |
| **Fallback Image** | `.webp` | `< 100KB` | A pre-rendered screenshot of your 3D scene. This is **mandatory**. You show this 2D image instantly while the heavy 3D `<Canvas>` loads in the background via `Suspense`. |

---

## Summary of What You MUST Have Before Coding

### If building 2D:
1. A finalized Figma file.
2. Exported `.svg` logos/icons.
3. Exported `.webp` images for all photos.
4. `.woff2` font files (or Google Fonts links).

### If building 3D:
1. All of the 2D assets above (for your UI overlay).
2. A single, Draco-compressed `.glb` file containing your 3D scene or character.
3. An `.hdr` environment map for lighting.
4. A static `.webp` screenshot of the 3D scene to act as a loading placeholder.

### Dual-State Product Requirements (For Any Niche)
For premium showcases (e-commerce, real estate, automotive), you must prepare TWO types of images per item:
1. **Standalone / Clean (Default State):** The item isolated on a clean, neutral background (e.g., glasses floating, a car in a studio).
2. **Lifestyle / Context (Hover State):** The item in use or in a real-world setting (e.g., a model wearing the glasses, the car on a scenic road).

## 3. Asset Requirements by Pitch Tier (Niche-Agnostic)

When preparing multiple tiered prototypes for a client pitch (see the Tiered Presentation Strategy in `Blueprint.md`, Section 7), only prepare the assets each tier actually needs — over-preparing assets for a tier the client may not choose wastes agency time and budget.

| Tier | Required Assets | Notes |
| :--- | :--- | :--- |
| **Tier 1 — Clean & Fast** | `.webp`/`.avif` photography, `.svg` icons/logo, `.woff2` fonts, favicon set | No Lottie/video assets needed; keep every asset at the lower end of the size targets in Section 1 to protect the load-time floor all tiers must meet. |
| **Tier 2 — Interactive/Mid** | All Tier 1 assets, plus Lottie (`.json`) or lightweight `.mp4` micro-animations, dummy/sample data sets for simulated filters or carousels | Dummy data should look production-real to the client — same visual polish as a live backend would produce. |
| **Tier 3 — Immersive/3D** | All Tier 1 assets, plus Draco-compressed `.glb`/`.gltf` models, `.hdr` environment map, a static `.webp` fallback screenshot of the 3D scene | This is the only tier requiring the full 3D asset checklist in Section 2. Never skip the fallback screenshot — it is what keeps the pitch demo credible if 3D fails to load live in front of the client. |

**Rule of thumb:** every tier inherits the tier below it and adds to it — Tier 3 is not a separate asset pipeline, it's Tier 1's assets plus Tier 2's interactivity assets plus the 3D-specific set.
