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
          // const criticalCss = `
          //   body{position:relative;margin:0;padding:0;background:url(assets/images/yameenArcadeCab.png) no-repeat center top #2b2d4b;height:1568px;font:13px/1.231 arial,helvetica,clean,sans-serif}#container{position:absolute;width:800px;height:600px;display:none;left:50%;margin-left:-400px;top:440px}#bootUp{position:absolute;left:50%;margin-left:-399px;top:440px}#bootUp p{color:#fff;text-transform:uppercase;font-size:200%}.bootup{padding:20px}@font-face{font-family:"Sifters";src:url("assets/fonts/arcade-font.woff") format("woff");font-weight:normal;font-style:normal}.logo-lockup{display:flex;justify-content:center;align-items:center;width:100%;position:absolute;bottom:25px}.logo-list{display:flex;list-style:none;padding:0;margin:0;gap:30px;justify-content:center;align-items:center}.logo-list li{display:flex;justify-content:center;align-items:center}.logo-lockup__logo{height:40px;width:auto;object-fit:contain;transition:all 0.3s ease}
          // `;
          const criticalCss = ``;
          
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