import {build} from 'esbuild';
await build({entryPoints:['src/enhancements.jsx'],bundle:true,minify:true,outfile:'dist/enhancements.js',format:'esm',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},legalComments:'linked'});
