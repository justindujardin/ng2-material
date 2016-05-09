import {componentSanityCheck} from "../../platform/testing/util";

export function main() {
  componentSanityCheck('Switch', 'md-switch', `<md-switch checked="true"></md-switch>`);
}

