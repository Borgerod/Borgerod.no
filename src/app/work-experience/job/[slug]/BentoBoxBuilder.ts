/*
Description: 
  This is basicly a brute force solution to the problem. 
  The purpose of this function is organizing a dataset of strings into a dynamic bentobox grid,
  it does this through a try-and-see-if-it-fits approach (hence why i call it brute force).

Elaborating: 
  BentoBoxBuilder takes an array of strings and arranges them into rows of "bento cells",
  where each cell has a text value and a col-span number.

  It picks layouts (predefined span combinations like [2,1] or [1,[1,2]]) that best match
  the proportional lengths of the strings — so longer strings get wider cells.

  It uses a seeded pseudo-random shuffle to vary layout selection, avoids repeating the
  same layout structure twice in a row, and falls back to simpler 2-cell rows if no layout fits.
*/
/* Todos & dev-comments:
todo [ ]: convert static list into generator.
todo [ ]: consider refactoring "last-two-items-handler" since it consists of duplication code, consider merging it with BentoboxBuilder, making it a variant/branch.
todo [ ]: Explore how adding auto's will change the layout e.g; "row-span-auto" and "grid-rows-auto". It might fix a few things.
todo [ ]: Explore simplifying the algorithm by: 
          1. sorting strings big to short, or 
          2. spit them up into them into size groups. 
          Then you would be more in controll over what to assign where, 
            which reliefs you from having to use the brute force try-and-see-if-it-fits method.
          Then the algorithm will work closer to this: 
            when making lets say a "[3, [1,2]]" row, it would; 
            - pick the biggest from the 'big-strings', then the biggest from 'medium-strings' and 'small-strings',
              untill it has found a combo that matches the layoutWeights.
            - so basicly it will start with the biggest strings, 
              and will try to empty 'big-strings' before the other two.
          Finally after that it will shuffle them around. 
            So that it does not look like the strings in bentobox 
            are sorted from biggest to smallest, which would look funny.

          this would also potentially relief the code from having to use the "last-two-items-handler". 
          since the last items in queue are hopefully only small and medium strings it should be alot easier to make them fit, 
          so cases where "last-two-items-handler" is needed should be significantly lower.
          and if it ìs needed, then it should be a easy merge.
*/

export type BentoItemDef = {
  text: string | string[];
  span: number | number[];
};

export type BentoRow = {
  items: BentoItemDef[];
  gridTemplateColumns: string; // e.g., "2fr 1fr"
};

export type BentoInput = string[];

