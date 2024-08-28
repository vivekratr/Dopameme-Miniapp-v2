## Deployment on Spheron (For Flask Application - Python)

### Step 1: Install Spheron Protocol sphnctl CLI (Linux, MacOS)

To install Spheron Protocol CLI using a script, make sure you have `curl` installed on your system. Check with:

```bash
curl --version
```

To install the Spheron Protocol CLI on your system, run this command and enter the password when prompted:

```bash
curl -sL1 https://sphnctl.sh | bash
```

Verify the installation by checking the Spheron version:

```bash
sphnctl -h
```

### Step 2: Create a New Wallet Using the CLI

To create a new wallet, configure the name of your key:

```bash
sphnctl wallet create --name [wallet name]
```

Save the mnemonic phrase and key secret securely.

### Step 3: Get Some Test Tokens from the Faucet

Visit the [Spheron Faucet](https://faucet.spheron.network/) to obtain test tokens. After receiving the tokens, check your wallet balance:

```bash
sphnctl wallet balance --token USDT
```

### Step 4: Get Some Arbitrum Sepolia ETH

Use any of the following faucets to obtain test ETH tokens for the Arbitrum Sepolia chain:

- [QuickNode Faucet](https://faucet.quicknode.com/arbitrum/sepolia)
- [Alchemy Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Faucet](https://faucets.chain.link/arbitrum-sepolia)
- [LearnWeb3 Faucet](https://learnweb3.io/faucets/arbitrum_sepolia/)

### Step 5: Deposit Tokens to Your Escrow Balance

Deposit USDT or any other token to the escrow wallet:

```bash
sphnctl payment deposit --amount 10000000 --token USDT
```

Ensure you have an unlocked balance:

```bash
sphnctl wallet balance --token USDT
```

### Step 6: Deploy the Flask Application

Create an ICL configuration file (e.g., `cpu.yml`):

```yaml
---
version: "1.0"
 
services:
  web:
    image: shreyashsingh1/dopam:latest
    expose:
      - port: 5000
        as: 5000
        to:
          - global: true
    env:
      - TEST=test

    command: ["python", "application.py"]
  
profiles:
  name: hello-world
  duration: 640min
  tier:
    - community
  compute:
    web:
      resources:
        cpu:
          units: 0.5
        memory:
          size: 16Gi
        storage:
          size: 16Gi

        gpu:
          units: 1
          attributes:
            vendor:
              nvidia:
                - model: t1000
  placement:
    westcoast:
      attributes:
        region: us-central
      pricing:
        web:
          denom: USDT
          amount: 500000
 
deployment:
  web:
    westcoast:
      profile: web
      count: 1
      
```

Deploy the configuration on Spheron Protocol:

```bash
sphnctl deployment create gpu.yml
```

### Step 7: Access Your Deployment

To access your deployment details:

```bash
sphnctl deployment get --lid [Lease ID]
```

This will provide the URL, ports, and status of your deployment.



