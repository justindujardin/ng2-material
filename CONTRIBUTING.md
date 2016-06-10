Contributing
------------

1. [How to contribute](#how-to-contribute)
    * [Reporting a bug](#reporting-a-bug)
    * [Writing a pull request](#writing-a-pull-request)
2. [Writing a component](#writing-a-component)
    * [Component declaration](#component-declaration)
    * [Building an example](#building-an-example)
    * [Write some Tests](#write-some-tests)
3. [Documentation](#documentation)

## How to contribute

If you are reading this you probably want to contribute, so thanks! Maintaining an open-source project is hard work and any help is welcome.

### Reporting a bug

If you find a bug, before reporting it, check if it's not [already reported][issues].  

If you're the first one to report it, please, follow those recommendations: 
- Write a clear and precise title
- Write a description which contain a scenario on how to reproduce the bug. Feel free to post a link to [Plunker][plunker]
- You'll never be too precise so don't hesitate to give more informations: OS, browser, ...

### Writing a pull request

Fork the [ng2-material][ng2-material] project and work on your own fork.  
You have to work on a branch with a clear name (feature/writing-how-to-contribute for example). Prefix your branch by "feature" (for new feature) and "hotfix" (for issue resolving) is a good practice.

When your work is done:
 
- Be sure that all tests pass.
- Squash your commits to one commit and follow those recommandations about [writing good commit message][writing-good-commit-message]
- Build a pull request via github from your yourFork/yourBranch to the ng2-material/master branch
 

## Writing a component

### Component declaration

#### Component

Let's say I want to declare a new awesome component.

First, I create it in `ng2-material/components/` directory as I do with every Angular2 Component.

```
# ng2-material/components/awesome_stuff/awesome_stuff.ts

import {Component} from "angular2/core";

@Component({
  selector: 'md-awesome-stuff',
  template: `Let's do it!`
})
export class MdAwesomeStuff {
}
```

> Remember that I said my component was awesome, not useful.

Then, you edit `ng2-material/all.ts` to import it in the package.
```
# ng2-material/all.ts

[...]
import {MdTabs, MdTab} from "./components/tabs/tabs";
import {Media} from "./core/util/media";

import {MdAwesomeStuff} from './components/awesome_stuff/awesome_stuff';

[...]
export * from './core/util/animate';

export * from './components/awesome_stuff/awesome_stuff';

/**
 * Collection of Material Design component directives.
 */
export const MATERIAL_DIRECTIVES: Type[] = CONST_EXPR([
  [...]
  MdTab, MdTabs,
  MdAwesomeStuff
]);
```

#### Component stylesheet
If your component embed style, it differ a bit of classic stylesheet integration in Angular2 Component.

Create your SASS file in your component directory 
```
# ng2-material/components/awesome_stuff/awesome_stuff.scss

md-awesome-stuff { font-size: 1.5em; }
```

> Feel free to import palettes, mixins, variables and whatever you want of the core stylesheets. You can find them in `ng2-material/core/style/` 

Now you can import it in `ng2-material/components.scss`
```
# ng2-material/components.scss

[...]
@import "components/awesome_stuff/awesome_stuff";
```

#### Component documentation
You can write some documentation about your component in a `README.md` file to explain how it works, what is exposed, etc.
```
# ng2-material/components/awesome_stuff/README.md

MdAwesomeComponent
------------------

This one is magic guys, you only have to use a `<md-awesome-stuff></md-awesome-stuff>` markup and he guess what you want.
```

### Building an example

Now it's time to expose your awesome work to the world. Let's build an example in `examples/components` directory
```
# examples/components/awesome_stuff/basic_usage.ts

import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {MdAwesomeStuff} from 'ng2-material/components/awesome_stuff/awesome_stuff';

@Component({
  selector: 'awesome-stuff-basic-usage',
  templateUrl: 'examples/components/awesome_stuff/basic_usage.html',
  directives: [MATERIAL_DIRECTIVES]
})
export default class AwesomeStuffBasicUsage {}
```

and let's say we need an external template too
```
# examples/components/awesome_stuff/basic_usage.html

<md-awesome-stuff></md-awesome-stuff>
```

The last step is to include your example component in the Example app
```
# examples/all.ts

[...]
import SidenavBasicUsage from "./components/sidenav/basic_usage";
import AwesomeStuffBasicUsage from "./components/awesome_stuff/basic_usage";

/**
 * Collection of Material Design component example directives.
 */
export const DEMO_DIRECTIVES: Type[] = CONST_EXPR([
  [...]
  WhiteframeBasicUsage,
  AwesomeStuffBasicUsage
]);
```

And that's it! Now you run the Example app via `grunt serve` command, you can see the result of your hard work by accessing [http://localhost:9000](http://localhost:9000)

### Write some Tests

Don't forget to write tests about your component. Even if it's pretty awesome, it could help to avoid regression in the future.
Follow recommandations about [writing test in angular2][writing-test].
There is an npm script for Test Driven Development: `npm run tdd`, which can be helpful.
When your tests pass and only after that, you can [propose a pull request](#how-to-contribute)



## Documentation
[Writing test in Angular 2][writing-test]

[ng2-material]: https://github.com/justindujardin/ng2-material/
[issues]: https://github.com/justindujardin/ng2-material/issues
[plunker]: https://plnkr.co/edit/?p=catalogue
[writing-good-commit-message]: https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines
[writing-test]: https://medium.com/google-developer-experts/angular-2-unit-testing-with-jasmine-defe20421584#.ymzbmrloz