export function BentoBoxBuilder(
  items: BentoInput,
  isHalved = false,
): BentoRow[] {
  const seed = items.reduce((acc, item) => acc + item.length, 0);
  let s = seed;
  function rand(): number {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  }

  const thresholdSteps = [0.05, 0.08, 0.12, 0.17, 0.22];

  const allLayouts: (number | number[])[][] = [
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

  const halvedLayouts: (number | number[])[][] = [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [3, 1],
    [3, [1, 1]],
    [[1, 1], 3],
    [2, [1, 1]],
    [[1, 1], 2],
    [1, [1, 1]],
    [[1, 1], 1],
    [1, [3, 1]],
    [[3, 1], 1],
    [1, [1, 3]],
    [[1, 3], 1],
    [1, [1, 2]],
    [[1, 2], 1],
    [1, [2, 1]],
    [[2, 1], 1],
    [1, [1, 1]],
    [[1, 1], 1],
  ];

  const layouts = isHalved ? halvedLayouts : allLayouts;

  function effectiveLength(str: string): number {
    const words = str.split(/\s+/).filter((w) => w.length > 0);
    if (words.length === 0) return 1;
    const longestWord = Math.max(...words.map((w) => w.length));
    let lines = 1;
    let lineLen = 0;
    for (const word of words) {
      if (lineLen === 0) {
        lineLen = word.length;
      } else if (lineLen + 1 + word.length <= longestWord) {
        lineLen += 1 + word.length;
      } else {
        lines++;
        lineLen = word.length;
      }
    }
    return longestWord * lines;
  }

  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  function layoutKey(l: (number | number[])[]): string {
    const outerSpans = l.map((v) => (Array.isArray(v) ? 1 : v));
    const outerG = outerSpans.reduce((acc, v) => gcd(acc, v));
    const normalizedOuter = outerSpans.map((v) => v / outerG);
    const parts = l.map((v, i) => {
      if (Array.isArray(v)) {
        const innerG = v.reduce((acc, x) => gcd(acc, x));
        const normalizedInner = v.map((x) => x / innerG).join(",");
        return `${normalizedOuter[i]}(${normalizedInner})`;
      }
      return `${normalizedOuter[i]}`;
    });
    return parts.join("|");
  }

  function getNestedSide(
    layout: (number | number[])[],
  ): "left" | "right" | null {
    if (layout.length === 0) return null;
    const firstIsNested = Array.isArray(layout[0]);
    const lastIsNested = Array.isArray(layout[layout.length - 1]);
    if (firstIsNested && !lastIsNested) return "left";
    if (lastIsNested && !firstIsNested) return "right";
    return null;
  }

  function stringFitsRowLayout({
    bentoItem,
    threshold = 0.05, // doesnt seem to be doing anything. this will allways return negative
  }: {
    bentoItem: BentoItemDef[];
    threshold?: number;
  }): boolean {
    const row = bentoItem;
    const strings: string[] = [];
    row.forEach((item) => {
      if (Array.isArray(item.text)) {
        strings.push(...item.text);
      } else {
        strings.push(item.text);
      }
    });

    const totalStrLen = strings.reduce((acc, s) => acc + effectiveLength(s), 0);
    const stringWeights = strings.map((s) => effectiveLength(s) / totalStrLen);

    const spans = row.map((r) => r.span);
    const totalOuterSpan = spans.reduce<number>(
      (acc, s) => acc + (Array.isArray(s) ? 1 : s),
      0,
    );
    const layoutWeights = spans.flatMap((s) => {
      if (Array.isArray(s)) {
        const outerW = 1 / totalOuterSpan;
        const innerTotal = s.reduce((a, b) => a + b, 0);
        return s.map((v) => outerW * (v / innerTotal));
      }
      return [s / totalOuterSpan];
    });

    // 1. Proportional difference check
    for (let i = 0; i < layoutWeights.length; i++) {
      const diff = Math.abs(layoutWeights[i] - stringWeights[i]);
      if (diff > threshold) {
        return false;
      }
    }

    // 2. Bias against extreme span ratios
    const spanValues = spans.flatMap((s) => (Array.isArray(s) ? s : [s]));
    const maxSpan = Math.max(...spanValues);
    const minSpan = Math.min(...spanValues);
    const spanRatio = maxSpan / minSpan;

    // if (spanRatio >= 2.5) {
    if (spanRatio >= 2.5) {
      const maxStringWeight = Math.max(...stringWeights);
      const minStringWeight = Math.min(...stringWeights);
      const stringRatio = maxStringWeight / minStringWeight;

      // Special extra bias for rows with a nested group containing 2 or fewer items
      const hasNestedGroup = spans.some((s) => Array.isArray(s));
      if (hasNestedGroup && row.length === 2) {
        // One cell is nested, the other is single. Nested group likely has ≤2 items.
        // Require string ratio ≥4.0 to allow 3:1 layout (instead of 3.5)
        if (stringRatio < 4.5) {
          return false;
        }
      } else {
        // Default bias: require string ratio ≥3.5 for any 3:1 layout
        if (stringRatio < 3.5) {
          return false;
        }
      }
    }

    return true;
  }

  function tryFill(
    layout: (number | number[])[],
    available: string[],
    threshold = 0.05,
  ): BentoItemDef[] | null {
    if (
      previousRowLayout.length > 0 &&
      layoutKey(previousRowLayout) === layoutKey(layout)
    ) {
      return null;
    }
    const cellsCount = layout.reduce<number>(
      (acc, val) => acc + (Array.isArray(val) ? val.length : 1),
      0,
    );
    if (cellsCount > available.length) return null;

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

    function* permutations<T>(arr: T[]): Generator<T[]> {
      if (arr.length <= 1) {
        yield [...arr];
        return;
      }
      for (let i = 0; i < arr.length; i++) {
        const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
        for (const perm of permutations(rest)) {
          yield [arr[i], ...perm];
        }
      }
    }

    for (const combo of combinations(available.length, cellsCount)) {
      const selected = combo.map((idx) => available[idx]);
      const sortedStrings = [...selected].sort(
        (a, b) => effectiveLength(b) - effectiveLength(a),
      );

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

      flatLayout.sort((a, b) => {
        if (a.isNested !== b.isNested) return a.isNested ? 1 : -1;
        return b.span - a.span;
      });

      for (const permutation of permutations(sortedStrings)) {
        const assigned: { [key: string]: string | string[] } = {};
        flatLayout.forEach((cell, idx) => {
          if (cell.nestedIdx !== null) {
            const key = `${cell.parentIdx}`;
            if (!assigned[key]) assigned[key] = [];
            (assigned[key] as string[])[cell.nestedIdx] = permutation[idx];
          } else {
            assigned[`${cell.parentIdx}`] = permutation[idx];
          }
        });

        const row: BentoItemDef[] = layout.map((spanDef, i) => {
          if (Array.isArray(spanDef)) {
            return { text: assigned[`${i}`], span: spanDef };
          } else {
            return { text: assigned[`${i}`], span: spanDef };
          }
        });

        if (stringFitsRowLayout({ bentoItem: row, threshold })) return row;
      }
    }
    return null;
  }

  const rows: BentoItemDef[][] = [];
  const queue = [...items];
  function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  let previousRowLayout: (number | number[])[] = [];
  let previousNestedSide: "left" | "right" | null = null;

  function outerSpans(layout: (number | number[])[]): number[] {
    return layout.map((v) => (Array.isArray(v) ? 1 : v));
  }

  function hasSameStartProfile(
    prev: (number | number[])[],
    curr: (number | number[])[],
  ): boolean {
    if (prev.length === 0) return false;
    const ps = outerSpans(prev);
    const cs = outerSpans(curr);
    const prevSign = Math.sign(ps[0] - ps[ps.length - 1]);
    const currSign = Math.sign(cs[0] - cs[cs.length - 1]);
    return prevSign === currSign;
  }

  // Helper to attempt placing a row using a given list of layouts
  function tryPlaceWithLayouts(
    layoutsToTry: (number | number[])[][] | [number, number][],
    queue: string[],
    rows: BentoItemDef[][],
    isFallback = false,
  ): boolean {
    for (const threshold of thresholdSteps) {
      for (const layout of layoutsToTry) {
        // Skip if layout repeats previous row layout
        if (
          previousRowLayout.length > 0 &&
          layoutKey(previousRowLayout) ===
            layoutKey(layout as (number | number[])[])
        ) {
          continue;
        }

        let result: BentoItemDef[] | null = null;
        if (!isFallback) {
          result = tryFill(layout as (number | number[])[], queue, threshold);
        } else {
          // Fallback: only 2‑cell layouts, we build candidate manually
          const [spanA, spanB] = layout as [number, number];
          for (const [textA, textB] of [
            [queue[0], queue[1]],
            [queue[1], queue[0]],
          ]) {
            const candidate: BentoItemDef[] = [
              { text: textA, span: spanA },
              { text: textB, span: spanB },
            ];
            if (stringFitsRowLayout({ bentoItem: candidate, threshold })) {
              result = candidate;
              break;
            }
          }
        }
        if (!result) continue;

        // --- Layout accepted – apply mirror and nested‑side rules ---
        let candidateLayout = layout as (number | number[])[];
        let shouldMirror = hasSameStartProfile(
          previousRowLayout,
          candidateLayout,
        );
        const mirroredLayout = [...candidateLayout].reverse();

        // Prevent repeating the same directional pattern
        if (
          shouldMirror &&
          hasSameStartProfile(previousRowLayout, mirroredLayout)
        ) {
          continue;
        }

        const candidateNestedSide = getNestedSide(candidateLayout);
        if (
          previousNestedSide !== null &&
          candidateNestedSide === previousNestedSide
        ) {
          const mirroredNestedSide = getNestedSide(mirroredLayout);
          if (mirroredNestedSide === previousNestedSide) {
            continue; // mirroring doesn't help, skip
          } else {
            shouldMirror = true;
            candidateLayout = mirroredLayout;
          }
        }

        const finalRow = shouldMirror ? [...result].reverse() : result;
        const finalLayout = shouldMirror ? candidateLayout : candidateLayout;

        // Remove used strings from queue
        finalRow.forEach((item) => {
          const texts = Array.isArray(item.text) ? item.text : [item.text];
          texts.forEach((t) => {
            const idx = queue.indexOf(t);
            if (idx !== -1) queue.splice(idx, 1);
          });
        });

        previousRowLayout = finalLayout;
        previousNestedSide = getNestedSide(finalLayout);
        rows.push(finalRow);
        return true; // row placed
      }
    }
    return false; // no layout worked
  }

  // Main loop
  while (queue.length > 1) {
    // First try the rich full layouts
    const currentPool = shuffle([...layouts]);
    if (tryPlaceWithLayouts(currentPool, queue, rows, false)) continue;

    // Then try simple 2‑column fallback layouts
    const isolatedLayouts: [number, number][] = [
      [2, 1],
      [1, 2],
      [3, 1],
      [1, 3],
      [1, 1],
    ];
    if (tryPlaceWithLayouts(isolatedLayouts, queue, rows, true)) continue;

    // If still nothing fits, force a row
    const forcedSpan = isHalved ? 1 : 2;
    rows.push([
      { text: queue[0], span: forcedSpan },
      { text: queue[1], span: forcedSpan },
    ]);
    queue.splice(0, 2);
    previousRowLayout = [forcedSpan, forcedSpan];
    previousNestedSide = null;
  }

  // Handle the last single item (if any)
  if (queue.length === 1) {
    const forcedSpan = isHalved ? 2 : 4;
    rows.push([{ text: queue[0], span: forcedSpan }]);
    previousNestedSide = null;
  }
  // Convert rows to BentoRow[] with gridTemplateColumns
  const rowsWithFr: BentoRow[] = rows.map((row) => {
    const frValues: number[] = row.map((item) => {
      if (Array.isArray(item.span)) {
        return 1;
      }
      return item.span;
    });
    const gridTemplateColumns = frValues.map((v) => `${v}fr`).join(" ");
    return { items: row, gridTemplateColumns };
  });

  return rowsWithFr;
}
