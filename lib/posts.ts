export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: 'Development' | 'Ecosystem' | 'Technical' | 'Research';
  date: string;
  author: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Getting Started with Move Language on Sui",
    excerpt: "Move is Sui's native programming language designed for secure, formal-verification-friendly smart contracts. In this tutorial, we walk through your first Move module on Sui.",
    content: `## Getting Started with Move Language on Sui

Move is Sui's native programming language, purpose-built for secure smart contract development. Unlike Solidity or Rust, Move uses a **resource-oriented paradigm** — assets are modeled as resources that can never be copied or accidentally destroyed.

### Your First Move Module

\`\`\`move
module examples::hello_world {
    use std::string::String;
    
    public fun greet(name: String): String {
        std::string::utf8(b"Hello, ") + name
    }
}
\`\`\`

### Why Move?

- **Type Safety**: Resources can only exist in one place at a time
- **Formal Verification**: Move's bytecode verifier prevents entire classes of exploits
- **Parallel Execution**: Sui's object model enables true horizontal scaling

### Next Steps

Explore the [Sui Move Book](https://docs.sui.io/concepts/sui-move) for deeper dives into modules, objects, and the type system.

---

*Author: 0x7a3f...b9c2*`,
    category: 'Development',
    date: '2026-04-15',
    author: '0x7a3f1e9d2b8c4f6a0e5d3b7c9a2f4e8d'
  },
  {
    id: 2,
    title: "Building a Decentralized Todo App on Sui",
    excerpt: "Learn how to build a full-stack dApp on Sui with a React frontend. We'll cover object creation, permissions, and state management using Sui's object model.",
    content: `## Building a Decentralized Todo App on Sui

A practical guide to building a permissioned todo list as a Sui dApp. Every task is a **Sui object** — owned, transferable, and verifiable on-chain.

### Defining the Task Object

\`\`\`move
struct Task has key, store {
    id: UID,
    title: String,
    completed: bool,
    owner: address,
}
\`\`\`

### React Frontend Integration

\`\`\`typescript
import { useWallet } from '@suiet/wallet-kit';

export function CreateTask() {
  const { signAndExecuteTransaction } = useWallet();
  
  async function handleCreate(title: string) {
    // Transaction to create a Task object on-chain
  }
}
\`\`\`

The combination of Move's resource model and Sui's parallel execution makes dApp development both secure and fast.

---

*Author: 0x3b7c...f2a9*`,
    category: 'Development',
    date: '2026-04-12',
    author: '0x3b7c9d2a1f5e4b8c7d0e3f6a9b2c5d8'
  },
  {
    id: 3,
    title: "Sui's Object Model: Deep Dive",
    excerpt: "Everything on Sui is an object. Owned, shared, immutable — understanding this model is fundamental to designing effective Sui applications.",
    content: `## Sui's Object Model: Deep Dive

In Sui, **every piece of state is an object**. This is not a metaphor — it's the core of the protocol's design.

### Three Object Types

| Type | Mutability | Ownership | Use Case |
|------|-----------|-----------|----------|
| **Owned** | Immutable once created | Single address | NFTs, user data |
| **Shared** | Mutable by anyone | Consensus | DeFi protocols, boards |
| **Immutable** | Never mutable | None | Config, metadata |

### Object Composability

Objects can own other objects, enabling expressive composability:

\`\`\`move
struct Portfolio has key {
    id: UID,
    items: vector<Object>,
    total_value: u64,
}
\`\`\`

This is what makes Sui's model so powerful — you're not constrained to token transfers, you can compose complex on-chain state graphs.

---

*Author: 0x2c8f...e4b1*`,
    category: 'Technical',
    date: '2026-04-10',
    author: '0x2c8f4e1a7b9d3c5f6a0e2b4d7c9f1a3'
  },
  {
    id: 4,
    title: "Sui Ecosystem Report: Q1 2026",
    excerpt: "A comprehensive look at Sui's ecosystem growth in Q1 2026 — new protocols, TVL milestones, developer tooling improvements, and what's coming next.",
    content: `## Sui Ecosystem Report: Q1 2026

Q1 2026 marked a turning point for Sui. Here's the full picture.

### Key Metrics

- **TVL**: Grew from $1.4B to $2.1B (+50%)
- **Daily Transactions**: Peaked at 14.2M on March 28
- **Active dApps**: 127 protocols live on mainnet
- **Developers**: 3,400+ active Move developers

### Notable Launches

1. **Navi Protocol** — Decentralized lending with 0 gas fees
2. **Flowscoin** — AMM with concentrated liquidity
3. **SuiNames** — Decentralized domain service

### What's Coming

Q2 2026 roadmap includes zkLogin improvements, a dedicated NFT marketplace, and the Sui Playground testnet redesign.

---

*Author: 0x5d2a...c7f3*`,
    category: 'Ecosystem',
    date: '2026-04-08',
    author: '0x5d2a7b9c3e1f4a6d8b0c2e5f7a9d3b1'
  },
  {
    id: 5,
    title: "Understanding Sui's Consensus Mechanism",
    excerpt: "Sui doesn't use traditional Byzantine fault-tolerant consensus for simple transactions. We explain the difference between narwhal, Bullshark, and Sui's own quorum key system.",
    content: `## Understanding Sui's Consensus Mechanism

One of Sui's most distinctive features is its **dual-mode execution** model. Simple transfers don't go through full consensus at all.

### Two Execution Paths

**Certified Stamp (no consensus needed)**:
For owned-object transactions (e.g., a simple SUI transfer), Sui uses a **Certified Stamp** — a lightweight form of asynchronous verification that doesn't require total ordering.

**Consensus (for shared objects)**:
For transactions that touch shared state, Sui uses **Bullshark** — a DAG-based consensus protocol with excellent throughput characteristics.

### Why This Matters

| Transaction Type | Latency | Throughput |
|----------------|---------|------------|
| Owned object | < 500ms | Unlimited |
| Shared object | ~2s | 100k+ TPS |

This is why Sui can claim < 500ms finality for most transactions.

---

*Author: 0x1e9f...a8c4*`,
    category: 'Technical',
    date: '2026-04-05',
    author: '0x1e9f3a7b5c8d2f6a4e0b9d3c7f1a5e2'
  },
  {
    id: 6,
    title: "zkLogin: Passwordless Web3 Onboarding",
    excerpt: "Sui's zkLogin enables Web2-style authentication for Web3 apps. Users can sign in with their Google or Twitch account — no seed phrases, no browser extensions.",
    content: `## zkLogin: Passwordless Web3 Onboarding

zkLogin is one of Sui's most user-friendly innovations. It allows users to authenticate using their **existing Web2 identities** — and the proof is generated entirely on-device.

### How It Works

\`\`\`typescript
import { generateNonce, getJwtSignature } from '@noble/zklogin';

const nonce = generateNonce();
const { epoch, payload } = getJwtSignature(userJwt, nonce);
// User signs in with OAuth — zk proof generated client-side
\`\`\`

### Security Model

- **Zero-knowledge proof**: Your OAuth credentials are never exposed
- **Device-bound**: The session is tied to your device
- **Recoverable**: With an associated email or phone number

### UX Comparison

| Method | Setup Time | Recovery | Security |
|--------|-----------|----------|----------|
| Seed phrase | 5-10 min | Difficult | High |
| Hardware wallet | 10-15 min | Easy | Very High |
| **zkLogin** | **10 seconds** | **Easy** | **High** |

---

*Author: 0x8c4f...d2b7*`,
    category: 'Research',
    date: '2026-04-02',
    author: '0x8c4f2a9d7b1e5f3a6c0b4d8e2f7a9c1'
  },
  {
    id: 7,
    title: "Move vs Rust: Which Should You Learn?",
    excerpt: "Both Move and Rust compile to WebAssembly and promise memory safety. But their mental models, ecosystems, and use cases differ significantly.",
    content: `## Move vs Rust: Which Should You Learn?

A pragmatic comparison for developers deciding where to invest their time.

### Quick Comparison

| Dimension | Move | Rust |
|-----------|------|------|
| **Paradigm** | Resource-oriented | Systems programming |
| **Target** | Blockchain VMs | General + WASM |
| **Learning curve** | Moderate | Steep |
| **Ecosystem** | Sui, Aptos | Large, general |
| **Formal verification** | Built-in capabilities | Manual annotations |

### When to Choose Move

- You want to build on Sui or Aptos
- You need formal verification for financial contracts
- You prefer a language designed specifically for assets

### When to Choose Rust

- You're building general Web3 infrastructure (nodes, clients)
- You need maximum control and performance
- You want a broader job market outside blockchain

### The Verdict

For blockchain-specific development, **Move is the clear choice for Sui/Aptos**. For general smart contract development on Ethereum or Solana, Rust (via Anchor or native) remains dominant.

---

*Author: 0x4a1d...e9f2*`,
    category: 'Research',
    date: '2026-03-28',
    author: '0x4a1d7c9e2f8b3a6d5f0c1e4a9b7d2f5'
  },
  {
    id: 8,
    title: "Deploying Your First NFT Collection on Sui",
    excerpt: "A step-by-step guide to launching an NFT collection on Sui using the Sui TypeScript SDK. Covering candy machine, metadata standards, and IPFS integration.",
    content: `## Deploying Your First NFT Collection on Sui

Sui's object model makes NFTs first-class citizens — each NFT is a distinct object with its own on-chain data. Here's how to deploy a collection.

### Project Setup

\`\`\`bash
npm install @mysten/sui
npx @mysten/sui init my-nft-project
\`\`\`

### The NFT Module

\`\`\`move
module nft::my_collection {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;
    
    struct NFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: String,
    }
    
    public fun mint(
        name: String,
        description: String,
        url: String,
        ctx: &mut TxContext
    ): NFT {
        NFT { id: object::new(ctx), name, description, url }
    }
}
\`\`\`

### Metadata Standards

Sui uses a **custom metadata standard** compatible with Ethereum's ERC-721 for cross-platform compatibility. Images are stored on IPFS with on-chain URL references.

---

*Author: 0x9d2f...b5c8*`,
    category: 'Development',
    date: '2026-03-25',
    author: '0x9d2f5a8c1e7b3f6a4d0c9e2f5a8b1c4d'
  },
];

export function getPostById(id: number): Post | undefined {
  return posts.find(p => p.id === id);
}

export function getPostsByCategory(category: string): Post[] {
  if (category === 'All') return posts;
  return posts.filter(p => p.category === category);
}

export function formatAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
