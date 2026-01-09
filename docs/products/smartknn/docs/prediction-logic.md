# Prediction Logic

Prediction logic in SmartKNN defines **how retrieved neighbors are transformed into final outputs**.

It operates strictly *after* distance computation and neighbor retrieval, and does not modify feature weights, distance behavior, or backend configuration.

---

## Design Principles

SmartKNN prediction logic is guided by the following principles:

 - Distance should matter more than raw neighbor count
 - Closer neighbors should contribute more strongly
 - Duplicate or near-duplicate points should not destabilize outputs
 - Aggregation should remain stable under noise and class imbalance

Feature weights influence **distance computation only**.  
Prediction aggregation uses **distance-derived neighbor weights**.

---

## Regression Prediction

For regression tasks, SmartKNN performs **distance-weighted local regression**.

Each neighbor contributes to the prediction in proportion to its proximity to the query point, as determined by the learned distance metric.

### Aggregation Strategy

 - Feature weights are applied inside the distance computation
 - Neighbor influence is weighted by inverse distance
 - A distance floor is applied to prevent division by zero
 - Contributions are normalized for numerical stability

The prediction is computed as:

\[
\hat{y}(x) =
\frac{\sum_{i=1}^{K} \alpha_i \cdot y_i}{\sum_{i=1}^{K} \alpha_i}
\quad \text{where} \quad
\alpha_i = \frac{1}{d(x, x_i) + \epsilon}
\]

This corresponds to a **kernel-style local weighted regression estimator**.

### Key Properties

 - **Stable under duplicate points**  
  Distance flooring prevents singularities and dominance by identical samples.

 - **Robust to noise**  
  Distant or weakly related neighbors contribute less.

 - **Locally adaptive behavior**  
  Predictions adapt to neighborhood structure rather than enforcing a global model.

---

## Classification Prediction

For classification tasks, SmartKNN uses **distance-weighted class voting** rather than simple majority voting.

### Voting Strategy

 - Each neighbor contributes a vote weighted by inverse distance
 - Votes are accumulated per class
 - The class with the highest total weighted score is selected

This avoids brittle majority voting and improves minority-class recall.

---

## Numerical Stability Guarantees

Prediction logic enforces:

 - Distance flooring to prevent division-by-zero
 - Sanitized distance inputs
 - Bounded, deterministic aggregation

These guarantees ensure consistent behavior across datasets and execution modes.

---

## Consistency Across Backends

Prediction logic is **backend-agnostic**.

Backend choice affects *which neighbors are retrieved*, not *how predictions are computed*.

---

## Determinism and Reproducibility

Given identical input, configuration, and retrieved neighbors, SmartKNN guarantees:

 - Deterministic predictions
 - Reproducible outputs
 - Stable interpretability reports

No hidden state or adaptation occurs during inference.

---

## Summary

SmartKNN prediction logic uses **distance-weighted aggregation over a learned metric space**.

By cleanly separating:
 - feature-weighted distance computation
 - distance-weighted prediction aggregation

SmartKNN achieves robust, interpretable, and production-safe predictions.
