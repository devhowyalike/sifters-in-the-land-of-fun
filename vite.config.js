import { defineConfig } from 'vite';
import { resolve } from 'path';
import htmlMinifier from 'html-minifier-terser';
import postcssCustomMedia from 'postcss-custom-media';

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  
  return {
    // Root directory where index.html is located
    root: '.',
    
    build: {
      // Target for browser compatibility
      target: 'esnext',
      // Generate minified output
      minify: 'terser',
      terserOptions: {
        format: {
          comments: false
        },
        compress: {
          drop_console: true
        }
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          format: 'esm',
          entryFileNames: 'bundle.min.js',

          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'assets/css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          }
        }
      },
      // Copy assets to dist folder
      assetsDir: 'assets',
      outDir: 'dist',
      emptyOutDir: true,
      // Extract CSS into separate files
      cssCodeSplit: true
    },
    css: {
      // Enable CSS modules if needed
      modules: false,
      // Generate source maps in development
      devSourcemap: true,
      // Add PostCSS configuration
      postcss: {
        plugins: [
          postcssCustomMedia()
        ]
      }
    },
    plugins: [
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          // Critical CSS to inline (always applied in both dev and prod)
          const criticalCss = `
            :root{--arcade-cab-max-width:1128px}html{color:#000;overflow-y:scroll}body{position:relative;margin:0;padding:0;background-color:#2b2d4b;display:flex;flex-direction:column;align-items:center;font:13px/1.231 arial,helvetica,clean,sans-serif}fieldset,img,legend{border:0}#container{position:absolute;width:70.92%;max-width:800px;aspect-ratio:4/3;left:50%;transform:translateX(-50%);top:28.06%;display:none;flex-direction:column;overflow:hidden}#bootUp{position:absolute;width:70.92%;max-width:800px;aspect-ratio:4/3;left:50%;transform:translateX(-50%);top:28.06%;display:flex;align-items:center;justify-content:center;z-index:2}#bootUp p{color:#fff;text-transform:uppercase;font-size:200%;position:absolute;top:20px;left:20px}.arcade-cabinet-container{width:100%;max-width:var(--arcade-cab-max-width);margin:0 auto;position:relative}.arcade-cabinet-img{width:100%;height:auto;max-width:100%;display:block}@font-face{font-family:"Sifters";src:url("assets/fonts/arcade-font.woff") format("woff");font-weight:normal;font-style:normal}.logo-lockup{display:flex;justify-content:center;align-items:center;width:100%;position:absolute;bottom:2.2%}.logo-list{display:flex;list-style:none;padding:0;margin:0;gap:clamp(15px,2.7vw,30px);justify-content:center;align-items:center}.logo-list li{display:flex;justify-content:center;align-items:center}.logo-lockup__logo{height:clamp(20px,3.5vw,40px);width:auto;object-fit:contain;transition:all 0.3s ease}@media (max-width:1128px){.arcade-cabinet-container{width:100%}#container,#bootUp{top:39.06vw}}@media (max-width:600px){.logo-lockup{bottom:1.5%}.logo-list{gap:clamp(10px,2vw,15px)}#bootUp p{font-size:clamp(16px,4vw,32px)}}@media (max-width:400px){.logo-lockup__logo{height:clamp(15px,5vw,20px)}.logo-lockup{bottom:1%}}
          `;
          
          // Insert critical CSS (for both dev and prod)
          html = html.replace(
            '</head>',
            `<style>${criticalCss}</style></head>`
          );;
          
          // Insert critical CSS (for both dev and prod)
          html = html.replace(
            '</head>',
            `<style>${criticalCss}</style></head>`
          );
          
          // Production-only transformations
          if (isProduction) {
            // Replace the script tag
            html = html.replace(
              /<script src=["']\.\/main\.js["'] type=["']module["'] fetchpriority=["']high["']><\/script>/g,
              '<script src="./bundle.min.js" type="module" fetchpriority="high"></script>'
            );
            
            // Then minify the entire HTML
            return htmlMinifier.minify(html, {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
              minifyCSS: true,
              minifyJS: true
            });
          }
          
          return html;
        }
      }
    ],
    // Public directory for static assets that should be copied as-is
    publicDir: 'public',
  };
});