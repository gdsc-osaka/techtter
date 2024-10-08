export function countLines(str: string) {
    let count = str === '' ? 0 : 1;
    const len = str.length;

    for (let i = 0; i < len; i++) {
        const char = str.charAt(i);
        if (char === '\n') {
            count++;
        }
    }

    return count;
}

export function extractUrls(str: string): string[] {
    const urls = str.match(/https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/g);
    return urls ?? [];
}
