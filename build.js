#!/usr/bin/env node

/**
 * Build script for Vercel deployment
 * Copies all static files to the 'public' directory
 */

const fs = require('fs');
const path = require('path');

const sourceDir = __dirname;
const outputDir = path.join(__dirname, 'public');

// Remove existing public directory if it exists, then create fresh one
function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const curPath = path.join(dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dir);
  }
}

if (fs.existsSync(outputDir)) {
  console.log('Cleaning existing public directory...');
  removeDir(outputDir);
}
fs.mkdirSync(outputDir, { recursive: true });
console.log('Created fresh public directory');

// Function to copy file
function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    // Skip node_modules, .git, public directory, and build files
    if (entry.name === 'node_modules' || 
        entry.name === '.git' || 
        entry.name === 'public' ||
        entry.name === 'build.js' ||
        entry.name.startsWith('.') ||
        entry.name === 'backup_untracked_files_20251105_162256') {
      continue;
    }
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// Files and directories to copy
const itemsToCopy = [
  '*.html',
  '*.css',
  '*.js',
  '*.json',
  'partials',
  'Images',
  'Tilli Home Page',
  'Blog Page images',
  'Case Studies Page',
  'Industries Page',
  'Developer page',
  'Developer Guide Page',
  'Education and Universities Industry page',
  'Free Trail',
  'Help Center',
  'Nudge Product Page',
  'Solution Partner Page',
  'tilliPay Product Page',
  'tilliX Product Page',
  'competitive compare page',
  'Calculator pages resources',
  'aboutus'
];

console.log('Building for Vercel deployment...');
console.log(`Source: ${sourceDir}`);
console.log(`Output: ${outputDir}`);

// Copy all files and directories
try {
  // Copy root-level HTML, CSS, JS, JSON, PDF files
  const rootFiles = fs.readdirSync(sourceDir);
  for (const file of rootFiles) {
    const filePath = path.join(sourceDir, file);
    const stat = fs.statSync(filePath);
    
    // Skip directories and special files
    if (stat.isDirectory() || 
        file.startsWith('.') || 
        file === 'node_modules' || 
        file === 'public' || 
        file === 'build.js' ||
        file === 'package.json' ||
        file === 'package-lock.json' ||
        file === 'vercel.json' ||
        file === '.vercelignore' ||
        file === 'dev.config.json' ||
        file === 'server.config.js' ||
        file === 'start-server.js' ||
        file.endsWith('.md') ||
        file === 'how origin' ||
        file === 'tatus' ||
        file.startsWith('backup_')) {
      continue;
    }
    
    // Copy HTML, CSS, JS, JSON, PDF files
    if (file.endsWith('.html') || 
        file.endsWith('.css') || 
        file.endsWith('.js') || 
        file.endsWith('.json') ||
        file.endsWith('.pdf')) {
      copyFile(filePath, path.join(outputDir, file));
    }
  }
  
  // Copy directories
  for (const item of itemsToCopy) {
    const srcPath = path.join(sourceDir, item);
    if (fs.existsSync(srcPath)) {
      const stat = fs.statSync(srcPath);
      if (stat.isDirectory()) {
        copyDir(srcPath, path.join(outputDir, item));
      } else if (stat.isFile()) {
        copyFile(srcPath, path.join(outputDir, item));
      }
    }
  }
  
  // Copy all blog HTML files
  const blogFiles = rootFiles.filter(f => f.startsWith('blog') && f.endsWith('.html'));
  for (const blogFile of blogFiles) {
    copyFile(path.join(sourceDir, blogFile), path.join(outputDir, blogFile));
  }
  
  // Copy all case study HTML files
  const caseFiles = rootFiles.filter(f => f.startsWith('case-study') && f.endsWith('.html'));
  for (const caseFile of caseFiles) {
    copyFile(path.join(sourceDir, caseFile), path.join(outputDir, caseFile));
  }
  
  // Verify public directory was created and has files
  const publicFiles = fs.readdirSync(outputDir);
  console.log(`✅ Build completed successfully!`);
  console.log(`📁 Files copied to: ${outputDir}`);
  console.log(`📊 Total items in public directory: ${publicFiles.length}`);
  
  if (publicFiles.length === 0) {
    console.error('❌ Warning: Public directory is empty!');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}

