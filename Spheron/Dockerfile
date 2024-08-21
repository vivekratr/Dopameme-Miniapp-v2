FROM python:3.11-slim

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \  
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

WORKDIR /memish

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "application.py"]