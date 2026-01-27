import { SeedValidator } from "../utils/validator.js";
import { AESEncryption, EncryptedSeed } from "./encryption.js";

interface UserInformations {
    seed: string;
    passphrase: string;
}

export class SeedManager {
    static secureSeed({ seed, passphrase }: UserInformations): EncryptedSeed {
        const seedNormalize = SeedValidator.normalizeSeed(seed);
        const finalSeed = SeedValidator.validateSeed(seedNormalize);

        if (!finalSeed) throw new Error("Your seed isn't following bip39 convention, please contact your platform.");
        
        const result: EncryptedSeed = AESEncryption.encrypt(seedNormalize, passphrase);
        return result;

        // Add Shamir
        // Add Blockchain
    }

    static recoverSeed(encrypted: EncryptedSeed, passphrase: string): string {
        // Add Shamir
        // Add Blockchain
        const seed = AESEncryption.decrypt(encrypted, passphrase);
        const validSeed = SeedValidator.validateSeed(seed);
        if (!validSeed) throw new Error("Your seed isn't following bip39 convention, please contact your platform.");
        return seed;
    }
}