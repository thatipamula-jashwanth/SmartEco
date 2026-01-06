# Benchmarking and Evaluation

SmartML uses a **fixed and transparent benchmarking system** to evaluate model performance and latency.

All metrics are computed using deterministic procedures and identical inputs across models.

---

## Overview

For every model run, SmartML measures:

- Task-specific performance metrics
- Training time
- Batch inference time
- Single-sample inference latency
- P95 single-sample latency

All measurements are performed **after training** and use the same test split.

---

## Prediction Handling

Before evaluation:

- Model predictions are converted to NumPy arrays
- Multi-dimensional predictions are flattened when required
- For classification, probability outputs are converted to class labels using `argmax`

This ensures consistent metric computation across different model APIs.

---

## Classification Metrics

For classification tasks, SmartML computes:

- **Accuracy**
- **Macro F1 score**

Macro F1 is calculated using equal weight for each class, making it suitable for imbalanced datasets.

Both metrics are computed on the test set only.

---

## Regression Metrics

For regression tasks, SmartML computes:

- **R² (coefficient of determination)**
- **Mean Squared Error (MSE)**

Targets and predictions are reshaped to one-dimensional arrays before evaluation.

---

## Training Time Measurement

Training time is measured as:

- Wall-clock time
- Captured around the model `fit()` call
- Reported in seconds

Warmup operations, if present, are **not included** in training time.

---

## Batch Inference Benchmarking

Batch inference time measures how long a model takes to predict on the **entire test set**.

Procedure:
- A small warmup prediction is executed
- Full test set prediction is timed
- Time is reported in seconds

Derived metrics:
- Number of samples processed
- Batch throughput (samples per second)

Batch benchmarking reflects throughput-oriented workloads.

---

## Single-Sample Inference Benchmarking

Single-sample latency measures per-request inference cost.

Procedure:
- A warmup prediction is executed
- A fixed number of inference runs are performed
- Each run predicts a single randomly selected sample
- Latency is measured in milliseconds

Default behavior:
- 200 inference runs
- Fixed random seed for reproducibility

Reported metrics:
- Mean single-sample latency (ms)
- 95th percentile latency (P95, ms)

This reflects real-world request-style inference.

---

## Warmup Strategy

Warmup predictions are executed before timing:

- To stabilize internal model state
- To reduce first-call overhead
- To improve measurement consistency

Warmup time is excluded from all reported metrics.

---

## Throughput Calculation

Batch throughput is computed as:

- Number of test samples divided by batch inference time

If batch inference time is zero, throughput is reported as infinity.

---

## Determinism and Reproducibility

Benchmarking behavior is deterministic due to:

- Fixed random seeds
- Fixed number of runs
- Fixed evaluation procedures
- Identical test data for all models

Given the same environment and dataset, SmartML produces consistent benchmark results.

---

## Design Rationale

The benchmarking system is designed to:

- Measure both accuracy and speed
- Capture realistic inference behavior
- Avoid cherry-picked metrics
- Remain model-agnostic

No model-specific optimizations or shortcuts are applied.

