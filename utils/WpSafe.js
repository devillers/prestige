// Fonction utilitaire pour sécuriser les champs WordPress (ex: title, content, excerpt)
export function wpText(obj) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  if (typeof obj === "object" && "rendered" in obj) return obj.rendered;
  return "";
}
