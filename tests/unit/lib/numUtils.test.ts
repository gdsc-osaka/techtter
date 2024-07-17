import { describe, expect } from 'vitest';
import { gcd, gcdOfTwo, isPow2 } from '@/lib/numUtils';
import { getMantissa } from '@/lib/numUtils';

describe('numUtils', () => {
    describe('isPow2', (it) => {
        it.each([-(2 ** 52), -2, -1, 0, 1, 2, 4, 8, 2 ** 52])(
            'should return true for %d',
            (n) => {
                expect(isPow2(n)).toBe(true);
            }
        );

        it.each([-(2 ** 52) + 1, -3, 3, 2 ** 31 + 1])(
            'should return false for %d',
            (n) => {
                expect(isPow2(n)).toBe(false);
            }
        );
    });

    describe('getMantissa', (it) => {
        it.each([
            [0, 1],
            [2, 1],
            [0.5, 1],
            [0.25, 1],
            [0.125, 1],
            [0.75, 0b11 / 2],
            [0.875, 0b111 / 4],
            [-2, 1],
        ])('%d should be %d', (n, expected) => {
            // console.log(getMantissa(n));
            expect(getMantissa(n)).toBe(expected);
        });
    });

    describe('gcdOfTwo', (it) => {
        it.each([
            [3, 6, 3],
            [18, 6, 6],
        ])('gcd of %d and %d should be %d', (a, b, expected) => {
            expect(gcdOfTwo(a, b)).toBe(expected);
        });
    });

    describe('gcd', (it) => {
        it.each([
            [[3, 6, 9], 3],
            [[18, 6, 9], 3],
            [[1, 2, 3, 4, 5, 6, 7, 8].map((n) => n * 2 ** 4), 2 ** 4],
            [[0, 2], 2],
        ])('gcd of %j should be %d', (nums, expected) => {
            expect(gcd(nums)).toBe(expected);
        });
    });
});
