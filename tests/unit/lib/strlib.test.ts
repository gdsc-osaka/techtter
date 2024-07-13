import { describe, expect } from 'vitest';
import { countLines } from '@/lib/strlib';

describe('strlib', (it) => {
    it.each([
        ['', 0],
        ['a', 1],
        ['a\nb', 2],
        ['a\nb\n', 3],
        ['abcdefg\nhijklmn\nopqrstu\nvwxyz', 4],
    ])('should return the correct length of a string', (input, expected) => {
        expect(countLines(input)).toBe(expected);
    });
});
