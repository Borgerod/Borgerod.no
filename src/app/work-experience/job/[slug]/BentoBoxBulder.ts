export function BentoBoxBuilder(
  items: string[],
): { text: string; span: number }[][] {
  const maxLen = Math.max(...items.map((i) => i.length));

  const seed = items.reduce((acc, item) => acc + item.length, 0);
  let s = seed;
  function rand(): number {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  }

  function getMinSpan(item: string): number {
    if (item.length >= 200) return 4;
    if (item.length >= 80) return 2;
    return 1;
  }

  const allLayouts: number[][] = [
    [4],
    [2],
    [3],
    [2, 2],
    [1, 2],
    [2, 1],
    [1, 3],
    [3, 1],
    [1, 1],
    [1, 1, 2],
    [2, 1, 1],
    [2, 1, 1],
    [1, 1, 1],
    [1, 2, 1],
    [1, 2, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ];

  const shuffled = [...allLayouts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  function layoutKey(l: number[]): string {
    const g = l.reduce((acc, v) => gcd(acc, v));
    return l.map((v) => v / g).join("-");
  }

  function rowFits(row: { text: string; span: number }[]): boolean {
    const totalSpan = row.reduce((acc, item) => acc + item.span, 0);
    const lens = row.map((item) => item.text.length);
    const spans = row.map((item) => item.span);
    // Prevent extreme mismatch: no medium text next to huge text
    for (let i = 0; i < lens.length - 1; i++) {
      if (
        Math.abs(lens[i] - lens[i + 1]) > 70 &&
        Math.min(lens[i], lens[i + 1]) > 30
      )
        return false;
    }
    for (let i = 0; i < row.length; i++) {
      const pct = spans[i] / totalSpan;
      const len = lens[i];
      // Huge text must have big box
      if (len > 120 && pct < 0.75) return false;
      // Big text must have medium/big box
      if (len > 70 && pct < 0.5) return false;
      // Medium text must have at least medium box
      if (len > 30 && pct < 0.25) return false;
      // Small text must not go in big box
      if (len <= 30 && pct > 0.5) return false;
    }
    return true;
  }

  function tryFill(
    layout: number[],
    available: string[],
  ): { text: string; span: number }[] | null {
    const n = layout.length;
    if (n > available.length) return null;
    // 1. Try all permutations (swap places)
    function* permute(arr: number[]): Generator<number[]> {
      if (arr.length <= 1) yield arr;
      else {
        for (let i = 0; i < arr.length; i++) {
          for (const p of permute([...arr.slice(0, i), ...arr.slice(i + 1)])) {
            yield [arr[i], ...p];
          }
        }
      }
    }
    const indices = Array.from({ length: n }, (_, i) => i);
    for (const perm of permute(indices)) {
      const used = new Set<number>();
      const row = perm.map((idx, i) => {
        used.add(idx);
        return { text: available[idx], span: layout[i] };
      });
      if (rowFits(row) && used.size === n) return row;
    }
    // 2. Try another layout (handled by caller)
    // 3. Try swapping one item with another from the queue
    function* combinations(arr: string[], n: number): Generator<number[]> {
      if (n === 0) yield [];
      else {
        for (let i = 0; i <= arr.length - n; i++) {
          for (const rest of combinations(arr.slice(i + 1), n - 1)) {
            yield [i, ...rest];
          }
        }
      }
    }
    for (const combo of combinations(available, n)) {
      for (const perm of permute(Array.from({ length: n }, (_, i) => i))) {
        const used = new Set<number>();
        const row = perm.map((idx, i) => {
          used.add(combo[idx]);
          return { text: available[combo[idx]], span: layout[i] };
        });
        if (rowFits(row) && used.size === n) return row;
      }
    }
    return null;
  }

  const rows: { text: string; span: number }[][] = [];
  const queue = [...items];
  let prevKey = "";

  function reshuffle(arr: number[][]): number[][] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let pool: number[][] = reshuffle([...allLayouts]);

  function pickFromPool(
    allowSingleton: boolean,
  ): { text: string; span: number }[] | null {
    for (let i = 0; i < pool.length; i++) {
      const layout = pool[i];
      const key = layoutKey(layout);
      if (key === prevKey) continue;
      if (layout.length > queue.length) continue;
      if (!allowSingleton && layout.length === 1 && queue.length > 1) continue;
      const result = tryFill(layout, queue);
      if (result) {
        pool.splice(i, 1);
        prevKey = key;
        return result;
      }
    }
    return null;
  }

  while (queue.length > 0) {
    let filled = pickFromPool(false);

    if (!filled) {
      pool = reshuffle([...allLayouts]);
      filled = pickFromPool(false);
    }

    if (!filled) {
      pool = reshuffle([...allLayouts]);
      filled = pickFromPool(true);
    }

    if (!filled) {
      filled = [{ text: queue[0], span: getMinSpan(queue[0]) }];
      prevKey = layoutKey([getMinSpan(queue[0])]);
    }

    for (const item of filled) {
      const idx = queue.indexOf(item.text);
      if (idx !== -1) queue.splice(idx, 1);
    }

    rows.push(filled);
  }

  if (rows.length >= 2) {
    const rowKey = (row: { text: string; span: number }[]) =>
      layoutKey(row.map((i) => i.span));
    const lastKey = rowKey(rows[rows.length - 1]);
    if (lastKey === rowKey(rows[rows.length - 2])) {
      const lastRow = rows.pop()!;
      let inserted = false;
      for (let i = 0; i <= rows.length - 1; i++) {
        const before = i > 0 ? rowKey(rows[i - 1]) : "";
        const next = i < rows.length ? rowKey(rows[i]) : "";
        if (lastKey !== before && lastKey !== next) {
          rows.splice(i, 0, lastRow);
          inserted = true;
          break;
        }
      }
      if (!inserted) rows.push(lastRow);
    }
  }

  console.log(rows);
  return rows;
}
