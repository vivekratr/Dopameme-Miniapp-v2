# Dopameme

Welcome to **Dopameme**, the ultimate platform for creating all kinds of memes! Whether you're looking to generate memes from photos, prompts, videos, or trending templates, Dopameme has got you covered. Dive into the world of humor and creativity with our intuitive meme-making tools.

## Features

### 1. Photo to Meme
Turn any photo into a meme effortlessly!
- **Upload or Click a Photo**: Users can either upload an existing image or click a new one.
- **Add a Description (Optional)**: Provide a description for the image, and the model will create a meme based on it. If no description is provided, our intelligent model will analyze the image and generate a suitable meme caption automatically.

### 2. Prompt to Image Meme
Generate memes from simple text prompts!
- **Anime Meme Generator**: Provide a text prompt, and our model will create an anime-style meme.
- **Real Image Meme Generator**: Similarly, provide a text prompt to generate memes using real images.

### 3. Prompt to Video Meme
Create hilarious video memes with ease!
- **Upload a Video**: Users can upload a video and provide a description of what's happening. The model will then generate the most suitable caption for the video.
- **Generate from Prompt**: Provide a text prompt, and the platform will select a trending video template to create a meme.

### 4. Prompt to Template Meme
Let the trends guide your meme creation!
- **Trending Template Selection**: Simply provide a text prompt, and Dopameme will pick the most trending photo template to craft your meme.

## Arbitrum Sepolia Integration

Dopameme is built on **Arbitrum Sepolia**, bringing decentralized features to the platform:

- **Tipping System**: Users can tip other users for sharing and liking memes. This feature incentivizes creativity and engagement within the community.
- **Dynamic Wallets**: Dopameme uses dynamic wallets to facilitate seamless transactions. Every user gets a wallet that can be used for tipping and receiving tips, all powered by Arbitrum Sepolia.

## Getting Started

1. **Sign Up/Log In**: Create an account or log in to start making memes.
2. **Choose Your Meme Type**: Select from photo to meme, prompt to image meme, prompt to video meme, or prompt to template meme.
3. **Upload/Enter Prompt**: Upload your media or enter a text prompt.
4. **Generate and Share**: Let Dopameme do the rest! Share your creations on social media directly from the platform.
5. **Tip and Earn**: Engage with the community by tipping other users or earning tips for your memes, all through your dynamic wallet.

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
    image: usename/project_title:latest
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
  duration: 200min
  tier:
    - community
  compute:
    web:
      resources:
        cpu:
          units: 0.5
        memory:
          size: 1Gi
        storage:
          size: 1Gi
  placement:
    westcoast:
      attributes:
        region: us-west
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
sphnctl deployment create cpu.yml
```

### Step 7: Access Your Deployment

To access your deployment details:

```bash
sphnctl deployment get --lid [Lease ID]
```

This will provide the URL, ports, and status of your deployment.

## Images

Here are some screenshots of Dopameme in action:

![Photo to Meme](https://i.imgur.com/sRW5hpm.jpeg)
*The Photo to Meme feature in action.*

![Prompt to Image Meme](https://shreyashsingh.publit.io/file/output-0M.jpg)
*Generating an image meme from a prompt.*

![Prompt to Video Meme](https://i.imgur.com/7jOTSED.gif)
*Creating a video meme with a given prompt.*

![Prompt to Template Meme](https://shreyashsingh.publit.io/file/output-3c.jpg)
*Using a trending template to generate a meme.*

## License
Dopameme is licensed under the MIT License. See `LICENSE` for more information.
---
