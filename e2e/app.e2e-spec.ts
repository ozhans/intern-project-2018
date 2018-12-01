import { Page } from './app.po';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('should have a title saying Modüller', () => {
      page.getPageOneTitleText().then(title => {
        expect(title).toEqual('Modüller');
      });
    });
  })

  describe('logout button',() => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('should clear local storage', () => {
      
      expect(page.clearAndReturnStorage()).toEqual(null);
    })
  })

  describe('test',() => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('test',() => {
      page.test();
    })
  })
});
