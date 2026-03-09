export default function DynamicArraySort(items: string[]): string[] {
  let itemsCount = 0;
  const threshold = 0.2; // percentage %
  const paddingSize = 5;
  const gapSize = 5;
  const BaseLimit =
    160 + paddingSize * 2 + gapSize * itemsCount + paddingSize * itemsCount * 2;
  const UpperLimit = 160 * (1 + threshold);
  const lowerLimit = 160 * (1 - threshold);
  const sortedRows = [];

  /*
    GOAL: 
        Estimate a limit of how the big the array.container is adjusting for gaps and paddings,
        then iterate items ('item') to find combinations of 'item's that fits inside UpperLimit and lowerLimit.
        would a item[n] with item.length = 120 fit inside a Card inside a [${BaseLimit}]px wide row. w/ wrapping taken into account?
        would a [item[n], item[n+x]] with item[n].length = 120 and item[n+x].length=60 fit inside a Card inside a [${BaseLimit}]px wide row. w/ wrapping taken into account?

        Then check if wrapping-big-item would create gap for smaller-item(s):
        if gap created is bigger than the height of two lines{
            would deminish the gap if we wrapped item[n+x] in a array[]: [item[n+x], ], then assumed that it was a vertical grid. then adding another item[n+y] to it?
            aka --> [ item[n], [ item[n+x], item[n+y] ] ]
        } 

    
    */

  return sortedRows;
}
