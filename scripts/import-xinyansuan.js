const sharp = require("sharp");
const fs = require("fs");

const login =
  "C:/Users/Administrator/.cursor/projects/c-xiaoshui/assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_a7a43d098cba659c26f49adfdf6631b3_images_image-5c70fcf2-add1-4b16-b4f6-37679dff1b90.png";
const sim =
  "C:/Users/Administrator/.cursor/projects/c-xiaoshui/assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_a7a43d098cba659c26f49adfdf6631b3_images_image-3ace0064-f1c4-4a11-afa1-0dcb830e62d1.png";
const modal =
  "C:/Users/Administrator/.cursor/projects/c-xiaoshui/assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_a7a43d098cba659c26f49adfdf6631b3_images_image-29a85736-9e55-4f54-acd5-69f9af78c83c.png";

(async () => {
  fs.mkdirSync("public/commissions", { recursive: true });

  await sharp(sim).png().toFile("public/commissions/enterprise.png");
  await sharp(sim).png().toFile("public/commissions/xinyansuan-sim.png");
  await sharp(login).png().toFile("public/commissions/xinyansuan-login.png");

  const meta = await sharp(modal).metadata();
  const w = meta.width;
  const h = meta.height;
  const qx = Math.round(w * 0.56);
  const qy = Math.round(h * 0.13);
  const qw = Math.round(w * 0.38);
  const qh = Math.round(h * 0.34);

  const blurred = await sharp(modal)
    .extract({ left: qx, top: qy, width: qw, height: qh })
    .blur(28)
    .modulate({ brightness: 0.85, saturation: 0.2 })
    .toBuffer();

  const coverSvg = Buffer.from(
    `<svg width="${qw}" height="${qh}">` +
      `<rect width="100%" height="100%" rx="8" fill="rgba(20,20,24,0.55)"/>` +
      `<text x="50%" y="52%" text-anchor="middle" fill="#F5F5F7" font-size="18" font-family="Segoe UI, Microsoft YaHei, sans-serif">已打码</text>` +
      `</svg>`,
  );

  await sharp(modal)
    .composite([
      { input: blurred, left: qx, top: qy },
      { input: await sharp(coverSvg).png().toBuffer(), left: qx, top: qy },
    ])
    .png()
    .toFile("public/commissions/xinyansuan-contact.png");

  console.log({ w, h, qx, qy, qw, qh });
  console.log("ok", {
    enterprise: fs.statSync("public/commissions/enterprise.png").size,
    contact: fs.statSync("public/commissions/xinyansuan-contact.png").size,
  });
})();
