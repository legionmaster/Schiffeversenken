import {Schiff} from './../src/Schiff';

describe('ES6 Test', function() {
    let foo;

    beforeEach(() => {
        foo = new Schiff();
    });

    it('should behave...', () => {
        expect(foo.test(1, 1)).toEqual(2);
    });
});