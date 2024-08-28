Here's a refined guide for deploying a Flask application on Spheron using Python, with added steps for building and pushing your Docker image.

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

Create an ICL configuration file (e.g., `cpu.yml`) for your deployment:

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
sphnctl deployment create cpu.yml
```

### Step 8: Access Your Deployment

To get details about your deployment, including the URL, ports, and status, run:

```bash
sphnctl deployment get --lid [Lease ID]
```

Replace `[Lease ID]` with your actual lease ID obtained after deployment.

### Conclusion

Following these steps will help you successfully deploy your Flask application on Spheron using Python. Be sure to keep your wallet keys secure and monitor your deployment for any issues.
