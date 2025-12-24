# Distance Engine

The Distance Engine defines **how similarity between samples is computed** in SmartKNN.

Unlike classical KNN, where distance is treated as a fixed mathematical formula, SmartKNN treats distance computation as a **first-class system component** with explicit guarantees around numerical stability, memory safety, and production behavior.

---

## Role of the Distance Engine

The Distance Engine is responsible for a single task:

> **Given two samples, compute a meaningful, stable, and consistent measure of similarity.**

It does **not**:
- Retrieve neighbors
- Select backends
- Perform prediction aggregation
- Learn feature weights

This strict separation ensures that distance behavior remains explicit, inspectable, and predictable.

---

## Core Distance Definition

SmartKNN uses a **numerically safe, weighted Euclidean distance kernel** as its core similarity computation.

Feature contributions are scaled by learned importance weights, allowing distance behavior to adapt to the data while preserving a clear geometric interpretation.

A key property of this formulation is that **near-zero feature weights effectively remove a dimension from distance computation**, enabling soft feature selection without altering data representation.

---

## Numerical Stability Guarantees

The Distance Engine is designed with production safety in mind and enforces several numerical guarantees:

- **Float32-only execution**  
  Ensures consistent performance characteristics and predictable memory usage.

- **NaN and Inf sanitization**  
  Invalid values are handled explicitly to prevent undefined behavior during distance computation.

- **Epsilon-floored weights**  
  Feature weights are bounded away from zero to avoid numerical instability and degenerate distances.

These safeguards ensure that distance computation remains stable even in noisy or imperfect real-world datasets.

---

## Memory Safety and Execution Constraints

Distance computation can be memory-intensive at scale.

Before allocating large intermediate buffers or distance matrices, SmartKNN **estimates memory usage upfront** and fails fast if limits are exceeded. This prevents out-of-memory conditions and avoids partial or undefined execution states.

Additional execution guarantees include:
- **Contiguous memory enforcement** for efficient access patterns
- Explicit control over allocation boundaries
- Predictable memory footprint during inference

These constraints make distance computation safer to deploy in production services.

---

## Parallel Execution Model

The Distance Engine is designed to leverage data-level parallelism where appropriate.

Distance computation is parallelized using a JIT-compiled execution model, enabling efficient utilization of available CPU cores while maintaining deterministic behavior.

Parallelism affects **how fast distance is computed**, not **what distance means**.

---

## Consistency Across Backends

A core design requirement of the Distance Engine is **semantic consistency**.

Whether SmartKNN uses:
- Brute-force retrieval
- Approximate nearest-neighbor backends

The definition and behavior of distance remain unchanged.

Backend choice influences *how candidates are retrieved*, not *how similarity is computed*. This ensures that scaling decisions do not silently alter prediction semantics.

---

## Relationship to Other Components

The Distance Engine interacts with other SmartKNN components in a strictly defined manner:

- **Feature Weight Learning** determines feature importance
- **Feature Pruning Engine** may suppress inactive dimensions
- **Backend Strategy** supplies candidate neighbors
- **Prediction Logic** consumes distance outputs

At inference time, the Distance Engine operates independently and does not modify or depend on other components.

---

## Summary

The SmartKNN Distance Engine transforms distance computation from an implicit assumption into a **numerically stable, memory-safe, and production-aware system component**.

By enforcing explicit constraints and guarantees, SmartKNN ensures that similarity computation remains reliable, interpretable, and scalable across real-world deployment scenarios.
