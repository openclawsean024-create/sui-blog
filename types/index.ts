export interface Post {
  id: string;
  title: string;
  content: string; // Markdown
  category: 'Development' | 'Ecosystem' | 'Technical' | 'Research';
  tags: string[];
  author: string; // wallet address
  date: string; // ISO date
  coverImage?: string;
  txHash?: string;
  ipfsCid?: string;
}

export const CATEGORIES = ['Development', 'Ecosystem', 'Technical', 'Research'] as const;
export type Category = typeof CATEGORIES[number];

export const DEMO_POSTS: Post[] = [
  {
    id: '1',
    title: "Getting Started with Sui Move — A Developer's Guide",
    content: `# Getting Started with Sui Move\n\nMove is a smart contract language designed for safe digital asset management. On Sui, everything is an object.\n\n## Object Model\n\nSui's object model is fundamentally different from Ethereum's account-based model. Each object has:\n- Unique ID\n- Owner (address, another object, or "shared")\n- Type (determined by the module that created it)\n\n\`\`\`move\npublic struct Coin has key, store {\n    id: UID,\n    value: u64,\n}\n\`\`\`\n\n## Key Concepts\n\n1. **Ownership**: Objects can be owned by addresses, other objects, or shared\n2. **Transferability**: With \`store\` ability, objects can be transferred\n3. **Versioning**: Each transaction increments object version\n\nStart building today at [docs.sui.io](https://docs.sui.io)`,
    category: 'Development',
    tags: ['Move', 'Tutorial', 'Smart Contract'],
    author: '0x1234567890abcdef1234567890abcdef12345678',
    date: '2026-03-28',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
  },
  {
    id: '2',
    title: 'Sui Name Service (SNS) — Decentralized Identity on Sui',
    content: `# Sui Name Service (SNS)\n\nHuman-readable names for the Sui blockchain ecosystem.\n\n## What is SNS?\n\nSNS is a decentralized naming service built natively on Sui. Just like ENS on Ethereum, SNS lets you register names like \`alice.sui\` and use them instead of long hex addresses.\n\n## Features\n\n- **Subdomain Management**: Create subdomains for different purposes\n- **NFT-based**: Names are ERC-721 compatible NFTs on Sui\n- **Secondary Market**: Trade names freely\n\nGet your name today at sns.domains`,
    category: 'Ecosystem',
    tags: ['SNS', 'Identity', 'Naming'],
    author: '0xabcdef1234567890abcdef1234567890abcdef12',
    date: '2026-03-25',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    txHash: '0x1234567890abcdef1234567890abcdef12345678',
  },
  {
    id: '3',
    title: "Deep Dive: Sui's Object Model vs EVM Account Model",
    content: `# Sui vs EVM: Object vs Account Model\n\n## EVM Account Model\n\nIn Ethereum, state is stored in accounts:\n- Externally Owned Accounts (EOAs)\n- Contract Accounts\n\nEach account has a balance and storage trie.\n\n## Sui Object Model\n\nSui treats everything as an object:\n\n\`\`\`move\npublic struct MyObject has key, store {\n    id: UID,\n    data: vector<u8>,\n}\n\`\`\`\n\n## Why This Matters\n\n1. **Parallel Execution**: Independent objects can be processed in parallel\n2. **Lower Latency**: No global ordering for independent transactions\n3. **Fine-grained Ownership**: Assets are explicit objects, not balance entries`,
    category: 'Technical',
    tags: ['Architecture', 'Comparison', 'Deep Dive'],
    author: '0x9876543210fedcba9876543210fedcba98765432',
    date: '2026-03-20',
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  },
  {
    id: '4',
    title: 'Building a NFT Marketplace on Sui with Kiosk',
    content: `# Building a NFT Marketplace on Sui with Kiosk\n\nSui's Kiosk framework provides native NFT marketplace functionality with royalty enforcement built in.\n\n## What is Kiosk?\n\nKiosk is a primitive for discovering, purchasing, and trading assets on Sui. It combines:\n- Trading cap for creators\n- Secure trading primitives\n- Royalty enforcement\n\n## Creating a Marketplace\n\n\`\`\`move\nlet kiosk = Kiosk::new(&mut tx_ctx);\nlet (cap, kiosk) = kiosk.new_with_cap(&mut tx_ctx);\n\`\`\`\n\nStart building at [docs.sui.io](https://docs.sui.io)`,
    category: 'Development',
    tags: ['NFT', 'Kiosk', 'Marketplace'],
    author: '0xabcdef1234567890abcdef1234567890abcdef12',
    date: '2026-03-15',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  },
  {
    id: '5',
    title: 'The Sui Economy — Tokenomics and Sustainable Growth',
    content: `# Sui Economy & Tokenomics\n\n## The SUI Token\n\nSUI is the native token of the Sui network:\n- Used for gas fees\n- Staking for network security\n- Governance participation\n\n## Token Distribution\n\n- Community Treasury: Major allocation\n- Strategic Partners: Ecosystem growth\n- Team: Long-term vesting\n\n## Staking Rewards\n\nEpoch-based rewards for validators and their delegators. The inflation rate adjusts based on staking participation.`,
    category: 'Research',
    tags: ['Tokenomics', 'Economics', 'Staking'],
    author: '0x1234567890abcdef1234567890abcdef12345678',
    date: '2026-03-10',
    coverImage: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80',
  },
  {
    id: '6',
    title: 'Privacy on Sui — ZK Proofs and Zero-Knowledge Transactions',
    content: `# Privacy on Sui with Zero-Knowledge Proofs\n\n## The Privacy Challenge\n\nPublic blockchains expose all transaction data. ZK proofs allow proving knowledge without revealing the data.\n\n## zkLogin on Sui\n\nSui's zkLogin enables:\n- Social login (Google, Twitch, etc.)\n- Self-custody with familiar auth\n- No seed phrase required\n\n\`\`\`typescript\nconst zkLogin = await generateZkLogin({\n    provider: 'google',\n    audience: 'https://auth.sui.io',\n});\n\`\`\`\n\n## Future: Private Transactions\n\nOngoing research into enabling fully private transactions using ZK-SNARKs and bulletproofs.`,
    category: 'Technical',
    tags: ['Privacy', 'ZK', 'zkLogin'],
    author: '0x9876543210fedcba9876543210fedcba98765432',
    date: '2026-03-05',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
  },
];
