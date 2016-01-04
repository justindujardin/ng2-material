import {componentSanityCheck} from "../../util";

export function main() {
  let template = `
    <md-grid-list cols="4" row-height="50px" gutter-size="2em" id="complex">
      <md-grid-tile rowspan="1" colspan="2"> Tile #1 </md-grid-tile>
      <md-grid-tile rowspan="1" colspan="1"> Tile #2 </md-grid-tile>
      <md-grid-tile rowspan="3" colspan="1"> Tile #3 </md-grid-tile>
      <md-grid-tile rowspan="2" colspan="2"> Tile #4 </md-grid-tile>
      <md-grid-tile rowspan="1" colspan="3"> Tile #5 </md-grid-tile>
    </md-grid-list>
  `;
  componentSanityCheck('Grid List', 'md-grid-list', template);
}

