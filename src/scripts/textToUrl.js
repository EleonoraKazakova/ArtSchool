export default function textToUrl(title) {
  const lowercase = title.toLowerCase();
  const trim = lowercase.trim();
  const replace = trim.split(" ").join("-");

  return replace;
}
