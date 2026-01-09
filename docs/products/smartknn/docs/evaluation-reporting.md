# **Frequently Asked Questions (FAQ)**

This page answers common questions about SmartKNN’s design, behavior, and intended usage.

If you are new to SmartKNN, this section helps clarify *why certain choices were made* and *what to expect in practice*.

---

## **What makes SmartKNN different from standard KNN?**

SmartKNN treats nearest-neighbor learning as a **system**, not a single algorithm.

Key differences include:
- Learned feature importance instead of equal weighting
- Feature pruning via weight thresholding
- Distance-weighted regression and classification
- Automatic backend selection (brute vs ANN)
- Deterministic, production-safe inference

Standard KNN typically applies a fixed distance metric and naive aggregation.

---

## **Does SmartKNN require manual feature scaling or preprocessing?**

No.

SmartKNN handles internally:
 - Feature normalization
 - NaN and Inf sanitization
 - Numerical stability safeguards

Users can provide raw numeric features directly.

---

## **Is SmartKNN a lazy learner?**

Yes — but with structure.

Like classical KNN, SmartKNN stores the training data and performs computation at inference time.  
However, SmartKNN adds an explicit **configuration phase** where feature importance, pruning, and backend strategy are learned and frozen.

Inference itself is deterministic and optimized.

---

## **Does SmartKNN perform online or incremental learning?**

No.

SmartKNN **intentionally does not support online or continual learning**.

All learning occurs during `fit()`.  
Inference uses a frozen configuration to guarantee:
 - Predictable latency
 - Deterministic outputs
 - Stable interpretability

For streaming or continuously adapting systems, SmartKNN is not the right tool.

---

## **How does SmartKNN handle large datasets?**

SmartKNN supports large datasets through:
 - Automatic backend selection
 - Approximate Nearest Neighbor (ANN) backends
 - Safe fallback to brute-force when ANN quality is insufficient

Backend choice affects *how neighbors are retrieved*, not *how predictions are computed*.

---

## **Is ANN always used for large datasets?**

Not always.

SmartKNN may:
 - Use brute-force for small or medium datasets
 - Use ANN for large datasets
 - Fall back to brute-force if ANN quality checks fail

This behavior is automatic and designed to preserve prediction correctness.

---

## **Does ANN change prediction behavior?**

No.

ANN affects **candidate retrieval only**.

Once neighbors are retrieved:
 - Distance computation
 - Prediction aggregation
 - Interpretability behavior

remain identical to brute-force execution.

---

## **How are predictions computed for regression?**

Regression uses **distance-weighted local regression**.

 - Feature weights influence distance computation
 - Neighbor influence is proportional to inverse distance
 - Predictions are normalized and numerically stable

This produces smooth, locally adaptive predictions.

---

## **How are predictions computed for classification?**

Classification uses **distance-weighted class voting**.

 - Each neighbor contributes a vote weighted by distance
 - Votes are accumulated per class
 - The class with the highest total weight is selected

This avoids brittle majority voting and improves minority-class recall.

---

## **Is SmartKNN deterministic?**

Yes.

Given:
 - Identical data
 - Identical configuration
 - Identical backend

SmartKNN produces identical predictions across runs.

No randomness or hidden state is introduced during inference.

---

## **Is SmartKNN compatible with scikit-learn?**

Yes.

SmartKNN implements standard sklearn-style methods:
 - `fit`
 - `predict`
 - `get_params`
 - `set_params`

It can be used in sklearn pipelines and evaluation workflows.

---

## **Can SmartKNN run without a GPU?**

Yes.

SmartKNN is **CPU-first by design**.

GPU support, when available, is limited to neighbor search in ANN backends and is optional.

---

## **What types of data does SmartKNN support?**

SmartKNN is best suited for:
 - Numeric tabular data
 - Structured datasets
 - Problems with meaningful feature similarity

It is not designed for raw text, images, or unstructured data without prior feature extraction.

---

## **When should I NOT use SmartKNN?**

Avoid SmartKNN if:
 - You require online learning
 - Your data is extremely high-dimensional and dense
 - You need a very small model footprint
 - Strong global generalization is required

See **When to Use / When Not Use** for details.

---

## **Is SmartKNN production-ready?**

Yes.

SmartKNN is designed with:
 - Deterministic inference
 - Memory safety checks
 - Explicit backend control
 - Serialization-safe model state

It is suitable for real-world production systems.

---

## **Where should I start?**

 - Read **Design Goals** and **Core Concepts** for intuition
 - Explore runnable examples in the repository
 - Use **Quickstart** for minimal setup
 - Review **Benchmarks** before deployment
