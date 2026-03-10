export type BentoItemDef = {
  text: string | string[];
  span: number | number[];
};

export type BentoInput = string[];

function DebuggerStringFitsRowLayout(params: {
  spans: (number | number[])[];
  nestedStrings: (string | string[])[];
  nestedStringWeights: (number | number[])[];
  nestedLayoutWeights: (number | number[])[];
  nestedWeightDiffs: (number | number[])[];
  threshold: number;
  nestedResults: (boolean | boolean[])[];
  isRowValid: boolean;
}): void {
  console.log("[Bento Debugger]:", {
    layout: params.spans,
    strings: params.nestedStrings,
    stringWeights: params.nestedStringWeights,
    layoutWeights: params.nestedLayoutWeights,
    weightDiffs: params.nestedWeightDiffs,
    threshold: params.threshold,
    layoutFitResults: params.nestedResults,
    verdict: {
      results: params.isRowValid
        ? "VALID - ADDED TO BENTO"
        : "INVALID - REJECTED",
    },
  });
}

export function BentoBoxBuilder(items: BentoInput): BentoItemDef[][] {
  // export function BentoBoxBuilder(items: string[]): BentoItemDef[][] {
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

  function stringFitsRowLayout(row: BentoItemDef[]): boolean {
    const threshold = 0.05;

    function getWeights(spans: (number | number[])[]): number[] {
      /* Detailed description of stringFitsRowLayout      
            goal: To check if the strings assigned to the rowLayout does not fits the shape if rowLayout.
            context: {
                row: the row input: {row: BentoItemDef[]} for stringFitsRowLayout(),
                rowLayout: row, but talking about the layout itself; the bentobox layout for the row input: {row: BentoItemDef[]}, e.g.: '[2,[2,1]]',
                box:term for the "containers" inside rowLayout,
                string(s):the text-value that has been assigned to a layout-box in row.
                item:(not to be confused with the BentoBoxBuilder's '{items: BentoInput}'), 'item' an iteration of row and its sub-items, range 1-4,
                parentCard: the Card component that is containing the whole bentoBox. (is either AchievementCard or ResponsibilityCard)
                widthConstraint:{
                    is limit that is core to this function, and is the limitation presented by the width value of parentCard.
                    'widthConstraint' is based on totalLengthOfBentoInput: BentoInput = {job.achievements or job.responsibilities} 
                    totalLengthOfBentoInput is a value from LayoutBuilder and it dictates if parentCard is places on a 2-col-grid=>half_width=width/2 or a 1-col-grid=>full_width=width/2.
                    *(NOTE: maybe we should add some padding values to this aswell, but well try that later).
                },
            }

            description: {iterate row (item) -> then for each (item), check if the string that has been assigned to box in rowLayout: 
                When taking the context of 'the other boxes containing their designated strings' into account, 
                and by also taking [parentCard's padding, row's gap, and sibling box-padding, as well as its own padding] into account; 
                    -> "does it lead to the string wrapping too much?" or/and "does not create big gaps?".

                *It could potentially do this check by doing this:
                (1) by first taking the rowLayout (e.g."[2,[2,1]]") and create weights (layoutWeights) out of it.
                    layoutWeights: a percentage value based on the shape or rowLayout.
                (2) then create weights (stringtWeights) from the strings as well.
                    stringtWeights: how big the strings are compared to each other.
                    
                (3) check if the 'designated strings' fits the 'rowLayout' by; comparing these two lists to each other.  
                    - the stringtWeights, indicates: how big a string needs to be copared to the other strings.
                    - the layoutWeights, indicates: what the size differences needs to be in order for the layout to "fit". 

                example: 
                    rowLayout = [2,[2,1]]
                    strings = [
                        "xxxyyzzz",
                        "xxx",
                        "yy",
                    ]
                    this will yield the weights: 
                    (A) calculating-layoutWeights:{
                        (1) get mainArray weights: 
                            [2,[2,1]] -> subArrays counts as 1 for mainArray items.
                            = [x,y]
                            = [2,1] <- remember, this is a ratio (2:1), not a fraction (2/1).  
                            = (a:b) = (2:1) = (1*a)/(a+b) = (1*2)/(2+1) = 2/3 convert ratio to fraction
                            = 2/3 = [x,y]
                            = [
                            x = (2/3) = 0.6666666666666667,
                            y = (1-0.6666666666666667) = 0.3333333333333333
                            ]
                            ==> MainWeights = [x,y] = [ 0.6666666666666667, 0.3333333333333333]

                        (2) get subArray weights:
                            [2,[2,1]] => [_,[2,1]] = [[2,1]] = [2,1] <- extract subArray
                            = [x,y]
                            = [2,1] <- remember, this is a ratio (2:1), not a fraction (2/1).  
                            = (a:b) = (2:1) = (1*a)/(a+b) = (1*2)/(2+1) = 2/3 convert ratio to fraction
                            = 2/3 = [x,y]
                            = [
                            x = (2/3) = 0.6666666666666667,
                            y = (1-0.6666666666666667) = 0.3333333333333333
                            ]
                            ==> subWeights = [x,y] = [ 0.6666666666666667, 0.3333333333333333]

                        (3) merge values into layout.
                        layoutWeights = [MainWeights,[subWeights]] //note: this is not correct lay to write it
                        = [2,1[2,1]]
                        = [2, (1*[2,1])]
                        = [ 0.6666666666666667, (0.3333333333333333*[ 0.6666666666666667, 0.3333333333333333])]
                        = [ 0.6666666666666667, (0.3333333333333333*[ 0.6666666666666667, 0.3333333333333333])]
                        == layoutWeights = [0.6666666666666667, [0.2222222222222222, 0.1111111111111111]]
                    }
                    (B) calculating-stringWeights:{
                    //* ORIGINAL WAY FOR GETTIN stringWeights
                        (1) get length of strings
                            strings = [
                                    "xxxyyzzz", (string.length -> len:8)
                                    "xxx",      (string.length -> len:3)
                                    "yy",       (string.length -> len:2)
                                ]
                            strings = [
                                8,
                                3,
                                2,
                            ]
                        (2) convert to percentage
                            totalLength = sum(strings) = 8+3+2 = 13

                            strings = [
                                8 / totalLength = 0.6153846153846154,
                                3 / totalLength = 0.2307692307692308,
                                2 / totalLength = 0.1538461538461538,
                            ]
                        == stringWeights = [0.6153846153846154, [0.2307692307692308, 0.1538461538461538]]

                    //! ALTERNATIVE WAY IF GETTING stringWeights
                    //! IF I NEED TO DO IT LIKE THE OTHER ONE (I DONT BELIEVE THIS IS THE CORRECT WAY)
                        (1) get length of strings
                            strings = [
                                    "xxxyyzzz", (string.length -> len:8)
                                    "xxx",      (string.length -> len:3)
                                    "yy",       (string.length -> len:2)
                                ]
                            strings = [
                                8,
                                3,
                                2,
                            ]
                        (2.1) get mainWeights
                                totalLength = sum(strings) = 8+1 = 9
                                mainArray = [
                                    8 / totalLength = 0.8888888888888889,
                                    subArray = 1 / totalLength = 0.1111111111111111
                                ]
                            (2.2) get subWeights
                                totalLength = sum(strings) = 2+3 = 5
                                subArray = [ 
                                    mainArray = _ 
                                    3 / totalLength = 0.6,
                                    2 / totalLength = 0.4,
                                ]
                            (3) merge array Weights
                                stringWeights = [MainWeights,[subWeights]] //note: this is not correct lay to write it
                                        = ["xxxyyzzz"["xxx","yy"]]
                                        MainWeights = [a,b] = [8,subWeights] = [8,1]
                                        subWeights = [x,y] = [3,2]
                                        = [a,b[x,y]]
                                        = [a,(b*[x,y])]
                                        = [8,(1*[3,2])]
                                        = [0.8888888888888889 ,(0.1111111111111111 *[0.6 ,0.4 ])]
                                    == stringWeights = [0.8888888888888889 ,[0,0666666666666667 , 0.0444444444444444]]
                                    
                            == stringWeights = [0.6153846153846154, [0.2307692307692308, 0.1538461538461538]]
                    }

                (B) comparing-weights:{
                (1) set a threshold (a valid fit is within this threshold). 
                    threshold = 0.05 // 5%
                (2) compare weights against threshold. 
                    layoutWeights = [0.6666666666666667, [0.2222222222222222, 0.1111111111111111]]
                    stringWeights = [0.6153846153846154, [0.2307692307692308, 0.1538461538461538]]
                    weightDiffs   = [(0.6666666666666667-0.6153846153846154), [(0.2222222222222222-0.2307692307692308), (0.1111111111111111-0.1538461538461538)]]
                    weightDiffs   = [(0.0512820512820513), [(-0.0085470085470086), (-0.0427350427350427)]]
                    _someIteratorThatDoesThis{
                        if (diff >= threshold || diff >= -threshold){
                        return false
                        }
                    }
                    return true //if all diffs are smaller or equal to threshold return true. 
                    as you can see by this example. the strings=["xxxyyzzz","xxx","yy",] "fits" the rowLayout = [2,[2,1]].
                    therefore, the rowlayout is valid and will be added  to BentoItemDef. (as a row that will be returned by BentoBoxBuilder)

                    //(ALT)
                    this is a method using the ALT method, but it is not yielding the same results, so it might be the wrong way to do it, or it is the correct way. I dont know, maybe you do. 
                    stringWeights (ALT) = [0.8888888888888889, (0.1111111111111111 *[0.6 ,0.4 ])]
                    layoutWeights (ALT) = [0.6666666666666667, (0.3333333333333333*[ 0.6666666666666667, 0.3333333333333333])]

                                        == [0,8888888888888889-0,6666666666666667, (0,1111111111111111-0,3333333333333333 *[0,6-0,6666666666666667 ,0,4-0,3333333333333333 ])]
                                        == [0,2222222222222222, (-0,2222222222222222*[ -0,0666666666666667, 0,0666666666666667])]
                                        == [(0.8888888888888889-0.6666666666666667), ((0.1111111111111111-0.3333333333333333) *[(0.6-0.6666666666666667) ,(0.4-0.3333333333333333) ])]
                                        == [0.2222222222222222, (-0.2222222222222222*[ -0.0666666666666667, 0.0666666666666667])]
                }
            } 
        */
      const flattened: number[] = [];
      const mainTotal = spans.reduce<number>(
        (acc, s) => acc + (Array.isArray(s) ? 1 : s),
        0,
      );

      spans.forEach((s) => {
        if (Array.isArray(s)) {
          const subTotal = s.reduce((a, b) => a + b, 0);
          const parentWeight = 1 / mainTotal;
          s.forEach((subSpan) => {
            flattened.push(parentWeight * (subSpan / subTotal));
          });
        } else {
          flattened.push(s / mainTotal);
        }
      });
      return flattened;
    }

    const strings: string[] = [];
    row.forEach((item) => {
      if (Array.isArray(item.text)) {
        strings.push(...item.text);
      } else {
        strings.push(item.text);
      }
    });

    const totalStrLen = strings.reduce((acc, s) => acc + s.length, 0);
    const stringWeights = strings.map((s) => s.length / totalStrLen);

    const spans = row.map((r) => r.span);
    const layoutWeights = getWeights(spans);

    let flatIdx = 0;
    const structureNested = <T>(flat: T[]): (T | T[])[] => {
      return spans.map((s) => {
        if (Array.isArray(s)) {
          const sub = flat.slice(flatIdx, flatIdx + s.length);
          flatIdx += s.length;
          return sub;
        }
        return flat[flatIdx++];
      });
    };

    const flatDiffs = layoutWeights.map((lw, i) =>
      Math.abs(lw - stringWeights[i]),
    );
    const flatResults = flatDiffs.map((diff) => diff <= threshold);

    flatIdx = 0;
    const nestedStrings = structureNested(
      strings.map((s) => (s.length > 20 ? s.substring(0, 20) + "..." : s)),
    );
    flatIdx = 0;
    const nestedStringWeights = structureNested(stringWeights);
    flatIdx = 0;
    const nestedLayoutWeights = structureNested(layoutWeights);
    flatIdx = 0;
    const nestedWeightDiffs = structureNested(flatDiffs);
    flatIdx = 0;
    const nestedResults = structureNested(flatResults);

    const isRowValid = flatResults.every((res) => res);

    DebuggerStringFitsRowLayout({
      spans,
      nestedStrings,
      nestedStringWeights,
      nestedLayoutWeights,
      nestedWeightDiffs,
      threshold,
      nestedResults,
      isRowValid,
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

      if (stringFitsRowLayout(row)) return row;
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
