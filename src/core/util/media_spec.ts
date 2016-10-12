import {inject, TestBed} from '@angular/core/testing';
import {Media} from './media';
import {MATERIAL_BROWSER_PROVIDERS} from '../../index';


describe('MediaService', () => {
  const smallQuery = Media.getQuery('sm');
  const largeQuery = Media.getQuery('lg');
  let m: Media = null;
  describe('listen', () => {


    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [],
        providers: [MATERIAL_BROWSER_PROVIDERS]
      });
    });
    beforeEach(inject([Media], (media: Media) => {
      m = media;
    }));
    it('should return a listener with the given query', () => {
      const listener = m.listen(smallQuery);
      expect(listener.query).toBe(smallQuery);
      listener.destroy();
    });
    it('should reference count and share matchMedia listeners with the same query', () => {
      expect(m.cache[largeQuery]).toBe(undefined);
      const listener = m.listen(largeQuery);
      expect(m.cache[largeQuery].references).toBe(1);
      const another = m.listen(largeQuery);
      expect(m.cache[largeQuery].references).toBe(2);
      listener.destroy();
      expect(m.cache[largeQuery].references).toBe(1);
      another.destroy();
      expect(m.cache[largeQuery]).toBe(undefined);
    });
  });
});
