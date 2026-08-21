const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const pairs = [
  [
    "qingge-playlist",
    "C:/Users/Administrator/.cursor/projects/c-xiaoshui/assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_a7a43d098cba659c26f49adfdf6631b3_images______2026-08-21_130731-5d8d3b18-5b44-4f52-ad0e-0b4831851a24.png",
  ],
  [
    "pet-infographic",
    "C:/Users/Administrator/.cursor/projects/c-xiaoshui/assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_a7a43d098cba659c26f49adfdf6631b3_images_image-381fcf7f-f857-4f1f-8121-fc79188711b8.png",
  ],
  [
    "yan-design",
    "C:/Users/Administrator/.cursor/projects/c-xiaoshui/assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_a7a43d098cba659c26f49adfdf6631b3_images_image-595b8b94-7677-458c-9a53-7d47886e77d6.png",
  ],
  [
    "wuyi-tea",
    "C:/Users/Administrator/.cursor/projects/c-xiaoshui/assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_a7a43d098cba659c26f49adfdf6631b3_images_image-5657b709-51d1-4be1-8e8f-9e7c06e2b3f5.png",
  ],
  [
    "mingli-viz",
    "C:/Users/Administrator/.cursor/projects/c-xiaoshui/assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_a7a43d098cba659c26f49adfdf6631b3_images_image-3a962fdf-dc06-4986-ba05-f9e7a53b59f7.png",
  ],
  [
    "maja-lemon",
    "C:/Users/Administrator/.cursor/projects/c-xiaoshui/assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_a7a43d098cba659c26f49adfdf6631b3_images_image-59d80e2e-8bb2-4559-a9e4-7af593d019e1.png",
  ],
  [
    "design-course",
    "C:/Users/Administrator/.cursor/projects/c-xiaoshui/assets/c__Users_Administrator_AppData_Roaming_Cursor_User_workspaceStorage_a7a43d098cba659c26f49adfdf6631b3_images_image-741a34a0-759e-4e6b-a21a-914ebe026ffc.png",
  ],
];

(async () => {
  fs.mkdirSync("public/commissions/campus", { recursive: true });
  const out = [];
  for (const [name, src] of pairs) {
    if (!fs.existsSync(src)) {
      console.log("missing", name);
      continue;
    }
    const dest = path.join("public/commissions/campus", `${name}.png`);
    await sharp(src)
      .resize({ width: 1600, withoutEnlargement: true })
      .png()
      .toFile(dest);
    out.push(`/commissions/campus/${name}.png`);
    console.log("ok", dest, fs.statSync(dest).size);
  }
  if (out.length) {
    await sharp(pairs[0][1])
      .resize({ width: 1600, withoutEnlargement: true })
      .png()
      .toFile("public/commissions/campus-series.png");
  }
  console.log(JSON.stringify(out, null, 2));
})();
