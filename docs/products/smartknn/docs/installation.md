# Installation

This page describes how to install **SmartKNN** in a clean, reproducible, and production-safe manner.

SmartKNN is designed to run efficiently on **CPU-only environments** and does not require GPU support.

---

## System Requirements

Before installing SmartKNN, ensure the following:

- **Python**: 3.8 or newer
- **Operating System**: Linux, macOS, or Windows
- **Architecture**: x86_64 (ARM support may be limited)
- **Memory**: Sufficient RAM for dataset size

SmartKNN does not require CUDA or GPU drivers.

---

## Recommended Environment Setup

It is strongly recommended to install SmartKNN inside a virtual environment.

### Create a Virtual Environment

---

## Install SmartKNN

### Option 1: Install from PyPI (Recommended)

```bash
pip install smart-knn
```
This installs the latest stable release.

### Option 2: Install from Source (Development)

Use this option if you want the latest development version or plan to contribute.

```bash 
git clone https://github.com/thatipamula-jashwanth/smart-knn.git
cd smart-knn
pip install -e .
```
---

## Verify Installation

After installation, verify that SmartKNN is available:

```bash
python -c "from smart_knn import SmartKNN; print(SmartKNN)"
```

You should see a reference to the **SmartKNN** class without errors.

---

## Quick Sanity Check

Run a minimal example to confirm everything works:

```bash
python - <<EOF
from smart_knn import SmartKNN
import numpy as np

X = np.random.rand(100, 5)
y = np.random.rand(100)

model = SmartKNN()
model.fit(X, y)

pred = model.predict(X[:1])
print("Prediction:", pred)
EOF
```
If this runs without errors, SmartKNN is installed correctly.

---

## Common Installation Issues

**Python Version Errors**

Ensure you are using Python 3.8 or newer:

```bash
python --version
```

**Permission Errors**

- Avoid global installs.
- Always use a virtual environment if you encounter permission issues.

**Numba Compilation Warnings**

- The first execution may trigger JIT compilation warnings.
- This is expected and typically occurs only once per environment.

---

## Updating SmartKNN

```bash
pip install --upgrade smart-knn
```

---

## Uninstallation

```bash
pip uninstall smart-knn
```

