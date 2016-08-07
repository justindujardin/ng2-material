import {inject} from '@angular/core/testing';
import {Media} from './media';

export function main() {

  describe('MediaService', () => {
    const smallQuery = Media.getQuery('sm');
    const largeQuery = Media.getQuery('lg');
    let m: Media = null;
    describe('listen', () => {
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
}
