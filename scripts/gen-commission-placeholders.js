const sharp = require("sharp");
const fs = require("fs");

async function card(file, title, subtitle, accent) {
  const w = 1400;
  const h = 900;
  const svg = `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#0C0C0F"/>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="64" y="64" width="${w - 128}" height="${h - 128}" rx="24" fill="#121216" stroke="rgba(255,255,255,0.08)"/>
  <rect x="96" y="120" width="180" height="10" rx="5" fill="${accent}" opacity="0.9"/>
  <text x="96" y="220" fill="#F5F5F7" font-size="54" font-family="Segoe UI, Arial" font-weight="700">${title}</text>
  <text x="96" y="280" fill="#A1A1AA" font-size="28" font-family="Segoe UI, Arial">${subtitle}</text>
  <rect x="96" y="360" width="${w - 320}" height="320" rx="16" fill="#16161B" stroke="rgba(255,255,255,0.06)"/>
  <rect x="128" y="400" width="280" height="16" rx="8" fill="rgba(255,255,255,0.08)"/>
  <rect x="128" y="440" width="420" height="12" rx="6" fill="rgba(255,255,255,0.05)"/>
  <rect x="128" y="472" width="360" height="12" rx="6" fill="rgba(255,255,255,0.05)"/>
  <rect x="128" y="520" width="200" height="40" rx="12" fill="${accent}" opacity="0.85"/>
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(file);
  console.log(file, fs.statSync(file).size);
}

(async () => {
  fs.mkdirSync("public/commissions", { recursive: true });
  await card("public/commissions/campus-series.png", "Campus Series", "20+ student &amp; club builds", "#A3E635");
  await card("public/commissions/campus-portfolio.png", "Student Portfolio", "Campus commission", "#5B8CFF");
  await card("public/commissions/campus-event.png", "Event Landing", "Campus commission", "#5B8CFF");
  await card("public/commissions/small-landing.png", "Indie Landing", "Small site", "#8B5CF6");
  await card("public/commissions/small-tool.png", "Mini Tool Site", "Small site", "#8B5CF6");
  await card("public/commissions/enterprise.png", "Enterprise Intro", "Business website", "#FF8A4C");
  await card("public/commissions/commerce.png", "Commerce Intro", "B2B business site", "#FF8A4C");
})();
