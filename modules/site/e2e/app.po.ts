export class SitePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('site-app h1')).getText();
  }
}
