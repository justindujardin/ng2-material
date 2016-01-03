import {componentSanityCheck} from "../../util";

export function main() {
  let template = `<md-input-container><input md-input type="text"></md-input-container>`;
  componentSanityCheck('Input Container', 'md-input-container', template);
  componentSanityCheck('Input', 'input[md-input]', template);
}

