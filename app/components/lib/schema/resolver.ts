/* eslint-disable @typescript-eslint/no-explicit-any */
import { normalizeData } from "./normalize";
import {
  buildDeveloperSchemas,
  buildProject,
  buildCommunitySchemas,
  buildArticle,
} from "./builder";

export function resolveSchemas({ type, data }: any) {
  console.log(data, "Dad");
  const d = normalizeData(type, data);

  switch (type) {
    case "developer":
      return [buildDeveloperSchemas(d)];

    case "project":
      return [buildProject(d)];

    case "community":
      return [buildCommunitySchemas(d)];

    case "blog":
      return [buildArticle(d)];

    default:
      return [];
  }
}
