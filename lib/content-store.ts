import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { getDefaultStore, type ContentStore } from "@/lib/content-defaults";
import bundledStore from "@/content/store.json";

export type { ContentStore };
export { getDefaultStore };

const CONTENT_DIR = path.join(process.cwd(), "content");
const STORE_PATH = path.join(CONTENT_DIR, "store.json");

export function isReadOnlyDeploy(): boolean {
  return process.env.NETLIFY === "true" || process.env.AWS_LAMBDA_FUNCTION_NAME != null;
}

function bundled(): ContentStore {
  return {
    ...getDefaultStore(),
    ...(bundledStore as ContentStore),
  };
}

export function getStore(): ContentStore {
  try {
    if (existsSync(STORE_PATH)) {
      const raw = readFileSync(STORE_PATH, "utf8");
      const parsed = JSON.parse(raw) as ContentStore;
      return { ...getDefaultStore(), ...parsed };
    }
  } catch {
    // fall through
  }
  return bundled();
}

export function saveStore(store: ContentStore): void {
  if (isReadOnlyDeploy()) {
    throw new Error(
      "Netlify 上无法持久保存。请在本地改内容并提交 content/store.json 与 public 图片后再部署。",
    );
  }
  if (!existsSync(CONTENT_DIR)) {
    mkdirSync(CONTENT_DIR, { recursive: true });
  }
  writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}
