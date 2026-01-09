# When to Use SmartKNN (and When Not To)

SmartKNN is designed for a specific class of machine learning problems where **local structure, interpretability, and predictable latency** matter.

This page helps you decide whether SmartKNN is the right tool for your use case.

---

## When to Use SmartKNN

SmartKNN works best when the following conditions apply.

---

### 1. You Care About Local Similarity

SmartKNN excels when predictions should be driven by **nearby, similar examples** rather than a global model.

Typical cases include:

- Tabular data with meaningful feature relationships
- Problems where neighborhood structure matters
- Situations where similar inputs should yield similar outputs

---

### 2. You Need Interpretable Predictions

SmartKNN is a good fit when you need to understand *why* a prediction was made.

It provides:

- Explicit neighbor contributions
- Learned feature importance
- Distance-aware decision logic

This makes SmartKNN suitable for:

- Regulated environments
- Debugging-heavy workflows
- Trust-critical applications

---

### 3. CPU-Only or Resource-Constrained Environments

SmartKNN is designed to run efficiently on CPUs without requiring GPUs.

It is well suited for:

- Edge deployments
- Cost-sensitive production systems
- Environments with limited or no GPU availability

---

### 4. Latency Predictability Matters

SmartKNN prioritizes **stable and bounded latency**, including tail behavior (p95 / p99).

Use SmartKNN when:

- Real-time inference latency must be predictable
- Spikes or jitter are unacceptable
- Deterministic execution is required

---

### 5. Medium to Large Tabular Datasets

With automatic backend selection and ANN support, SmartKNN scales well from small datasets to millions of rows.

It is a good choice when:

- Dataset size is too large for naive KNN
- You want to scale without changing prediction semantics
- You want safe fallbacks if approximation quality degrades

---

### 6. You Want Strong Defaults Without Heavy Tuning

SmartKNN is designed to work well with minimal configuration.

It automatically handles:

- Feature scaling and sanitization
- Feature weight learning
- Feature pruning
- Backend selection

This makes it suitable for fast iteration and reliable baselines.

---

## When NOT to Use SmartKNN

SmartKNN is not a universal solution. Avoid it in the following cases.

---

### 1. Extremely High-Dimensional Dense Data

For very high-dimensional dense representations (e.g., raw embeddings with thousands of dimensions), nearest-neighbor methods can suffer from distance concentration.

In such cases:

- Neighborhood quality may degrade
- Memory usage increases significantly

Alternative approaches may be more appropriate.

---

### 2. Problems Requiring Strong Global Generalization

SmartKNN is a **local learner**.

If your task requires:

- Learning complex global decision boundaries
- Strong extrapolation far from observed data

Then global models such as tree ensembles or neural networks may perform better.

---

### 3. Streaming or Continual Learning Scenarios

SmartKNN does **not** perform online or incremental learning.

It is not suitable when:

- Model parameters must update continuously
- Predictions depend on evolving state
- Inference behavior must adapt per request

SmartKNN favors frozen, deterministic inference.

---

### 4. Extremely Memory-Constrained Environments

Nearest-neighbor methods require storing training data.

Although SmartKNN includes memory safety checks and approximate backends, it may not be suitable for environments with very tight memory limits.

---

### 5. Problems Where Model Size Must Be Minimal

SmartKNN retains the training dataset as part of the model state.

If deployment constraints require:

- Very small model footprints
- Minimal memory usage

Then parametric models may be a better fit.

---

## Summary

### SmartKNN is a strong choice when you need:

- Local, similarity-driven predictions
- Interpretable and explainable behavior
- CPU-efficient, low-latency inference
- Deterministic and production-safe execution
- Scalable nearest-neighbor performance

### SmartKNN is not ideal when you need:

- Online or continual learning
- Strong global generalization
- Extremely compact model representations
- Learning over extremely high-dimensional dense spaces

Choosing SmartKNN is a deliberate trade-off — favoring **clarity, control, and predictability** over opaque complexity.
