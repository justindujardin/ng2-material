import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

interface ITodo {
  face: string;
  what: string;
  who: string;
  notes: string;
}

@Component({
  selector: 'toolbar-scroll-shrink',
  templateUrl: 'examples/components/toolbar/scroll_shrink.html',
  styleUrls: ['examples/components/toolbar/scroll_shrink.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export default class ToolbarScrollShrink {
  title: string = 'My App Title';
  imagePath: string = 'public/images/avatars/avatar5.svg';
  todos: ITodo[] = [];

  constructor() {
    for (var i = 0; i < 15; i++) {
      this.todos.push({
        face: this.imagePath,
        what: "Brunch this weekend?",
        who: "Min Li Chan",
        notes: "I'll be in your neighborhood doing errands."
      });
    }
  }

}
