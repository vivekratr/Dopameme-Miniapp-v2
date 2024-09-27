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


## Images

Here are some screenshots of Dopameme in action:

![Prompt to Image Meme](https://shreyashsingh.publit.io/file/output-0M.jpg)
*Generating an image meme from a prompt.*

![Prompt to Template Meme](https://shreyashsingh.publit.io/file/output-3c.jpg)
*Using a trending template to generate a meme.*

## Running the Frontend

To get the frontend up and running, follow these steps:

### Step 1: Install Dependencies
Run the following command to install all necessary dependencies:

```bash
npm install
```
or 
```bash
yarn
```
### Step 2: Start the Development Server
Run the following command to start the development server:

```bash
npm run dev
```

```bash
yarn dev
```

## Pre-Requisite

Follow these steps to start using the product:

### Step 1: Connect Your Wallet
Click the **"Connect"** button to connect your wallet to the platform.

### Step 2: Get Arbitrum Sepolia ETH
To interact with the platform, you'll need some Arbitrum Sepolia ETH. Obtain it from the following faucet:

[Arbitrum Sepolia Faucet](https://arbitrum.faucet.dev/Sepolia)

### Step 3: Add Environment variables:
here is the sample keys:
```VITE_NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID='' # Required - https://cloud.walletconnect.com/```
```VITE_NEXT_PUBLIC_ENABLE_TESTNETS='true' # true or false```
```VITE_NODE_ENV='development' # development or production```

### Step 3: Register
Once your wallet is connected, you will be prompted to register. Follow the on-screen instructions to complete your registration.


## Getting Started

1. **Sign Up/Log In**: Create an account or log in to start making memes.
2. **Choose Your Meme Type**: Select from photo to meme, prompt to image meme, prompt to video meme, or prompt to template meme.
3. **Upload/Enter Prompt**: Upload your media or enter a text prompt.
4. **Generate and Share**: Let Dopameme do the rest! Share your creations on social media directly from the platform.
5. **Tip and Earn**: Engage with the community by tipping other users or earning tips for your memes, all through your dynamic wallet.

## Deployment on Spheron (For Flask Application - Python)

### Step 1: Install Spheron Protocol `sphnctl` CLI (Linux, MacOS)

To install the Spheron Protocol CLI using a script, ensure you have `curl` installed on your system. You can check if `curl` is installed by running:

```bash
curl --version
```

If `curl` is installed, proceed with installing the Spheron Protocol CLI:

```bash
curl -sL https://sphnctl.sh | bash
```

After installation, verify that the CLI is installed correctly by checking the version:

```bash
sphnctl -h
```

### Step 2: Build and Push Docker Image

Before deploying your Flask application, you need to build and push your Docker image to a container registry.

1. **Build the Docker Image**:  
   Navigate to your project directory and run:

   ```bash
   docker build -t <your-dockerhub-username>/<your-image-name>:latest .
   ```

   Replace `<your-dockerhub-username>` and `<your-image-name>` with your Docker Hub username and the desired image name.

2. **Push the Docker Image**:  
   After building the image, push it to Docker Hub or your preferred container registry:

   ```bash
   docker push <your-dockerhub-username>/<your-image-name>:latest
   ```

### Step 3: Create a New Wallet Using the CLI

To create a new wallet for Spheron, use the CLI:

```bash
sphnctl wallet create --name [wallet-name]
```

Replace `[wallet-name]` with your desired wallet name. Make sure to securely save the mnemonic phrase and key secret provided.

### Step 4: Get Test Tokens from the Faucet

Visit the [Spheron Faucet](https://faucet.spheron.network/) to obtain test tokens for deployment. After receiving the tokens, you can check your wallet balance with:

```bash
sphnctl wallet balance --token USDT
```

### Step 5: Get Arbitrum Sepolia ETH

To deploy your application on the Arbitrum Sepolia chain, you'll need test ETH tokens. Use any of these faucets:

- [QuickNode Faucet](https://faucet.quicknode.com/arbitrum/sepolia)
- [Alchemy Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Faucet](https://faucets.chain.link/arbitrum-sepolia)
- [LearnWeb3 Faucet](https://learnweb3.io/faucets/arbitrum_sepolia/)

### Step 6: Deposit Tokens to Your Escrow Balance

Deposit USDT or another token to your escrow wallet for deployment:

```bash
sphnctl payment deposit --amount 10000000 --token USDT
```

Ensure your balance is unlocked and sufficient:

```bash
sphnctl wallet balance --token USDT
```

### Step 7: Deploy the Flask Application

Create an ICL configuration file (e.g., `gpu.yml`) for your deployment:

```yaml
version: "1.0"

services:
  web:
    image: <your-dockerhub-username>/<your-image-name>:latest
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

Make sure to replace `<your-dockerhub-username>/<your-image-name>` with your actual Docker Hub username and image name.

Deploy the configuration file on Spheron:

```bash
sphnctl deployment create gpu.yml
```

### Step 8: Access Your Deployment

To get details about your deployment, including the URL, ports, and status, run:

```bash
sphnctl deployment get --lid [Lease ID]
```

Replace `[Lease ID]` with your actual lease ID obtained after deployment.

### Conclusion

Following these steps will help you successfully deploy your Flask application on Spheron using Python. Be sure to keep your wallet keys secure and monitor your deployment for any issues.



## License
Dopameme is licensed under the MIT License. See `LICENSE` for more information.
---
