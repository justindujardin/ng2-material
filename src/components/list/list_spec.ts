import {componentSanityCheck} from "../../platform/testing/util";

export function main() {
  let template = `
    <md-list>
      <md-list-item class="md-2-line">
        <img/>
        <div class="md-list-item-text">
          <h3>Title</h3>
          <p>Secondary text</p>
        </div>
      </md-list-item>
    </md-list>
  `;
  componentSanityCheck('List', 'md-list', template);
  componentSanityCheck('List Item', 'md-list-item', template);
}

