import { TestBed } from '@angular/core/testing';
import { ArraysUtil } from './arrays-util';

describe('ArraysUtil', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should return true if two arrays are equal', () => {
        const array1 = ['a', 'b', 'c'];
        const array2 = ['a', 'b', 'c'];
        expect(array1).toEqual(array2);
        expect(ArraysUtil.compare(array1, array2)).toBeTruthy();
    });

    it('should return false if two arrays are not equal in length', () => {
        const array1 = ['a', 'b', 'c'];
        const array2 = ['a', 'b', 'c', 'd'];
        expect(ArraysUtil.compare(array1, array2)).toBeFalsy();
    });

    it('should return false if two arrays are not equal in content', () => {
        const array1 = ['a', 'b', 'c'];
        const array2 = ['a', 'b', 'd'];
        expect(ArraysUtil.compare(array1, array2)).toBeFalsy();
    });
});
