import fs from 'fs';
import zlib from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateTornPaperPNG(width, height) {
  const strokePath = (x) => {
    const normX = x / width;
    const wave = 0.38 
      + 0.12 * Math.sin(normX * Math.PI * 2) 
      + 0.14 * Math.cos(normX * Math.PI * 4 - 0.5) 
      + 0.08 * Math.sin(normX * Math.PI * 9)
      + 0.04 * Math.sin(normX * Math.PI * 18);
    return Math.floor(wave * height);
  };

  const buffer = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const tearY = strokePath(x);

      if (y >= tearY) {
        // Solid White Paper
        buffer[idx] = 255;     // R
        buffer[idx + 1] = 255; // G
        buffer[idx + 2] = 255; // B
        buffer[idx + 3] = 255; // A (Opaque)
      } else if (y === tearY - 1) {
        // Soft antialiased edge
        buffer[idx] = 255;
        buffer[idx + 1] = 255;
        buffer[idx + 2] = 255;
        buffer[idx + 3] = 140;
      } else {
        // Transparent Top
        buffer[idx] = 0;
        buffer[idx + 1] = 0;
        buffer[idx + 2] = 0;
        buffer[idx + 3] = 0;
      }
    }
  }

  return encodeRawToPNG(buffer, width, height);
}

function encodeRawToPNG(rgbaBuffer, width, height) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bits per channel
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const ihdrChunk = createChunk('IHDR', ihdr);

  const rawData = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const lineStart = y * (1 + width * 4);
    rawData[lineStart] = 0; // Filter type 0
    rgbaBuffer.copy(rawData, lineStart + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);

  const crc = crc32(buf.slice(4, 8 + len));
  buf.writeInt32BE(crc, 8 + len);
  return buf;
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ ((c & 1) ? 0xedb88320 : 0);
    }
  }
  return ~c;
}

const targetPath = path.join(__dirname, '..', 'public', 'images', 'sobekankertas.png');
const pngBuffer = generateTornPaperPNG(1000, 100);
fs.writeFileSync(targetPath, pngBuffer);
console.log('Generated TRUE binary PNG sobekankertas.png (size:', pngBuffer.length, 'bytes)');
