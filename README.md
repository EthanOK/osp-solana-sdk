# Init OSP Program

```ts
const wallet = window.solana;

const ospProgram = new OSPProgram(connection, new Wallet(user_keypair));
```

# OSP Program Methods

## initialize Profile

```ts
const initializeProfile_rs = await ospProgram.initializeProfile(
  handle_name,
  uriProfile,
  uriFollowMint
);
console.log("initializeProfile:", initializeProfile_rs);
```
