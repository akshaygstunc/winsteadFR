export function detectType(path: string) {
  if (path.includes("/developer")) return "developer";
  if (path.includes("/project")) return "project";
  if (path.includes("/community")) return "community";
  if (path.includes("/blog")) return "blog";
  return "page";
}
