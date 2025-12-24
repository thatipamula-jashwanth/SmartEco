# Core Concepts

SmartKNN is built around a small set of foundational concepts that guide its design and behavior.

These concepts define how similarity is interpreted, how performance is controlled, and how trade-offs are made across different use cases. Understanding them provides the necessary intuition for the rest of the system.

---

## Learned Distance Metrics

In SmartKNN, distance is not treated as a fixed mathematical formula.

Instead, similarity between samples is defined through **learned feature importance and scaling**, making distance an explicit, data-informed construct rather than an implicit assumption.

This enables:
- Reduced influence of noisy or irrelevant features
- Improved robustness in high-dimensional spaces
- More meaningful neighbor relationships

Distance behavior is configurable, inspectable, and stable once learned.

---

## Feature Sparsity and Locality

Real-world datasets rarely have uniformly informative features.

Many features are:
- Weakly informative
- Redundant
- Relevant only in local regions of the data space

SmartKNN embraces this reality by allowing sparsity and locality to **emerge naturally** through feature weighting and optional pruning.

Rather than forcing all dimensions to contribute equally, SmartKNN emphasizes **local neighborhoods defined by meaningful features**, improving both efficiency and interpretability.

---

## Task-Aware Similarity

Similarity is inherently task-dependent.

A distance configuration suitable for regression may behave poorly for classification, and vice versa. SmartKNN accounts for this by adapting similarity behavior to the learning objective.

Task awareness influences:
- How neighbor contributions are aggregated
- How distance is interpreted during prediction
- How bias–variance trade-offs are managed

As a result, nearest neighbors are relevant not only geometrically, but semantically with respect to the task.

---

## Latency-Aware Execution

SmartKNN treats inference latency as a first-class design constraint.

Rather than optimizing solely for average performance, SmartKNN prioritizes **predictable and bounded inference latency**, including under tail conditions.

Latency awareness influences:
- Backend selection decisions
- Execution-time guarantees
- Trade-offs between exact and approximate retrieval

This focus enables reliable operation in real-time and production environments.

---

## System-Level Predictability

SmartKNN prioritizes predictability over implicit or hidden optimization.

Once configured:
- Execution behavior is deterministic
- No learning or adaptation occurs during inference
- Performance characteristics remain stable and inspectable

This predictability allows engineers to reason about system behavior, debug issues effectively, and deploy SmartKNN with confidence.

---

## Conceptual Summary

Together, these core concepts define SmartKNN as a system that:

- Learns how similarity should be measured
- Emphasizes meaningful local structure
- Adapts behavior to the task
- Respects real-world latency constraints
- Provides transparent and predictable execution

These ideas form the conceptual foundation for all algorithmic and architectural decisions within SmartKNN.
