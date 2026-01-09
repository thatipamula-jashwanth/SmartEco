# Feature Weight Learning

SmartKNN replaces the naïve assumption of equal feature importance with a **learned, data-driven feature weighting mechanism**.

Rather than relying on a single heuristic, SmartKNN estimates feature importance by combining **multiple complementary signals**, each capturing a different aspect of feature relevance. The result is a stable, normalized feature weight vector that directly defines how distance is computed during inference.

---

## Overview

Feature weighting in SmartKNN is designed to answer a simple but critical question:

> **Which features should influence similarity, and by how much?**

To answer this robustly across datasets and tasks, SmartKNN combines three independent importance signals:

1. **Univariate predictive strength**  
2. **Information-theoretic dependency**  
3. **Non-linear interaction importance**

These signals are blended into a single, normalized importance vector that forms the basis of the learned distance metric.

---

## Design Goals

The feature weight learning engine is designed to be:

 - **Model-agnostic** — no assumptions about data distribution
 - **Fast and scalable** — suitable for large datasets
 - **Robust to noise and scale**
 - **Resistant to feature redundancy**
 - **Stable under subsampling**

This allows SmartKNN to operate effectively across structured, tabular, and mixed datasets without brittle behavior.

---

## Weight Normalization Contract

All intermediate importance signals are normalized using a strict normalization contract.

The normalization process guarantees:

 - Removal of NaN and infinite values
 - Clipping of all values to a small epsilon
 - Final normalization such that the weight vector sums to 1

\[
\sum_i w_i = 1
\]

This ensures:
 - Comparability across signals
 - Stable downstream distance computation
 - No single feature can dominate catastrophically

---

## Signal 1 — Univariate Predictive Strength

The first signal measures **direct predictive power** of each feature independently.

Each feature is evaluated using a simple univariate regression against the target:

\[
y \approx ax + b
\]

The mean squared error (MSE) of this fit is computed and inverted to represent importance:

\[
w_i \propto \frac{1}{\text{MSE}_i}
\]

Properties:
 - Features with low predictive error receive higher weight
 - Constant or zero-variance features are excluded automatically
 - Captures linear, direct relationships efficiently

This signal provides a fast and interpretable baseline importance estimate.

---

## Signal 2 — Mutual Information Dependency

The second signal measures **statistical dependency** between each feature and the target using mutual information.

Key properties:
 - Captures non-linear relationships
 - Invariant to monotonic transformations
 - Robust to feature scaling

Mutual information is estimated using:
 - Percentile-based binning
 - Joint histogram estimation
 - Controlled subsampling (to maintain scalability)

This signal captures informational relevance even when linear correlation fails.

---

## Signal 3 — Tree-Based Interaction Importance

The third signal captures **non-linear interactions and hierarchical dependencies** using tree-based ensembles.

This signal:
 - Identifies feature interactions
 - Captures non-linear split behavior
 - Models conditional importance structures

Design safeguards include:
 - Controlled subsampling for scalability
 - Randomized feature selection
 - Parallel execution
 - Graceful fallback to uniform weights if tree training fails

This signal complements purely statistical measures by modeling structural relationships.

---

## Blended Weight Computation

The final feature weight vector is computed as a weighted blend of the three signals:

\[
w = \alpha \cdot w_{\text{MSE}} + \beta \cdot w_{\text{MI}} + \gamma \cdot w_{\text{Tree}}
\]

Where:
 - \(\alpha, \beta, \gamma \geq 0\)
 - Default values: **0.4 / 0.3 / 0.3**
 - The final vector is normalized to sum to 1

This ensemble-style blending balances complementary signals into a single, stable importance estimate.

---

## Why Three Signals?

Each signal captures a different aspect of feature relevance:

| Signal | Captures | Limitation |
|------|---------|------------|
| Univariate MSE | Linear predictive power | Misses non-linear effects |
| Mutual Information | Statistical dependency | Ignores interaction structure |
| Tree-Based | Complex interactions | Can overfit if used alone |

Blending these signals yields **more stable and generalizable feature weights** than any individual method.

---

## Robustness Mechanisms

The feature weight learning engine explicitly guards against:

 - Constant or degenerate features
 - Heavy-tailed distributions
 - Extremely large datasets (via subsampling)
 - Tree model instability
 - Weight collapse (via epsilon flooring)

These safeguards ensure that feature weight learning is **fail-safe rather than brittle**, even in imperfect real-world data.

---

## Role in SmartKNN

The learned feature weights produced by this engine:

 - Directly define the distance metric
 - Influence neighborhood structure
 - Improve robustness and interpretability
 - Remain fixed during inference

Once learned, feature weights are treated as immutable configuration, ensuring deterministic and predictable prediction behavior.

---

## Summary

SmartKNN’s feature weight learning engine transforms feature importance from an assumption into a **robust, ensemble-driven, and production-safe mechanism**.

By combining multiple complementary signals under strict normalization guarantees, SmartKNN learns how similarity should be measured — rather than assuming it.
