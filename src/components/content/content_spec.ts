import {componentSanityCheck} from "../../platform/testing/util";

export function main() {
  componentSanityCheck('Content', 'md-content', `<md-content>Content!</md-content>`);
}

