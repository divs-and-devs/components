export default function clamp (value, min, max) {
  if (
    (min === undefined &&
      max === undefined) ||
    (Number.isNaN(min) &&
      Number.isNaN(max))
  )
    return value;
  else if (max === undefined || Number.isNaN(max))
    return Math.max(min, value);
  else if (min === undefined || Number.isNaN(min))
    return Math.min(max, value);

  return Math.max(min, Math.min(max, value));
}
