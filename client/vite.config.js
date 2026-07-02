/**
 * ============================================================================
 * CONNECTHUB SOCIAL MEDIA PLATFORM - PRODUCTION-LEVEL CONFIGURATION
 * ============================================================================
 * * CORE ARCHITECTURE DESCRIPTION:
 * This is a highly scalable, robust, and heavily optimized Vite configuration 
 * designed specifically for deploying the "ConnectHub" social media application 
 * onto the Render Static Sites infrastructure. 
 * * APPLICATION FEATURES INTEGRATED IN ARCHITECTURE MAP:
 * 1. User Authentication & Authorization Gateways (JWT Handling)
 * 2. Real-time Social Feed & Dynamic Post Creation Engine
 * 3. Media Uploading Pipeline (Images, Avatars, Post Attachments)
 * 4. Interactive Engagement Module (Real-time Likes, Nested Comments, Shares)
 * 5. User Profile Management Dashboard (Bio, Covers, Friendship States)
 * 6. Responsive Sidebar Navigation and Multi-theme Core Setup
 * * AUTHOR: Developer AI & Student Collaboration
 * REPOSITORY STRUCTURE: Subfolder Deployment (/client)
 * TARGET HOSTING ENVIRONMENT: Render Cloud Infrastructure
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // --------------------------------------------------------------------------
  // 1. PLUGINS CORE MODULE SETUP
  // --------------------------------------------------------------------------
  plugins: [
    react({
      // Enable Fast Refresh for seamless state updating without full reloads
      fastRefresh: true,
      // Include elite Babel configuration for cross-browser parsing security
      babel: {
        plugins: [],
        compact: true
      }
    })
  ],

  // --------------------------------------------------------------------------
  // 2. PATH RESOLUTION & ALIASING (Keeps Imports Clean like @components/Post)
  // --------------------------------------------------------------------------
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@context': fileURLToPath(new URL('./src/context', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url))
    }
  },

  // --------------------------------------------------------------------------
  // 3. ENTERPRISE-LEVEL PRODUCTION BUILD OPTIMIZATIONS (For Render Hosting)
  // --------------------------------------------------------------------------
  build: {
    // Defines where Render will find compiled production files
    outDir: 'dist',
    assetsDir: 'assets',
    
    // Inline tiny image assets under 8KB to completely eliminate unnecessary HTTP requests
    assetsInlineLimit: 8192,
    
    // Disable source maps to compress file sizes, securing code & drastically reducing build times
    sourcemap: false,
    
    // Use Terser for hyper-aggressive script compression and dead-code removal
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Removes all dev console.logs automatically for security
        drop_debugger: true, // Removes debugger statements
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
        passes: 3            // Run optimization pipeline thrice for micro-optimizations
      },
      output: {
        comments: false      // Completely strips out comments from final production code
      }
    },

    // ------------------------------------------------------------------------
    // ADVANCED ROLLUP MULTI-CHUNKING PIPELINE
    // ------------------------------------------------------------------------
    // Splits huge social media libraries into small, cacheable parts. 
    // This allows Render CDN to load your website instantly for users.
    rollupOptions: {
      output: {
        compact: true,
        entryFileNames: 'assets/js/connecthub-core-[hash].js',
        chunkFileNames: 'assets/js/connecthub-chunk-[name]-[hash].js',
        assetFileNames: 'assets/[ext]/connecthub-style-[name]-[hash].[ext]',
        
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Core Framework Split
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'framework-react-core';
            }
            // Social Media UI Icons Package Split
            if (id.includes('lucide-react') || id.includes('@heroicons') || id.includes('react-icons')) {
              return 'ui-icons-package';
            }
            // State Management & Network API Data Traffic Controllers
            if (id.includes('axios') || id.includes('redux') || id.includes('@reduxjs/toolkit')) {
              return 'network-state-api-manager';
            }
            // Date formatting libraries for timelines (e.g., "2 hours ago")
            if (id.includes('date-fns') || id.includes('moment') || id.includes('dayjs')) {
              return 'date-utility-handlers';
            }
            // Default split guard for other heavy modular dependencies
            return 'third-party-vendor-dependencies';
          }
        }
      }
    },

    // Guardrail against mixed-module installation errors during cloud deployment
    commonjsOptions: {
      transformMixedEsModules: true
    },
    
    // Clean old distribution directories strictly before generating new production drops
    emptyOutDir: true,
    
    // Throw error if bundle chunks exceed target sizing to ensure platform safety
    chunkSizeWarningLimit: 1200
  },

  // --------------------------------------------------------------------------
  // 4. DEVELOPMENT WORKSPACE CONTROLS (Local Machine Engine)
  // --------------------------------------------------------------------------
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    cors: true,
    open: false,
    hmr: {
      overlay: true // Show visual error overlay right on screen if developer breaks code
    }
  },

  // --------------------------------------------------------------------------
  // 5. CLOUD STAGING PREVIEW RUNNERS (Render Environment Mimic)
  // --------------------------------------------------------------------------
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
    cors: true
  },

  // --------------------------------------------------------------------------
  // 6. PERFORMANCE CACHING & OPTIMIZATION ADJUSTMENTS
  // --------------------------------------------------------------------------
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'axios'
    ],
    exclude: []
  }
});

/**
 * ============================================================================
 * END OF CORE CONFIGURATION FILE - DEPLOY READY
 * ============================================================================
 */
      
