// SUI Blockchain Blog System - Smart Contract
// This module handles user registration, wallet management, and immutable blog posts

module blog_system::blog {
    use std::string::String;
    use sui::object::UID;
    use sui::object::ID;
    use sui::transfer;
    use sui::tx_context::TxContext;
    use sui::tx_context;
    use sui::coin::Coin;
    use sui::sui::SUI;
    use std::vector;

    // ============== ERRORS ==============
    const E_USERNAME_TAKEN: u64 = 1;
    const E_USER_NOT_FOUND: u64 = 2;
    const E_INVALID_PASSWORD: u64 = 3;
    const E_NOT_AUTHOR: u64 = 4;
    const E_POST_NOT_FOUND: u64 = 5;

    // ============== STRUCTS ==============
    
    /// User profile stored on-chain
    struct UserProfile has key, store {
        id: UID,
        username: String,
        password_hash: String,  // SHA-256 hash of password
        wallet_address: address,
        created_at: u64,
        post_count: u64
    }

    /// Blog post - IMMUTABLE once created
    /// To "update", users publish a NEW post
    struct BlogPost has key, store {
        id: UID,
        post_id: u64,
        author: address,
        author_username: String,
        title: String,
        content: String,
        timestamp: u64,
        block_height: u64,
        version: u64,  // Version number for this post
        previous_post_id: Option<ID>  // Link to previous version if any
    }

    /// Global state to track users and posts
    struct GlobalState has key {
        id: UID,
        users: vector<address>,  // List of all user addresses
        posts: vector<ID>,       // List of all post IDs
        total_users: u64,
        total_posts: u64,
        username_to_address: vector<UsernameRecord>
    }

    /// Mapping username to address
    struct UsernameRecord has store {
        username: String,
        address: address
    }

    /// Option wrapper for Move
    struct Option<phantom T> has copy, drop, store {
        vec: vector<T>
    }

    // ============== FUNCTIONS ==============

    /// Initialize the blog system
    fun init(ctx: &mut TxContext) {
        let global_state = GlobalState {
            id: object::new(ctx),
            users: vector::empty(),
            posts: vector::empty(),
            total_users: 0,
            total_posts: 0,
            username_to_address: vector::empty()
        };
        transfer::share_object(global_state);
    }

    /// Register a new user with username and password
    /// Creates a new user profile and associates a wallet address
    public fun register_user(
        username: String,
        password_hash: String,
        state: &mut GlobalState,
        ctx: &mut TxContext
    ): address {
        let sender = tx_context::sender(ctx);
        
        // Check if username is taken
        let i = 0;
        let len = vector::length(&state.username_to_address);
        while (i < len) {
            let record = vector::borrow(&state.username_to_address, i);
            assert!(record.username != username, E_USERNAME_TAKEN);
            i = i + 1;
        };
        
        // Create user profile
        let user = UserProfile {
            id: object::new(ctx),
            username: username,
            password_hash: password_hash,
            wallet_address: sender,
            created_at: tx_context::timestamp(ctx),
            post_count: 0
        };
        
        // Transfer to user (they own their profile)
        transfer::transfer(user, sender);
        
        // Update global state
        vector::push_back(&mut state.users, sender);
        vector::push_back(&mut state.username_to_address, UsernameRecord {
            username,
            address: sender
        });
        state.total_users = state.total_users + 1;
        
        sender
    }

    /// Create a new blog post
    /// Posts are IMMUTABLE - to update, create a new post
    public fun create_post(
        title: String,
        content: String,
        state: &mut GlobalState,
        ctx: &mut TxContext
    ): ID {
        let sender = tx_context::sender(ctx);
        
        // Get current timestamp and block height
        let timestamp = tx_context::timestamp(ctx);
        let block_height = tx_context::epoch(ctx);
        
        // Get post count for ID
        let post_id = state.total_posts;
        
        // Create the post
        let post = BlogPost {
            id: object::new(ctx),
            post_id,
            author: sender,
            author_username: string::utf8(b"Anonymous"),  // Will be set from user profile
            title,
            content,
            timestamp,
            block_height,
            version: 1,
            previous_post_id: option::none()
        };
        
        let post_id_obj = object::id(&post);
        
        // Share the post (readable by everyone)
        transfer::share_object(post);
        
        // Update global state
        vector::push_back(&mut state.posts, post_id_obj);
        state.total_posts = state.total_posts + 1;
        
        post_id_obj
    }

    /// Get all posts (for feed)
    public fun get_all_posts(state: &GlobalState): &vector<ID> {
        &state.posts
    }

    /// Get user's address by username
    public fun get_address_by_username(username: String, state: &GlobalState): address {
        let i = 0;
        let len = vector::length(&state.username_to_address);
        while (i < len) {
            let record = vector::borrow(&state.username_to_address, i);
            if (record.username == username) {
                return record.address
            };
            i = i + 1;
        };
        @0x0
    }

    /// Get total stats
    public fun get_stats(state: &GlobalState): (u64, u64) {
        (state.total_users, state.total_posts)
    }

    /// Check if username exists
    public fun username_exists(username: String, state: &GlobalState): bool {
        let i = 0;
        let len = vector::length(&state.username_to_address);
        while (i < len) {
            let record = vector::borrow(&state.username_to_address, i);
            if (record.username == username) {
                return true
            };
            i = i + 1;
        };
        false
    }
}

// Helper module for Option
module blog_system::option {
    use std::vector;
    
    public fun none<T>(): vector<T> {
        vector::empty()
    }
    
    public fun some<T>(value: T): vector<T> {
        let vec = vector::empty();
        vector::push_back(&mut vec, value);
        vec
    }
    
    public fun is_none<T>(vec: &vector<T>): bool {
        vector::is_empty(vec)
    }
}
