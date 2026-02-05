# Kyte

Kyte is a desktop application that secures cryptocurrency seed phrases using **Shamir secret sharing**. It splits your seed into 3 fragments — any 2 of which can recover the original seed.

> **Current Version:** Community Edition (Free) — Shamir 2-of-3 secret sharing
> **Coming Soon:** Pro License — Double encryption, custom M-of-N configs, and multisig security

## Why Kyte?

Storing a seed phrase in a single location is a single point of failure. If it's found, your funds are gone. If it's lost, your funds are gone.

Kyte solves this with **Shamir secret sharing**:

- Your seed is split into 3 fragments
- Any 2 fragments can reconstruct the original seed
- A single fragment alone reveals **zero information** (information-theoretically secure)

This means you can distribute fragments across different locations and people. Losing one fragment doesn't lock you out, and finding one fragment doesn't compromise you.

## How it works

<img width="975" height="716" alt="Screenshot 2026-02-05 at 10 46 48 PM" src="https://github.com/user-attachments/assets/66d1615e-ef1e-4245-891c-efcf6a5b355e" />

### Community Edition (Current)

```
Seed phrase
        │
        ▼
   BIP39 validation & normalization
        │
        ▼
   Shamir 2-of-3 secret sharing
        │
        ▼
   3 fragments as QR codes
```

### Fragment distribution

Each fragment is meant to be stored in a different place:

| Fragment | Where to store it | How |
|----------|-------------------|-----|
| **A** | You keep it | Print the QR code, store in a safe or lockbox |
| **B** | Trusted person | Print the QR code, give to family or a close friend |
| **C** | Cloud storage | Upload the QR image to Google Drive, iCloud, AWS, etc. |

### Recovery

To recover your seed, you need **any 2 of the 3 fragments**. For example:
- Fragment A + Fragment B
- Fragment A + Fragment C
- Fragment B + Fragment C

### Why Cloud Storage Over Smart Contracts for Kyte ?
After careful consideration, I've decided to recommend cloud storage instead of smart contract storage for Fragment C in Kyte. Here's why:
Smart contracts create an immutable public record. Once Fragment C is deployed on-chain, it exists forever—visible to anyone, anywhere, at any time. This permanent visibility presents several concerns:
- Future cryptographic vulnerabilities: Tomorrow's technology may break today's security (quantum computing, new attack vectors)
- Eternal exposure: Unlike cloud storage, blockchain data cannot be deleted or updated
- Privacy concerns: Your crypto activity becomes permanently traceable on a public ledger
- Gas fees: Every on-chain transaction costs money
- Single fragment is useless: Remember, a single Shamir fragment reveals zero information about your seed — even if someone finds Fragment C on-chain, it's mathematically worthless without at least one other fragment

<img width="804" height="664" alt="Screenshot 2026-01-30 at 11 42 06 AM" src="https://github.com/user-attachments/assets/6ad7011a-3c78-4c96-b3aa-624aaecf444b" />

## Editions

### Community Edition (Free) — Available Now

The Community Edition provides robust seed phrase protection using Shamir secret sharing:

- **2-of-3 Shamir secret sharing** — Split your seed into 3 fragments, any 2 can recover
- **BIP39 validation** — Ensures your seed phrase follows cryptocurrency standards
- **QR code export** — Easy distribution and backup
- **Desktop application** — Runs locally, no internet required
- **Open source** — Full transparency, audit the code yourself

**How it works:**
```
Your Seed → BIP39 Validation → Shamir Split (2-of-3) → 3 Fragments
```

### Pro License — Coming Soon

The Pro License adds enterprise-grade security features for advanced users:

#### 🔐 Double Encryption
- **AES-256-GCM encryption** with passphrase protection **before** Shamir splitting
- **PBKDF2-SHA512 key derivation** (100,000 iterations)
- Even if 2 fragments are compromised, attackers still need your passphrase

**How it works:**
```
Your Seed + Passphrase → BIP39 Validation → AES-256-GCM Encryption → Shamir Split (2-of-3) → 3 Fragments
```

Recovery requires: **Any 2 fragments + your passphrase**

#### ⚙️ Custom M-of-N Configurations
- Create up to **10 fragments** with custom threshold requirements
- Examples:
  - 3-of-5 — Create 5 fragments, need any 3 to recover
  - 5-of-10 — Maximum flexibility for institutional custody
  - 2-of-4 — Balance security and redundancy

#### 🔑 Multisig Security
- Integrate with hardware wallets and multisignature schemes
- Compatible with institutional custody workflows
- Advanced key management for high-value assets

---

**Community vs Pro:**

| Feature | Community (Free) | Pro (Paid) |
|---------|------------------|------------|
| Shamir secret sharing | ✅ 2-of-3 fixed | ✅ Custom M-of-N (up to 10) |
| Passphrase encryption | ❌ | ✅ AES-256-GCM |
| BIP39 validation | ✅ | ✅ |
| QR code export | ✅ | ✅ |
| Multisig support | ❌ | ✅ |
| Priority support | ❌ | ✅ |

## Security details

### Community Edition

#### Shamir secret sharing

