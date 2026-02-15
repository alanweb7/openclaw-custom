import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const SVG_PATH = 'ui/public/organix.svg';
const OUTPUT_DIR = 'ui/public';

async function generate() {
  console.log('Gerando favicons...');
  
  try {
    // favicon-32.png
    await sharp(SVG_PATH)
      .resize(32, 32)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon-32.png'));
    console.log('favicon-32.png gerado.');

    // apple-touch-icon.png
    await sharp(SVG_PATH)
      .resize(180, 180)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));
    console.log('apple-touch-icon.png gerado.');

    // favicon.ico - Na prática, navegadores modernos aceitam PNG renomeado ou o próprio SVG.
    // Para garantir compatibilidade básica, vamos criar uma versão 32x32 renomeada.
    // Sharp não exporta ICO nativamente sem plugins extras geralmente.
    await sharp(SVG_PATH)
      .resize(32, 32)
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon.ico')); 
    console.log('favicon.ico (conteúdo png) gerado.');
  } catch (error) {
    console.error('Erro ao gerar favicons:', error);
    process.exit(1);
  }
}

generate();
