import {componentSanityCheck} from "../../platform/testing/util";

export function main() {
  let template = `
  <md-card>
    <md-card-title>Title</md-card-title>
    Content!
  </md-card>`;
  componentSanityCheck('Card', 'md-card', template);
}

