export const parseSection = (section: string) => {
  const lines = section.split('\n').map(l => l.trim()).filter(Boolean);

  const title = lines[0].startsWith('#')
    ? lines[0].substring(1).trim()
    : lines[0];

  const points: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (
      !line ||
      line.startsWith('#') ||
      line.startsWith('[Choose') ||
      line.startsWith('[Pilih')
    ) {
      continue;
    }

    points.push(line);
  }

  return { title, points };
};