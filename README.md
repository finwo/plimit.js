# plimit

Simple promise concurrency limiter

## Installation

```sh
npm install --save @finwo/p-limit
```

```js
# node
import { plimit } from 'plimit';
```

```html
<!-- browser -->
<script src="/path/to/plimit/index.js"></script>
<script>
  // use window.plimit
</script>
```

## Usage

The package assumes native promises are available

This example shows iterating over accounts without loading all into memory

```js
import { MoreThan } from 'typeorm';
import { Account } from './model/account'; // typeorm model

const runner    = plimit(4); // runner that allows 4 concurrent tasks
let   accountId = '';

while(true) {
  const account = await Account.findOne({ uuid: MoreThan(accountId) });
  if (!account) break;
  accountId = account.uuid;

  // resolves instantly it's queue is not full
  // waits for a previous task if it's queue is full
  await runner.push(async () => {
    // some lengthy process on the account
  });
}

// Process remainder
await runner.flush();
```
