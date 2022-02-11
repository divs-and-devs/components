export default function randomColor (input) {
  let hash = 7;

  for (const c of input)
    hash = hash * 31 + c.charCodeAt(0);

  const h = hash % 360;
  const l = hash % 35 + 35;

  return `hsl(${h}deg, 75%, ${l}%)`;
}
