const fs = require('fs');

const file = process.argv[2];
const content = fs.readFileSync(file, 'utf8');
const regex = /<script type="application\/ld\+json">\s*([\s\S]*?)<\/script>/g;
let match;
let i = 1;

while ((match = regex.exec(content)) !== null) {
  try {
    JSON.parse(match[1]);
    console.log(`Schema ${i}: VALID`);
  } catch(e) {
    console.log(`Schema ${i}: ERROR - ${e.message}`);
    console.log(`First 100 chars: ${match[1].substring(0, 100)}`);
  }
  i++;
}
