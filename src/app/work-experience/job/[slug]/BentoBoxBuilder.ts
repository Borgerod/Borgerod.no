export type BentoItemDef = {
  text: string | string[];
  span: number | number[];
};

export function BentoBoxBuilder(items: string[]): BentoItemDef[][] {
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

  const layouts: (number | number[])[][] = [
    [4],
    [2, 2],
    [1, 2],
    [2, 1],
    [1, 3],
    [3, 1],
    [1, 1],
    [1, 1, 2],
    [2, 1, 1],
    [1, 1, 1],
    [1, 2, 1],
    [1, 1, 1, 1],
    [2, [2, 1], [1, 2]],
    [3, [1, 1]],
    [[1, 2], 1, 1],
    [[2, 1], 1, 1],
    [1, 2, [1, 1]],
    [2, 1, [1, 1]],
    [1, [2, 1], 1],
    [1, [1, 1], 1],
    [1, [1, 2], 1],
    [1, [1, 1], 2],
    [2, [1, 1], 1],
    [1, [3, 1]],
    [[3, 1], 1],
    [1, [1, 3]],
    [[1, 3], 1],
    [2, [3, 1]],
    [[3, 1], 1],
    [2, [1, 3]],
    [[1, 3], 1],
    [2, [1, 2]],
    [[1, 2], 1],
    [2, [2, 1]],
    [[2, 1], 1],
    [2, [1, 1]],
    [[1, 1], 1],
  ];

  // const shuffled = [...layouts];
  // for (let i = shuffled.length - 1; i > 0; i--) {
  //   const j = Math.floor(rand() * (i + 1));
  //   [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  // }

  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  function layoutKey(l: (number | number[])[]): string {
    const flatL = l.map((v) => (Array.isArray(v) ? 1 : v));
    const g = flatL.reduce((acc, v) => gcd(acc, v));
    return flatL.map((v) => v / g).join("-");
  }

  // function rowFits(row: BentoItemDef[]): boolean {
  //   const totalSpan = row.reduce(
  //     (acc, item) =>
  //       acc + (Array.isArray(item.span) ? 1 : (item.span as number)),
  //     0,
  //   );
  //   const lens = row.map((item) =>
  //     Array.isArray(item.text) ? item.text.join(" ").length : item.text.length,
  //   );
  //   const spans = row.map((item) =>
  //     Array.isArray(item.span) ? 1 : (item.span as number),
  //   );

  //   for (let i = 0; i < lens.length - 1; i++) {
  //     if (
  //       Math.abs(lens[i] - lens[i + 1]) > 70 &&
  //       Math.min(lens[i], lens[i + 1]) > 30
  //     )
  //       return false;
  //   }
  //   for (let i = 0; i < row.length; i++) {
  //     const pct = spans[i] / totalSpan;
  //     const len = lens[i];
  //     // Huge text must have big box
  //     if (len > 120 && pct < 0.75) return false;
  //     // Big text must have medium/big box
  //     if (len > 70 && pct < 0.5) return false;
  //     // Medium text must have at least medium box
  //     if (len > 30 && pct < 0.25) return false;
  //     // Small text must not go in big box
  //     if (len <= 30 && pct > 0.5) return false;
  //   }
  //   return true;
  // }

  function rowFits(row: BentoItemDef[]): boolean {
    return true;
  }

  function tryFill(
    layout: (number | number[])[],
    available: string[],
  ): BentoItemDef[] | null {
    const cellsCount = layout.reduce<number>(
      (acc, val) => acc + (Array.isArray(val) ? val.length : 1),
      0,
    );
    if (cellsCount > available.length) return null;

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

    function* combinations(
      nTotal: number,
      k: number,
      start = 0,
    ): Generator<number[]> {
      if (k === 0) yield [];
      else {
        for (let i = start; i <= nTotal - k; i++) {
          for (const rest of combinations(nTotal, k - 1, i + 1)) {
            yield [i, ...rest];
          }
        }
      }
    }

    for (const combo of combinations(available.length, cellsCount)) {
      const selected = combo.map((idx) => available[idx]);
      const sortedStrings = [...selected].sort((a, b) => b.length - a.length);

      const flatLayout: {
        span: number;
        parentIdx: number;
        nestedIdx: number | null;
        isNested: boolean;
      }[] = [];
      layout.forEach((spanDef, i) => {
        if (Array.isArray(spanDef)) {
          spanDef.forEach((v, j) => {
            flatLayout.push({
              span: v,
              parentIdx: i,
              nestedIdx: j,
              isNested: true,
            });
          });
        } else {
          flatLayout.push({
            span: spanDef,
            parentIdx: i,
            nestedIdx: null,
            isNested: false,
          });
        }
      });

      // Priority: Un-nested first (biggest to smallest), then nested (biggest to smallest)
      flatLayout.sort((a, b) => {
        if (a.isNested !== b.isNested) return a.isNested ? 1 : -1;
        return b.span - a.span;
      });

      const assigned: { [key: string]: string | string[] } = {};
      flatLayout.forEach((cell, idx) => {
        if (cell.nestedIdx !== null) {
          const key = `${cell.parentIdx}`;
          if (!assigned[key]) assigned[key] = [];
          (assigned[key] as string[])[cell.nestedIdx] = sortedStrings[idx];
        } else {
          assigned[`${cell.parentIdx}`] = sortedStrings[idx];
        }
      });

      const row: BentoItemDef[] = layout.map((spanDef, i) => {
        if (Array.isArray(spanDef)) {
          return { text: assigned[`${i}`], span: spanDef };
        } else {
          return { text: assigned[`${i}`], span: spanDef };
        }
      });

      if (rowFits(row)) return row;
    }
    return null;
  }

  const rows: BentoItemDef[][] = [];
  const queue = [...items];
  let prevKey = "";

  function reshuffle(array: (number | number[])[][]): (number | number[])[][] {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  let pool: (number | number[])[][] = reshuffle([...layouts]);

  function solve(): boolean {
    if (queue.length === 0) return true;

    for (let i = 0; i < pool.length; i++) {
      const layout = pool[i];
      const key = layoutKey(layout);
      if (key === prevKey) continue;

      const cellsCount = layout.reduce<number>(
        (acc, val) => acc + (Array.isArray(val) ? val.length : 1),
        0,
      );

      if (cellsCount > queue.length) continue;

      const result = tryFill(layout, queue);
      if (result) {
        const removedItems: string[] = [];
        result.forEach((item) => {
          const texts = Array.isArray(item.text) ? item.text : [item.text];
          texts.forEach((t) => {
            const idx = queue.indexOf(t);
            if (idx !== -1) {
              removedItems.push(queue.splice(idx, 1)[0]);
            }
          });
        });

        const usedLayout = pool.splice(i, 1)[0];
        const oldPrevKey = prevKey;
        prevKey = key;
        rows.push(result);

        if (solve()) return true;

        rows.pop();
        prevKey = oldPrevKey;
        pool.splice(i, 0, usedLayout);
        queue.push(...removedItems);
      }
    }
    return false;
  }

  if (!solve()) {
    while (queue.length > 0) {
      let filled: BentoItemDef[] | null = null;
      for (let i = 0; i < pool.length; i++) {
        const layout = pool[i];
        const res = tryFill(layout, queue);
        if (res) {
          filled = res;
          pool.splice(i, 1);
          break;
        }
      }

      if (!filled) {
        break;
      }

      filled.forEach((item) => {
        const texts = Array.isArray(item.text) ? item.text : [item.text];
        texts.forEach((t) => {
          const idx = queue.indexOf(t);
          if (idx !== -1) queue.splice(idx, 1);
        });
      });
      rows.push(filled);
    }
  }

  // const debugData = rows.map((row) =>
  //   row.map((item) => {
  //     if (Array.isArray(item.span)) {
  //       return (item.text as string[]).map((t, idx) => ({
  //         col: (item.span as number[])[idx],
  //         string_length: t.length,
  //       }));
  //     } else {
  //       return {
  //         col: item.span as number,
  //         string_length: (item.text as string).length,
  //       };
  //     }
  //   }),
  // );
  // console.log("[Final Bento Layout]:", JSON.stringify(debugData, null, 2));

  return rows;
}
