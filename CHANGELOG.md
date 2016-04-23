<a name="0.3.6"></a>
## [0.3.6](https://github.com/justindujardin/ng2-material/compare/v0.3.5...v0.3.6) (2016-04-17)


### Bug Fixes

* update messages when form validation status changes ([99df994](https://github.com/justindujardin/ng2-material/commit/99df994))

### Features

* make visibility input available for sidenav (#173) ([b735650](https://github.com/justindujardin/ng2-material/commit/b735650))
* **JetBrains:** free OS licenses of WebStorm for major contributors ([195ee4c](https://github.com/justindujardin/ng2-material/commit/195ee4c))



<a name="0.3.5"></a>
## [0.3.5](https://github.com/justindujardin/ng2-material/compare/v0.3.4...v0.3.5) (2016-04-10)


### Bug Fixes

* fix ProgressCircular tests about diameter ([9c6ae37](https://github.com/justindujardin/ng2-material/commit/9c6ae37))
* **universal:** workaround incomplete parse5 adapter ([0cf5608](https://github.com/justindujardin/ng2-material/commit/0cf5608))

### Features

* revamp interaction between table and rows. Now it only works with EventEmitter ([115ba65](https://github.com/justindujardin/ng2-material/commit/115ba65))
* updated material icon font ([c313b2c](https://github.com/justindujardin/ng2-material/commit/c313b2c))
* **angular2:** update to beta 14 ([7afdd23](https://github.com/justindujardin/ng2-material/commit/7afdd23))
* **md-data-table:** Add data-table style hooks ([f1f3c68](https://github.com/justindujardin/ng2-material/commit/f1f3c68))
* **universal:** export node and browser compatible services ([67e8054](https://github.com/justindujardin/ng2-material/commit/67e8054))


### BREAKING CHANGES

* universal: Remove static `Media.hasMedia` method and utility `rAF` function. Inject the `ViewportHelper` service for rAF, and the `Media` service for hasMedia. This static method referred to the window directly.

The use of `MATERIAL_PROVIDERS` has been deprecated. Please use either `MATERIAL_NODE_PROVIDERS` or `MATERIAL_BROWSER_PROVIDERS` as is appropriate for your platform.



<a name="0.3.4"></a>
## [0.3.4](https://github.com/justindujardin/ng2-material/compare/v0.3.3...v0.3.4) (2016-03-29)


### Bug Fixes

* md-data-table injection on md-data-table-tr ([89d63f4](https://github.com/justindujardin/ng2-material/commit/89d63f4))



<a name="0.3.3"></a>
## [0.3.3](https://github.com/justindujardin/ng2-material/compare/v0.3.2...v0.3.3) (2016-03-28)




<a name="0.3.2"></a>
## [0.3.2](https://github.com/justindujardin/ng2-material/compare/v0.3.1...v0.3.2) (2016-03-27)




<a name="0.3.1"></a>
## [0.3.1](https://github.com/justindujardin/ng2-material/compare/v0.3.0...v0.3.1) (2016-03-27)


### Bug Fixes

* **angular2:** beta 12 has a change detection bug that misses peekaboo scroll ([5a58a05](https://github.com/justindujardin/ng2-material/commit/5a58a05))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/justindujardin/ng2-material/compare/v0.2.13...v0.3.0) (2016-03-27)


### Features

* Data table component with selectable rows ([9e8f0ac](https://github.com/justindujardin/ng2-material/commit/9e8f0ac))
* **angular2:** update to beta 12 ([887042e](https://github.com/justindujardin/ng2-material/commit/887042e))



<a name="0.2.13"></a>
## [0.2.13](https://github.com/justindujardin/ng2-material/compare/v0.2.12...v0.2.13) (2016-03-27)


### Bug Fixes

* package.json to run tests and serve the app ([799c8d1](https://github.com/justindujardin/ng2-material/commit/799c8d1))
* rxjs-dependency version need to be frozen for the moment. When Angular team will ([53d3bf9](https://github.com/justindujardin/ng2-material/commit/53d3bf9))



<a name="0.2.12"></a>
## [0.2.12](https://github.com/justindujardin/ng2-material/compare/v0.2.11...v0.2.12) (2016-03-20)


### Bug Fixes

* **examples:** link to angular2 tag on index page ([98b642c](https://github.com/justindujardin/ng2-material/commit/98b642c))

### Features

* **angular2:** update to beta 11 ([603ba25](https://github.com/justindujardin/ng2-material/commit/603ba25))



<a name="0.2.11"></a>
## [0.2.11](https://github.com/justindujardin/ng2-material/compare/v0.2.10...v0.2.11) (2016-03-12)


### Features

* **angular2:** update to beta 9 ([5bee7d4](https://github.com/justindujardin/ng2-material/commit/5bee7d4))



<a name="0.2.10"></a>
## [0.2.10](https://github.com/justindujardin/ng2-material/compare/v0.2.9...v0.2.10) (2016-03-06)


### Bug Fixes

* **ink:** ink correctly radiates from under click on safari ([21e288f](https://github.com/justindujardin/ng2-material/commit/21e288f))



<a name="0.2.9"></a>
## [0.2.9](https://github.com/justindujardin/ng2-material/compare/v0.2.8...v0.2.9) (2016-03-05)


### Features

* **angular2:** update to beta 8 ([1d5c8e5](https://github.com/justindujardin/ng2-material/commit/1d5c8e5))



<a name="0.2.8"></a>
## [0.2.8](https://github.com/justindujardin/ng2-material/compare/v0.2.7...v0.2.8) (2016-02-28)


### Bug Fixes

* **examples:** add SidenavService to providers in sidenav example ([1fc09bd](https://github.com/justindujardin/ng2-material/commit/1fc09bd))



<a name="0.2.7"></a>
## [0.2.7](https://github.com/justindujardin/ng2-material/compare/v0.2.6...v0.2.7) (2016-02-26)


### Bug Fixes

* issue where sidenav would generate change after check exception ([1456097](https://github.com/justindujardin/ng2-material/commit/1456097))



<a name="0.2.6"></a>
## [0.2.6](https://github.com/justindujardin/ng2-material/compare/v0.2.5...v0.2.6) (2016-02-24)


### Bug Fixes

* use synchronous event emitters to workaround dehydrated detectors ([85cab59](https://github.com/justindujardin/ng2-material/commit/85cab59)), closes [#55](https://github.com/justindujardin/ng2-material/issues/55)

### Features

* **README:** add purpose statement ([792e4af](https://github.com/justindujardin/ng2-material/commit/792e4af))



<a name="0.2.5"></a>
## [0.2.5](https://github.com/justindujardin/ng2-material/compare/v0.2.4...v0.2.5) (2016-02-21)


### Bug Fixes

* **build:** remove need for installing typings from the internet ([9acfd14](https://github.com/justindujardin/ng2-material/commit/9acfd14)), closes [#74](https://github.com/justindujardin/ng2-material/issues/74)
* **build:** remove triple slash reference from types file ([fd50eb8](https://github.com/justindujardin/ng2-material/commit/fd50eb8))



<a name="0.2.4"></a>
## [0.2.4](https://github.com/justindujardin/ng2-material/compare/v0.2.3...v0.2.4) (2016-02-21)


### Bug Fixes

* **dialog:** no more blurry text ([7baaaee](https://github.com/justindujardin/ng2-material/commit/7baaaee)), closes [#10](https://github.com/justindujardin/ng2-material/issues/10)
* **input:** support two way binding with value ([dc63f19](https://github.com/justindujardin/ng2-material/commit/dc63f19)), closes [#62](https://github.com/justindujardin/ng2-material/issues/62)
* **input:** work with async value bindings ([0014bc4](https://github.com/justindujardin/ng2-material/commit/0014bc4)), closes [#40](https://github.com/justindujardin/ng2-material/issues/40) [#39](https://github.com/justindujardin/ng2-material/issues/39) [#59](https://github.com/justindujardin/ng2-material/issues/59)
* **install:** use typings explicitly from node_modules ([7bef97d](https://github.com/justindujardin/ng2-material/commit/7bef97d)), closes [#74](https://github.com/justindujardin/ng2-material/issues/74)
* **MdMinValueValidator:** do not use max validator logic ([f67e508](https://github.com/justindujardin/ng2-material/commit/f67e508)), closes [#61](https://github.com/justindujardin/ng2-material/issues/61)



<a name="0.2.3"></a>
## [0.2.3](https://github.com/justindujardin/ng2-material/compare/v0.2.2...v0.2.3) (2016-02-21)


### Bug Fixes

* **dialog:** null reference error when not specifying dialog config ([6e60b34](https://github.com/justindujardin/ng2-material/commit/6e60b34))

### Features

* **examples:** add angular2 compatible version to main page ([5031819](https://github.com/justindujardin/ng2-material/commit/5031819))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/justindujardin/ng2-material/compare/v0.2.1...v0.2.2) (2016-02-08)


### Bug Fixes

* **build:** make ie name shim compatible with coverage code ([5e1759c](https://github.com/justindujardin/ng2-material/commit/5e1759c))

### Features

* update to angular2 beta1 ([2362e79](https://github.com/justindujardin/ng2-material/commit/2362e79))
* **LICENSE:** use MIT license now that angular2 does ([e3292d1](https://github.com/justindujardin/ng2-material/commit/e3292d1))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/justindujardin/ng2-material/compare/v0.2.0...v0.2.1) (2016-02-02)


### Bug Fixes

* **input:** check for empty string for input has value ([0f8c690](https://github.com/justindujardin/ng2-material/commit/0f8c690)), closes [#36](https://github.com/justindujardin/ng2-material/issues/36)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/justindujardin/ng2-material/compare/v0.1.8...v0.2.0) (2016-02-01)


### Features

* **Animate:** add support for maybe correct ng1 css animation classes ([cb85ae4](https://github.com/justindujardin/ng2-material/commit/cb85ae4))
* **backdrop:** add configurable transition classes ([4f847dc](https://github.com/justindujardin/ng2-material/commit/4f847dc))
* **backdrop:** add hideScroll input to hide parent scroll while shown ([2e6240d](https://github.com/justindujardin/ng2-material/commit/2e6240d))
* **backdrop:** add visible property setter for binding to ([635224c](https://github.com/justindujardin/ng2-material/commit/635224c))
* **examples:** add basic menu side navigation ([684b7dc](https://github.com/justindujardin/ng2-material/commit/684b7dc))
* **examples:** add sidenav example ([5d1ce24](https://github.com/justindujardin/ng2-material/commit/5d1ce24))
* **examples:** focus input when sidenav is shown ([dff7050](https://github.com/justindujardin/ng2-material/commit/dff7050))
* **ink:** add directive for applying ink to arbitrary elements ([89819d5](https://github.com/justindujardin/ng2-material/commit/89819d5))
* **sidenav:** basic sidenav component extended from backdrop ([6043b12](https://github.com/justindujardin/ng2-material/commit/6043b12))
* **switch:** match latest angular material animation ([abd10e7](https://github.com/justindujardin/ng2-material/commit/abd10e7))



<a name="0.1.8"></a>
## [0.1.8](https://github.com/justindujardin/ng2-material/compare/v0.1.7...v0.1.8) (2016-01-23)


### Features

* **examples:** add whiteframe example ([340ee6c](https://github.com/justindujardin/ng2-material/commit/340ee6c))
* **theme:** make it easier to override themes in scss ([23d6482](https://github.com/justindujardin/ng2-material/commit/23d6482))



<a name="0.1.7"></a>
## [0.1.7](https://github.com/justindujardin/ng2-material/compare/v0.1.6...v0.1.7) (2016-01-17)


### Bug Fixes

* **examples:** correct import statement for scss example ([46dd541](https://github.com/justindujardin/ng2-material/commit/46dd541)), closes [#17](https://github.com/justindujardin/ng2-material/issues/17)
* **input:** issue where undefined values would be displayed ([294c073](https://github.com/justindujardin/ng2-material/commit/294c073))



<a name="0.1.6"></a>
## [0.1.6](https://github.com/justindujardin/ng2-material/compare/v0.1.5...v0.1.6) (2016-01-11)


### Features

* **examples:** add basic usage input example ([84af244](https://github.com/justindujardin/ng2-material/commit/84af244))
* support validation errors with FormBuilder ([df03e9b](https://github.com/justindujardin/ng2-material/commit/df03e9b))
* **examples:** inline markup and form builder input demos ([7382f75](https://github.com/justindujardin/ng2-material/commit/7382f75))
* **form:** use md-message/md-messages for form validation errors ([14e36f4](https://github.com/justindujardin/ng2-material/commit/14e36f4))
* **input:** add support for mdMaxLength and mdPattern validators ([13035a6](https://github.com/justindujardin/ng2-material/commit/13035a6))



<a name="0.1.5"></a>
## [0.1.5](https://github.com/justindujardin/ng2-material/compare/v0.1.4...v0.1.5) (2016-01-07)


### Bug Fixes

* issue where dialog text was blurry ([634cdf4](https://github.com/justindujardin/ng2-material/commit/634cdf4))

### Features

* add sauce badge to readme ([d2e782f](https://github.com/justindujardin/ng2-material/commit/d2e782f))
* add sauce labs test execution ([92b835d](https://github.com/justindujardin/ng2-material/commit/92b835d))



<a name="0.1.4"></a>
## [0.1.4](https://github.com/justindujardin/ng2-material/compare/v0.1.3...v0.1.4) (2016-01-05)


### Bug Fixes

* **build:** issue where dist css file had bad source mapping ([2cc8a74](https://github.com/justindujardin/ng2-material/commit/2cc8a74)), closes [#8](https://github.com/justindujardin/ng2-material/issues/8)



<a name="0.1.3"></a>
## [0.1.3](https://github.com/justindujardin/ng2-material/compare/v0.1.2...v0.1.3) (2016-01-04)


### Bug Fixes

* **grid_list:** issue with changes happening after being checked ([c449c60](https://github.com/justindujardin/ng2-material/commit/c449c60))

### Features

* **button:** test remaining button behaviors ([e9b208b](https://github.com/justindujardin/ng2-material/commit/e9b208b))
* **checkbox:** complete behavioral coverage ([1e960e9](https://github.com/justindujardin/ng2-material/commit/1e960e9))
* **radio:** support keyboard input behaviors and tests ([3aa8e0c](https://github.com/justindujardin/ng2-material/commit/3aa8e0c))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/justindujardin/ng2-material/compare/v0.1.1...v0.1.2) (2016-01-03)


### Bug Fixes

* **backdrop:** do not dismiss when clicked while animating to show ([f829bd8](https://github.com/justindujardin/ng2-material/commit/f829bd8))
* **input:** input elements must use md-input attribute to be recognized ([e00d578](https://github.com/justindujardin/ng2-material/commit/e00d578))
* **providers:** remove url resolver from providers exposed ([9b6971e](https://github.com/justindujardin/ng2-material/commit/9b6971e))

### Features

* **examples:** add basic list item usage ([399b5f6](https://github.com/justindujardin/ng2-material/commit/399b5f6))
* **examples:** add checkbox examples ([9fc3321](https://github.com/justindujardin/ng2-material/commit/9fc3321))
* **examples:** add getting started instructions to main page ([ec35240](https://github.com/justindujardin/ng2-material/commit/ec35240))
* **subheader:** add non-sticky subheader component ([8aade08](https://github.com/justindujardin/ng2-material/commit/8aade08))
* **test:** add componentSanityCheck helper for simple component sanity ([2b308d8](https://github.com/justindujardin/ng2-material/commit/2b308d8))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/justindujardin/ng2-material/compare/v0.1.0...v0.1.1) (2016-01-02)


### Bug Fixes

* **examples:** make card examples mobile friendly ([77bf5c4](https://github.com/justindujardin/ng2-material/commit/77bf5c4))
* **examples:** remove horizontal scroll on small phone screens ([22c4521](https://github.com/justindujardin/ng2-material/commit/22c4521))
* **examples:** scroll shrink container overflow ([828e78c](https://github.com/justindujardin/ng2-material/commit/828e78c))

### Features

* **layout:** rebase layout styles on angular material one point x ([bcadb41](https://github.com/justindujardin/ng2-material/commit/bcadb41))
* **radio:** support disabled, alignment, and intention color customization ([efd4627](https://github.com/justindujardin/ng2-material/commit/efd4627))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/justindujardin/ng2-material/compare/v0.0.11...v0.1.0) (2015-12-29)


### Features

* **examples:** add version service for accessing version.json data ([b52c83d](https://github.com/justindujardin/ng2-material/commit/b52c83d))
* **examples:** hero header for demo site ([90464af](https://github.com/justindujardin/ng2-material/commit/90464af))
* **examples:** support rendering markdown content for examples ([3d42aa6](https://github.com/justindujardin/ng2-material/commit/3d42aa6))
* **examples:** use router for navigation between examples ([380625e](https://github.com/justindujardin/ng2-material/commit/380625e))
* **peekaboo:** decorator for viewport scroll actions ([d419853](https://github.com/justindujardin/ng2-material/commit/d419853))
* **peekaboo:** different breaks for different viewport sizes ([0fff4cc](https://github.com/justindujardin/ng2-material/commit/0fff4cc))
* **toolbar:** add md-hero height for large material page headers ([a949ba8](https://github.com/justindujardin/ng2-material/commit/a949ba8))
* **util:** add Media injectable for media query checks and events ([edc437e](https://github.com/justindujardin/ng2-material/commit/edc437e))



<a name="0.0.11"></a>
## [0.0.11](https://github.com/justindujardin/ng2-material/compare/v0.0.10...v0.0.11) (2015-12-27)


### Features

* **examples:** add test coverage report to example page ([f41fb1f](https://github.com/justindujardin/ng2-material/commit/f41fb1f))
* **progress_linear:** support buffer and query indicators and add tests ([5cb8bad](https://github.com/justindujardin/ng2-material/commit/5cb8bad))



<a name="0.0.10"></a>
## [0.0.10](https://github.com/justindujardin/ng2-material/compare/v0.0.9...v0.0.10) (2015-12-26)


### Features

* **backdrop:** backdrop component and tests ([c55751c](https://github.com/justindujardin/ng2-material/commit/c55751c))
* **backdrop:** basic component that can be closed and emits onHiding/onHidden ([e0a92bb](https://github.com/justindujardin/ng2-material/commit/e0a92bb))
* **dialog:** basic test spec ([c8d52e8](https://github.com/justindujardin/ng2-material/commit/c8d52e8))
* **dialog:** support basic alert and confirm dialogs ([7236279](https://github.com/justindujardin/ng2-material/commit/7236279))
* **reporting:** show code coverage in build log and export json file for examples site ([3b5147e](https://github.com/justindujardin/ng2-material/commit/3b5147e))



<a name="0.0.9"></a>
## [0.0.9](https://github.com/justindujardin/ng2-material/compare/v0.0.8...v0.0.9) (2015-12-24)


### Bug Fixes

* **build:** inline templates until offline compilation is available ([0c5fa5e](https://github.com/justindujardin/ng2-material/commit/0c5fa5e)), closes [#1](https://github.com/justindujardin/ng2-material/issues/1)

### Features

* **tabs:** basic behavioral tests for tab selection binding and input ([3cf848d](https://github.com/justindujardin/ng2-material/commit/3cf848d))



<a name="0.0.8"></a>
## [0.0.8](https://github.com/justindujardin/ng2-material/compare/v0.0.7...v0.0.8) (2015-12-20)


### Bug Fixes

* **browser:** use autoprefixer to enable flexbox on safari ([9ae1a42](https://github.com/justindujardin/ng2-material/commit/9ae1a42))
* **examples:** use es6 shim for safari 8 compatibility ([9e65de0](https://github.com/justindujardin/ng2-material/commit/9e65de0))
* **toolbar:** use prefix translate for scroll-shrink in safari 8 ([9e14280](https://github.com/justindujardin/ng2-material/commit/9e14280))

### Features

* **build:** add setBaseUrl to override where to load templates and styles from ([3ea1270](https://github.com/justindujardin/ng2-material/commit/3ea1270))
* **examples:** add PLUNKR template showing how to get started ([029acbc](https://github.com/justindujardin/ng2-material/commit/029acbc))
* **examples:** add release version to the site header ([4aa3bee](https://github.com/justindujardin/ng2-material/commit/4aa3bee))
* **highlight:** allow specifying highlight text as body content ([f169ee6](https://github.com/justindujardin/ng2-material/commit/f169ee6))



<a name="0.0.7"></a>
## [0.0.7](https://github.com/justindujardin/ng2-material/compare/v0.0.6...v0.0.7) (2015-12-19)


### Bug Fixes

* **examples:** import ng2-material from its bundle not using relative paths ([9cc14e6](https://github.com/justindujardin/ng2-material/commit/9cc14e6))
* **examples:** top and bottom margin on button example ([cf40976](https://github.com/justindujardin/ng2-material/commit/cf40976))

### Features

* **button:** add ripple to buttons ([eb78e1f](https://github.com/justindujardin/ng2-material/commit/eb78e1f))
* **tabs:** add dynamic height example ([877a3ef](https://github.com/justindujardin/ng2-material/commit/877a3ef))
* **tabs:** add dynamic tabs example ([d0b0eff](https://github.com/justindujardin/ng2-material/commit/d0b0eff))
* **tabs:** add ink ripple to tab buttons ([3636925](https://github.com/justindujardin/ng2-material/commit/3636925))
* **tabs:** basic material styled tabs with no ink or animations ([d6653f7](https://github.com/justindujardin/ng2-material/commit/d6653f7))
* **util:** add Animate class for css and typescript based animations ([99a4abc](https://github.com/justindujardin/ng2-material/commit/99a4abc))
* **util:** add Ink class for applying ripples to html elements ([0fd473c](https://github.com/justindujardin/ng2-material/commit/0fd473c))



<a name="0.0.6"></a>
## [0.0.6](https://github.com/justindujardin/ng2-material/compare/v0.0.5...v0.0.6) (2015-12-16)


### Features

* update to angular 2.0 beta 0 ([1885f11](https://github.com/justindujardin/ng2-material/commit/1885f11))



<a name="0.0.5"></a>
## [0.0.5](https://github.com/justindujardin/ng2-material/compare/v0.0.4...v0.0.5) (2015-12-16)


### Bug Fixes

* **examples:** issue where demos would not load in firefox ([bc54249](https://github.com/justindujardin/ng2-material/commit/bc54249))

### Features

* **examples:** add button basic usage ([c456f27](https://github.com/justindujardin/ng2-material/commit/c456f27))
* **examples:** add navigation to demo page ([7777da9](https://github.com/justindujardin/ng2-material/commit/7777da9))
* **README:** add travis and coveralls badges ([ac175dd](https://github.com/justindujardin/ng2-material/commit/ac175dd))
* **toolbar:** add scroll shrink option ([32be4a5](https://github.com/justindujardin/ng2-material/commit/32be4a5))



<a name="0.0.4"></a>
## [0.0.4](https://github.com/justindujardin/ng2-material/compare/v0.0.3...v0.0.4) (2015-12-14)


### Bug Fixes

* **card:** issue with layout alignment of first child button ([0da02fe](https://github.com/justindujardin/ng2-material/commit/0da02fe))

### Features

* **build:** add coveralls config for coverage reporting ([21077cc](https://github.com/justindujardin/ng2-material/commit/21077cc))
* **build:** add travis script for test execution ([7dd10ca](https://github.com/justindujardin/ng2-material/commit/7dd10ca))
* **docs:** view example source files inline ([a8c1ba2](https://github.com/justindujardin/ng2-material/commit/a8c1ba2))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/justindujardin/ng2-material/compare/v0.0.2...v0.0.3) (2015-12-13)


### Features

* **build:** add support for generating examples static site ([a9db1d2](https://github.com/justindujardin/ng2-material/commit/a9db1d2))
* **build:** include readme and changelog in npm package ([78650a8](https://github.com/justindujardin/ng2-material/commit/78650a8))



<a name="0.0.2"></a>
## [0.0.2](https://github.com/justindujardin/ng2-material/compare/v0.0.1...v0.0.2) (2015-12-13)


### Features

* **build:** include bumped version in npm publish ([88f7134](https://github.com/justindujardin/ng2-material/commit/88f7134))



<a name="0.0.1"></a>
## 0.0.1 (2015-12-13)


### Features

* **docs:** add basic card and toolbar examples ([b9ff27c](https://github.com/justindujardin/ng2-material/commit/b9ff27c))
* **Material Icons:** support overriding material font url using scss ([a9c88bc](https://github.com/justindujardin/ng2-material/commit/a9c88bc))
* **mdCheckbox:** support two-way binding to checked property ([d220c42](https://github.com/justindujardin/ng2-material/commit/d220c42))
* **radioGroup:** allow two way binding to value ([9e8ae62](https://github.com/justindujardin/ng2-material/commit/9e8ae62))
* **test:** support generating coverage report with istanbul ([6af23c9](https://github.com/justindujardin/ng2-material/commit/6af23c9))



