import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isReadOnlyDeploy } from "@/lib/content-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED_FOLDERS = new Set(["projects", "commissions", "uploads"]);
const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);
const MAX_BYTES = 8 * 1024 * 1024;

function safeName(name: string) {
  const base = name
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^\.+/, "")
    .toLowerCase();
  return base || "image.png";
}

export async function POST(request: Request) {
  try {
    if (isReadOnlyDeploy()) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Netlify 上无法持久上传。请在本地上传后，把 public 图片一并提交再部署。",
        },
        { status: 403 },
      );
    }

    const form = await request.formData();
    const file = form.get("file");
    const folderRaw = String(form.get("folder") || "uploads");
    const folder = ALLOWED_FOLDERS.has(folderRaw) ? folderRaw : "uploads";

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "缺少文件" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type) && !/\.(png|jpe?g|webp|gif|svg)$/i.test(file.name)) {
      return NextResponse.json(
        { ok: false, error: "仅支持 png / jpg / webp / gif / svg" },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: "图片不能超过 8MB" }, { status: 400 });
    }

    const dir = path.join(process.cwd(), "public", folder);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    const stamp = Date.now().toString(36);
    const filename = `${stamp}-${safeName(file.name)}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    writeFileSync(path.join(dir, filename), buffer);

    const url = `/${folder}/${filename}`;
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "上传失败（可能是只读环境）";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
