import { LightPage } from './app.po';

describe('light App', function() {
  let page: LightPage;

  beforeEach(() => {
    page = new LightPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
