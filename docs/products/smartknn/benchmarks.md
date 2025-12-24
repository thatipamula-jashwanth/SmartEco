# Benchmarks

This page summarizes the performance characteristics of **SmartKNN** under realistic deployment constraints.

The goal of these benchmarks is not to win leaderboard competitions, but to evaluate **latency behavior, stability, and accuracy trade-offs** that matter in real production environments.

---

## Benchmarking Philosophy

SmartKNN benchmarks are designed around the following principles:

- **CPU-first evaluation**  
  All benchmarks are conducted on commodity CPU hardware without GPU acceleration.

- **Latency-aware measurement**  
  Mean latency is reported, but tail latency (p95 and p99) is treated as a first-class metric.

- **Realistic workloads**  
  Benchmarks use real-world datasets and inference patterns rather than synthetic or toy setups.

- **Transparent trade-offs**  
  No system is optimal for all scenarios. Performance benefits and limitations are reported explicitly.

---

## Evaluation Methodology

Benchmarks are conducted using a consistent and reproducible methodology:

- **Hardware**: Commodity x86 CPU (exact configuration documented per run)
- **Execution modes**:
  - Single-sample inference
  - Batch inference
- **Metrics**:
  - Accuracy / F1 score (task-dependent)
  - Mean inference latency
  - p95 inference latency
- **Baselines**:
  - Classical KNN
  - Linear models
  - Tree-based models (where applicable)
  - Gradient-boosted models

Exact configurations, dataset details, and benchmark scripts are available in the benchmark repository.

---

## Summary Results

The table below highlights representative results across selected datasets and workloads.

> **Note:** Results are indicative rather than exhaustive. Performance varies with dataset size, dimensionality, feature structure, and hardware characteristics.

| Model       | Accuracy / F1 | Mean Latency      | p95 Latency        |
|-------------|---------------|-------------------|--------------------|
| SmartKNN    | Competitive   | Sub-millisecond   | Stable and bounded |
| Classic KNN | Comparable    | Higher            | Less predictable   |
| GBM Models  | Higher        | Variable          | Higher tail latency|

Detailed per-dataset results and raw measurements are available in the full benchmark logs.

---

## Observations

Across evaluated workloads:

- SmartKNN delivers **predictable inference latency**, often operating in the sub-millisecond range on commodity CPUs depending on configuration.
- Learned feature weighting improves robustness on noisy and high-dimensional datasets.
- Approximate execution backends reduce latency at scale, with a tunable accuracy trade-off.
- Tree-based models may achieve higher peak accuracy on some datasets, but frequently exhibit higher or less predictable tail latency on CPU.

---

## Limitations and Trade-offs

SmartKNN is not always the optimal choice:

- On very small datasets, simpler models may be faster due to lower overhead.
- On highly nonlinear problems, tree-based or neural models may outperform in accuracy.
- Approximate backends introduce controlled approximation error that must be tuned carefully.

These trade-offs are documented to support informed system design decisions.

---

## Reproducibility

All benchmarks are conducted using versioned code and documented configurations.

Results may vary across hardware and environments and should be interpreted accordingly.  
Benchmark scripts, configuration files, and raw logs are available for independent verification.
