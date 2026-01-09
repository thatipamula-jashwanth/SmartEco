# Backend Strategy

SmartKNN separates **prediction semantics** from **neighbor retrieval mechanics** through an explicit backend strategy layer.

This separation allows SmartKNN to scale across dataset sizes while preserving **consistent prediction behavior, interpretability, and API stability**.

Backend choice affects *how neighbors are retrieved*, not *how predictions are computed*.

---

## Motivation

Nearest-neighbor retrieval poses different constraints at different scales:

- **Small to medium datasets** benefit from brute-force search due to simplicity, exactness, and low overhead.
- **Large datasets** require approximate strategies to meet latency and memory constraints.

Embedding retrieval logic directly into prediction would tightly couple correctness, performance, and scale.  
SmartKNN avoids this by treating neighbor retrieval as a **pluggable execution strategy** with explicit safety guarantees.

---

## Backend Types

### Brute-Force Backend

The brute-force backend computes distances between the query and all training samples.

**Characteristics**

- Exact neighbor retrieval
- Zero approximation error
- Minimal setup overhead
- Fully predictable behavior

**Preferred when**

- Dataset size is small to medium
- Exact neighbors are required
- Batch sizes are manageable

For many real-world workloads, brute-force execution remains the most reliable and interpretable option.

---

### Approximate Nearest-Neighbor (ANN) Backend

The ANN backend reduces inference cost by limiting the number of distance computations through indexing and approximation.

**Characteristics**

- Sublinear retrieval complexity
- Controlled approximation error
- Higher setup and memory overhead
- Tunable accuracy–latency trade-offs

**Preferred when**

- Dataset size is large
- Latency constraints dominate
- Small approximation error is acceptable

ANN backends trade exactness for speed and require careful validation.

---

## ANN Quality Validation & Fallback

SmartKNN does **not blindly trust approximate retrieval**.

When an ANN backend is enabled, SmartKNN performs a **sanity validation step** to ensure retrieval quality remains acceptable.

### Validation Mechanism

- ANN-retrieved neighbors are evaluated against expected prediction behavior
- A quality score (e.g., **R²**) is computed
- The score is compared against a configurable threshold: `ann_min_r2`

### Automatic Fallback

- If ANN quality **meets or exceeds** `ann_min_r2`, ANN execution continues
- If ANN quality **falls below** `ann_min_r2`, SmartKNN **automatically falls back to brute-force retrieval**

This fallback:

- Occurs without changing the external API
- Preserves prediction semantics
- Prevents silent accuracy degradation

There is **no leakage, no hybrid prediction logic, and no partial mixing of results** — the system cleanly switches retrieval strategy when required.

---

## Automatic Backend Selection

SmartKNN supports automatic backend selection during configuration.

At setup time, SmartKNN evaluates:

- Dataset size
- Feature dimensionality
- Memory constraints
- Latency targets

Based on these factors:

- **Brute-force execution** is selected when it is efficient and within latency bounds
- **ANN execution** is selected when brute-force retrieval would violate constraints

Once selected, the backend is **fixed for the lifetime of the configured model**, except for safety-triggered fallback.

---

## Backend Transparency & Guarantees

SmartKNN enforces the following guarantees regardless of backend choice:

- The external API remains unchanged
- Prediction aggregation logic is identical
- Distance computation semantics are consistent
- Interpretability outputs reflect the actual retrieved neighbors
- Safety fallback does not alter prediction semantics

Backend strategy influences retrieval efficiency, **not prediction correctness semantics**.

---

## Trade-offs & Limitations

ANN backends introduce unavoidable trade-offs:

- Approximation error may affect neighbor ordering
- Index construction increases memory usage
- Performance gains depend on dataset structure and tuning

Quality validation and fallback mechanisms mitigate risk, but ANN remains inappropriate for some workloads.  
For smaller datasets, ANN overhead can outweigh its benefits, which is why brute-force execution remains the default when feasible.

---

## Design Rationale

By isolating neighbor retrieval behind a backend strategy layer — and enforcing quality validation — SmartKNN achieves:

- Scalability without silent accuracy loss
- Explicit correctness guardrails
- Clear separation of concerns
- Predictable behavior across execution modes
- A stable foundation for future backend extensions

This design allows SmartKNN to scale without becoming opaque, brittle, or unsafe — a common failure mode in approximate nearest-neighbor systems.
