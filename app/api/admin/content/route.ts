import { NextResponse } from "next/server";
import {
  getStore,
  isReadOnlyDeploy,
  saveStore,
  type ContentStore,
} from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    store: getStore(),
    readOnly: isReadOnlyDeploy(),
  });
}

export async function POST(request: Request) {
  try {
    if (isReadOnlyDeploy()) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Netlify 上无法持久保存。请在本地后台修改，提交 content/store.json 与图片后再部署。",
        },
        { status: 403 },
      );
    }
    const body = (await request.json()) as { store?: ContentStore };
    if (!body.store || typeof body.store !== "object") {
      return NextResponse.json({ ok: false, error: "缺少 store" }, { status: 400 });
    }
    saveStore(body.store);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "保存失败（可能是只读环境）";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
