import { MeanAppNewPage } from './app.po';

describe('mean-app-new App', function() {
  let page: MeanAppNewPage;

  beforeEach(() => {
    page = new MeanAppNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
