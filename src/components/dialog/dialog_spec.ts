import {componentSanityCheck} from "../../platform/testing/util";

export function main() {
  let template = `
  <md-dialog>
    <md-dialog-title>Title</md-dialog-title>
    Content!
  </md-dialog>`;
  componentSanityCheck('Dialog', 'md-dialog', template);
}