- **Threshold:** 2-of-3 — any 2 fragments can reconstruct the seed
- **Library:** [`shamir-secret-sharing`](https://www.npmjs.com/package/shamir-secret-sharing)
- **Information-theoretic security:** Each fragment alone reveals zero information about the secret

#### Why is this secure?

- **Shamir splitting is information-theoretically secure.** A single fragment provides zero mathematical advantage to an attacker. You need at least 2 fragments.
- **No single point of failure.** Distribute fragments to different locations — losing one doesn't lock you out.
- **Offline by default.** All operations run locally on your machine. No internet required.

### Pro Edition (Coming Soon)

#### AES-256-GCM Encryption

- **Algorithm:** AES-256-GCM (authenticated encryption)
- **Key derivation:** PBKDF2 with SHA-512, 100,000 iterations
- **Salt:** 64 bytes, randomly generated per encryption
- **IV:** 16 bytes, randomly generated per encryption
- **Authentication tag:** GCM provides built-in integrity verification — any tampering is detected on decryption

#### Shamir secret sharing

- **Threshold:** Configurable M-of-N (e.g., 2-of-3, 3-of-5, 5-of-10)
- **Max fragments:** Up to 10
- **Library:** [`shamir-secret-sharing`](https://www.npmjs.com/package/shamir-secret-sharing)
- Each fragment alone reveals zero information about the secret (information-theoretic security)

#### Why is this even more secure?

- **Two-layer protection.** Even after recombining fragments, you still need the passphrase to decrypt. Someone who obtains the threshold number of fragments but doesn't know the passphrase cannot recover the seed.
- **Passphrase is never stored.** It only exists in memory during encryption/decryption.
- **Each encryption produces unique output.** Random salt + random IV means encrypting the same seed twice gives completely different ciphertext.
- **GCM authentication** detects if a fragment has been tampered with or if the wrong passphrase is used — decryption fails rather than producing garbage.
- **Flexible thresholds.** Configure the exact security/redundancy balance you need.

## Seed phrase requirements

Kyte validates seed phrases against the [BIP39 standard](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki). A valid seed must:

- Contain **12, 15, 18, 21, or 24 words**
- Use only words from the **BIP39 English wordlist** (2048 words)
- Have a **valid checksum** (the last word encodes a checksum of the entropy)

### Examples

**Valid seeds:**

```
# 24 words — standard BIP39 test vector
abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art

# 12 words — generated by most wallets
journey cluster display fragile oak brief field security digital fetch skull emerge
```

**Invalid seeds (rejected by Kyte):**

```
# Wrong checksum — words are valid but the combination is mathematically invalid
tuna tiny arrow shadow keep moon meal negative direct stadium task ocean

# Invalid word — "cryptooo" is not in the BIP39 wordlist
bridge total merit solar adjust duty fiction average find clarify prize cryptooo

# Too few words — 11 words instead of 12
bridge total merit solar adjust duty fiction average find clarify prize

# Numbers — not BIP39 words
12345 total 12345 67890 duty 67890 lae45 67890 12345 67890 12345 67890
```

Kyte also normalizes input: extra spaces are trimmed and uppercase letters are converted to lowercase.

## Project structure

This is a **pnpm workspace monorepo** with two packages:

```
packages/
├── core/    kyte-core — crypto library (encryption, Shamir, validation, QR)
└── app/     kyte-app  — Electron + React desktop application
```

### `kyte-core`

Pure Node.js library that handles all cryptographic operations:

- `SeedValidator` — BIP39 validation and normalization
- `AESEncryption` — AES-256-GCM encrypt/decrypt with PBKDF2 key derivation (Pro only)
- `ShamirSecret` — Threshold secret sharing (split/combine)
  - Community: Fixed 2-of-3
  - Pro: Configurable M-of-N (up to 10 fragments)
- `generateQR` — QR code generation (PNG data URLs)
- `buildPDF` — PDF generation for fragment export

### `kyte-app`

Electron + React desktop app built with electron-vite. All crypto runs in the **main process** (Node.js) and is exposed to the renderer via IPC — the frontend never handles cryptographic operations directly.

## Getting started

### Prerequisites

- Node.js
- pnpm

### Install & run

```bash
# Install dependencies
pnpm install

# Run in development mode (launches Electron with HMR)
pnpm dev

# Build everything
pnpm build
```

### Run tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch
```

## How it was built

The project was developed in two phases:

1. **Core library first** — All the cryptographic logic was built and tested independently: BIP39 validation, AES-256-GCM encryption with PBKDF2 key derivation (for Pro), and Shamir secret sharing. Unit tests cover each module individually, and integration tests verify the full round trip.

2. **Desktop app second** — The Electron + React application was co-developed with Claude (Anthropic's AI) using [Claude Code](https://claude.ai/code), running locally in the terminal. The app uses IPC to delegate all crypto to the Node.js main process while the React renderer handles the UI. electron-vite handles the build pipeline. This was my first experience building a project collaboratively with an AI assistant through prompt-driven development directly in the terminal.

The Community Edition launched first with Shamir-only protection. The Pro License with double encryption and advanced features is coming soon.
