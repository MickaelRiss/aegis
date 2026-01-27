import { describe, it, expect, expectTypeOf } from "vitest";
import * as bip39 from "bip39";
import { SeedManager } from "../../src/core/seedManager.js";
describe("Integration tests for Seed Manager", () => {
    it.each([
        bip39.generateMnemonic(128),
        bip39.generateMnemonic(160),
        bip39.generateMnemonic(192),
        bip39.generateMnemonic(224),
        bip39.generateMnemonic(256),
    ])("Encryption should be an EncryptedSeed object with cypherText, iv, salt and tag properties", (seed) => {
        const passphrase = "@415WSfs)wwf5";
        const encrypted = SeedManager.secureSeed({ seed, passphrase });
        expectTypeOf(encrypted).toEqualTypeOf;
        expect(encrypted).toHaveProperty("cipherText");
        expect(encrypted).toHaveProperty("iv");
        expect(encrypted).toHaveProperty("salt");
        expect(encrypted).toHaveProperty("tag");
    });
    it.each([
        bip39.generateMnemonic(128),
        bip39.generateMnemonic(160),
        bip39.generateMnemonic(192),
        bip39.generateMnemonic(224),
        bip39.generateMnemonic(256),
    ])("Decryption should return a string with the same value than the original seed", (seed) => {
        const passphrase = "@415WSfs)wwf5";
        const encrypted = SeedManager.secureSeed({ seed, passphrase });
        const decrypted = SeedManager.recoverSeed(encrypted, passphrase);
        expectTypeOf(decrypted).toBeString();
        expect(decrypted).toBe(seed);
    });
    it("With empty seed, should always throw error", () => {
        const passphrase = "@415WSfs)wwf5";
        const seed = "";
        const encrypted = () => SeedManager.secureSeed({ seed, passphrase });
        expect(encrypted).toThrowError();
    });
    it("With unvalid seed, should always throw error", () => {
        const passphrase = "@415WSfs)wwf5";
        const seed = "bridge total merit solar adjust duty fiction average find clarify prize";
        const encrypted = () => SeedManager.secureSeed({ seed, passphrase });
        expect(encrypted).toThrowError();
    });
    it("With unvalid password, should always throw error", () => {
        const passphrase = "@415WSfs)wwf5";
        const wrongPassphrase = "@415WSfs)wwf";
        const seed = bip39.generateMnemonic(256);
        const encrypted = SeedManager.secureSeed({ seed, passphrase });
        const decrypted = () => SeedManager.recoverSeed(encrypted, wrongPassphrase);
        expect(decrypted).toThrowError();
    });
});
