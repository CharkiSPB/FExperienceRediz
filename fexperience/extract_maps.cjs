const fs = require('fs');
const files = ['africa','asia','latam','russia'];
const result = {};
for (const f of files) {
  const p = `public/maps/continents/${f}.svg`;
  const s = fs.readFileSync(p,'utf8');
  const vb = s.match(/viewBox="([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/);
  const d = s.match(/d="([^"]+)"/);
  result[f] = { vb: vb ? vb.slice(1).map(Number) : null, d: d ? d[1] : null, len: d ? d[1].length : 0 };
}
console.log(JSON.stringify(result, null, 0));
