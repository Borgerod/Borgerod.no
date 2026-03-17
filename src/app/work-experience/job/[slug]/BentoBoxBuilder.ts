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

export type BentoInput = string[];

export function BentoBoxBuilder(
  items: BentoInput,
  isHalved = false,
): BentoItemDef[][] {
  const seed = items.reduce((acc, item) => acc + item.length, 0);
  let s = seed;
  function rand(): number {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  }

  function getMinSpan(item: string): number {
    if (isHalved) {
      if (item.length >= 80) return 2;
      return 1;
    }
    if (item.length >= 200) return 4;
    if (item.length >= 80) return 2;
    return 1;
  }

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
  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }

  function layoutKey(l: (number | number[])[]): string {
    const flatL = l.map((v) => (Array.isArray(v) ? 1 : v));
    const g = flatL.reduce((acc, v) => gcd(acc, v));
    return flatL.map((v) => v / g).join("-");
  }

  function stringFitsRowLayout({
    bentoItem,
    threshold = 0.05,
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

    function effectiveLength(str: string): number {
      const words = str.split(/\s+/).filter((w) => w.length > 0);
      const longestWord = Math.max(...words.map((w) => w.length));
      return Math.max(str.length, longestWord * 2.5);
    }

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

    for (let i = 0; i < layoutWeights.length; i++) {
      const diff = Math.abs(layoutWeights[i] - stringWeights[i]);
      if (diff > threshold) {
        return false;
      }
    }

    return true;
  }

  function tryFill(
    layout: (number | number[])[],
    available: string[],
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

      if (stringFitsRowLayout({ bentoItem: row })) return row;
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

  while (queue.length > 1) {
    let placed = false;
    const currentPool = shuffle([...layouts]);
    for (let i = 0; i < currentPool.length; i++) {
      const result = tryFill(currentPool[i], queue);
      if (result) {
        result.forEach((item) => {
          const texts = Array.isArray(item.text) ? item.text : [item.text];
          texts.forEach((t) => {
            const idx = queue.indexOf(t);
            if (idx !== -1) queue.splice(idx, 1);
          });
        });
        previousRowLayout = currentPool[i];
        rows.push(result);
        placed = true;
        break;
      }
    }
    if (!placed) {
      break;
    }
  }

  const isolatedLayouts: [number, number][] = [
    [3, 1],
    [1, 3],
    [1, 2],
    [2, 1],
    [1, 1],
  ];

  while (queue.length > 0) {
    if (queue.length === 1) {
      const forcedSpan = isHalved ? 2 : 4;
      rows.push([{ text: queue.splice(0, 1)[0], span: forcedSpan }]);
      break;
    }

    let placed = false;
    for (const [spanA, spanB] of isolatedLayouts) {
      if (
        previousRowLayout.length > 0 &&
        layoutKey(previousRowLayout) === layoutKey([spanA, spanB])
      )
        continue;
      const permutations: [string, string][] = [
        [queue[0], queue[1]],
        [queue[1], queue[0]],
      ];
      for (const [textA, textB] of permutations) {
        if (getMinSpan(textA) > spanA || getMinSpan(textB) > spanB) continue;
        const candidate: BentoItemDef[] = [
          { text: textA, span: spanA },
          { text: textB, span: spanB },
        ];
        if (stringFitsRowLayout({ bentoItem: candidate, threshold: 0.2 })) {
          rows.push(candidate);
          previousRowLayout = [spanA, spanB];
          queue.splice(0, 2);
          placed = true;
          break;
        }
      }
      if (placed) break;
    }

    if (!placed) {
      const forcedSpan = isHalved ? 1 : 2;
      rows.push([
        { text: queue[0], span: forcedSpan },
        { text: queue[1], span: forcedSpan },
      ]);
      queue.splice(0, 2);
    }
  }

  return rows;
}
/*! DEBUGGER dont remove this */
// function DebuggerStringFitsRowLayout(params: {
//   spans: (number | number[])[];
//   nestedStrings: (string | string[])[];
//   nestedStringWeights: (number | number[])[];
//   nestedLayoutWeights: (number | number[])[];
//   nestedWeightDiffs: (number | number[])[];
//   threshold: number;
//   nestedResults: (boolean | boolean[])[];
//   isRowValid: boolean;
// }): void {
//   console.log("[Bento Debugger]:", {
//     layout: params.spans,
//     strings: params.nestedStrings,
//     stringWeights: params.nestedStringWeights,
//     layoutWeights: params.nestedLayoutWeights,
//     weightDiffs: params.nestedWeightDiffs,
//     threshold: params.threshold,
//     layoutFitResults: params.nestedResults,
//     verdict: {
//       results: params.isRowValid
//         ? "VALID - ADDED TO BENTO"
//         : "INVALID - REJECTED",
//     },
//   });
// }
