# Versioning and Release History

SmartKNN follows a **clear, incremental versioning strategy** focused on correctness, performance, and production readiness.

Major releases introduce architectural or behavioral changes.  
Minor releases focus on stability, safety, and incremental improvements.

This page documents notable releases and their design intent.

---

## Release 0.2.0 — SmartKNN v2

**SmartKNN v2** marks a major architectural milestone.

This release introduces a fully optimized, scalable system supporting both **classification and regression** with ultra-low latency inference.

---

### Major Changes

- Full **classification support restored**
- Introduction of a scalable **ANN backend** for fast neighbor search
- **Brute-force backend** retained and optimized for small datasets
- Designed to scale to **millions of rows** with predictable latency

---

### New Features

#### Backend Architecture
- **Approximate Nearest Neighbor (ANN) backend**
  - Optimized for large datasets
  - Optional GPU support for neighbor search
  - Tunable parameters:
    - `nlist` — number of coarse clusters
    - `nprobe` — number of clusters searched per query
  - Safe default values provided

- **Automatic backend selection**
  - Brute backend for small datasets
  - ANN backend for medium and large datasets
  - Automatic fallback to brute-force if ANN quality checks fail

---

#### Core Capabilities
- Full support for **classification and regression**
- **Distance-weighted voting** for classification
- **Distance-weighted local regression** for regression
- **Feature masking** via weight thresholding
- Robust internal handling of **NaN / Inf values**

---

#### Evaluation and Reporting
- Unified automatic evaluation engine
- Automatic task-type inference from target values
- Built-in metrics:
  - Regression: MSE, RMSE, MAE, R²
  - Classification: Accuracy, Precision, Recall, F1, Confusion Matrix
- Safe handling of NaN / Inf during evaluation
- Supports non-numeric classification labels

---

### Performance Improvements

- Fully **vectorized NumPy** execution
- **Numba acceleration** added for:
  - Distance computation
  - Core inner loops
- **Ultra-low latency inference** compared to v1
- Faster configuration and training compared to v1
- Stress-tested on large and heavy datasets

---

### Benchmarks

- Extensive benchmarking across:
  - Classification tasks
  - Regression tasks
  - Large-scale datasets
- Demonstrates:
  - Significant speedups over v1
  - Competitive CPU-only latency compared to tree-based models

---

### Known Limitations

- ANN quality depends on dataset characteristics and parameter tuning
- GPU support is limited to neighbor search
- Probability calibration is not yet available

---

## Release 0.1.1 — SmartKNN v1.1

This release focused on **stability and correctness**.

---

### Changes

- **Classification temporarily disabled** due to correctness concerns
- Introduction of explicit feature weight control parameters:
  - `alpha`
  - `beta`
  - `gamma`

---

### Notes

- Feature weight learning remained accuracy-focused but computationally expensive
- This release prioritized **correctness over functionality**
- Served as a stabilization phase before the v2 redesign

---

## Release 0.1.0 — SmartKNN v1 (Initial Release)

**SmartKNN is born.**

This was the first public release introducing the core ideas behind SmartKNN.

---

### Core Features

- Automatic **feature weight learning**
- Automatic **preprocessing**
- Automatic detection of:
  - Classification
  - Regression
- Internal handling of **NaN / Inf values**
- **Feature masking** via weight thresholding
- Pure **Python + NumPy** implementation

---

### Design Characteristics

- Accuracy-first approach
- Not fully vectorized
- No ANN or GPU support
- Limited scalability for large datasets

---

### Known Issues

- Feature weight learning was **slow** and did not scale well
- Classification outputs returned **numeric values instead of labels**
- Focused primarily on correctness rather than performance

---

## Versioning Philosophy

SmartKNN versioning follows these principles:

- **Correctness before performance**
- **Explicit documentation of breaking changes**
- **Stable inference behavior within a major version**
- **Incremental evolution with clear intent**

Users are encouraged to review release notes before upgrading between major versions.

---

## Summary

SmartKNN has evolved from a correctness-focused prototype into a **production-ready, high-performance nearest-neighbor system**.

Each release reflects deliberate engineering decisions rather than incremental hacks, with transparency around trade-offs and limitations.
