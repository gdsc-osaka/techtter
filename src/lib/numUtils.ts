/**
 * number の仮数部を取得する
 */
export function getMantissa(n: number) {
    const float = new Float64Array(1);
    const bytes = new Uint8Array(float.buffer);

    float[0] = n;

    // const sign = bytes[7] >> 7;
    // const exponent = ((bytes[7] & 0x7f) << 4 | bytes[6] >> 4) - 0x3ff;

    bytes[7] = 0x3f;
    bytes[6] |= 0xf0;

    return float[0];
}

/**
 * n が 2 の冪乗かどうかを, マイナス乗も含めて判定する
 */
export function isPow2(n: number): boolean {
    let m = getMantissa(n);
    let isPow2 = false;

    // 仮数部に立っている bit が 1 つだけかどうかを判定する
    while (m > 0) {
        const int = Math.floor(m);

        if (int === 0) {
            m *= 2;
            continue;
        }

        if (isPow2) return false;
        isPow2 = true;
        m = (m - 1) * 2;
    }

    return isPow2;
}

export function gcdOfTwo(a: number, b: number) {
    while (a !== 0 && b !== 0) {
        if (a > b) {
            a %= b;
        } else {
            b %= a;
        }
    }

    return a === 0 ? b : a;
}

export function gcd(nums: number[]): number {
    if (nums.length < 2) {
        return nums.length === 0 ? 0 : nums[0];
    }
    return gcdOfTwo(nums[0], gcd(nums.slice(1)));
}
