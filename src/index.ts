import * as crypto from "crypto";
import PromptSync from "prompt-sync";

// 1. Mettre en place le chiffrement AES avec un password
// 2. Stringify le chiffrement AES
// 3. Implementer le Shamir Split pour 3 fragments et en jeter 1


// Objectif : 
// Créer la fonction de decryptage
// Créer les tests

const prompt = PromptSync();
const seed: string = prompt("Please enter your seedphrase: ");
const passphrase: string = prompt("Please enter your password: "); 

export class AESEncryption {
    private static readonly ALGORITHM = "aes-256-gcm";
    private static readonly KEY_LENGTH = 32;
    private static readonly SALT_LENGTH = 64;
    private static readonly IV_LENGTH = 16;
    private static readonly ITERATIONS = 100000;

    private static deriveKey(passphrase: string, salt: Buffer): Buffer {
        return crypto.pbkdf2Sync(
            passphrase,
            salt,
            this.ITERATIONS,
            this.KEY_LENGTH,
            "sha512"
        )
    }

    static encrypt(seed: string, passphrase: string) {
        const salt: Buffer = crypto.randomBytes(this.SALT_LENGTH);
        const iv: Buffer = crypto.randomBytes(this.IV_LENGTH);
        
        // Create derived key
        const key: Buffer = this.deriveKey(passphrase, salt);
        
        // Create cipher
        const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv)

        // Encrypt cipher text
        let cipherText = cipher.update(seed, "utf-8", "hex");
        cipherText += cipher.final("hex");

        // Get tag
        const tag: Buffer = cipher.getAuthTag();

        return {
            cipherText,
            iv: iv.toString("hex"),
            salt: salt.toString("hex"),
            tag: tag.toString("hex")
        }
    } 
}

const result: object = AESEncryption.encrypt(seed, passphrase);
console.log(typeof result);
console.log(result);