# Encoding Strategy

SmartML applies a **deterministic, rule-based encoding strategy** for tabular datasets to ensure fair and reproducible benchmarking across models.

The encoding process is fully automatic, but **not opaque**. Every decision is driven by fixed thresholds and explicit rules.

---

## Overview

Encoding in SmartML consists of two independent parts:

- **Feature encoding** (numerical and categorical columns)
- **Target encoding** (classification or regression)

The same encoding logic is applied to all models to guarantee comparability.

---

## Column Type Detection

SmartML inspects the input dataset and splits features into:

- **Numerical columns**
  - Detected via pandas numeric dtypes
- **Categorical columns**
  - Detected via `object` and `category` dtypes

No manual column specification is required.

---

## Missing Value Handling

Missing values are handled **before encoding** using fixed strategies:

- **Numerical features**
  - Imputed using the **median**
- **Categorical features**
  - Imputed using the **most frequent value**

These strategies are chosen for robustness and low variance impact.

---

## Categorical Cardinality Analysis

Categorical columns are further divided based on **cardinality**.

A column is considered:

- **Low-cardinality** if unique values ≤ 10
- **High-cardinality** if unique values > 10

This decision is made per column using the training data only.

---

## Encoding Decision Rules

SmartML uses a hybrid encoding strategy with strict limits to prevent feature explosion.

### One-Hot Encoding (OHE)

One-Hot Encoding is used **only if all conditions below are met**:

- Total categorical columns ≤ 10  
- Column cardinality ≤ 10  
- Total unique values across low-cardinality columns ≤ 100  

If these conditions are satisfied:
- Low-cardinality columns → One-Hot Encoding
- High-cardinality columns → Target Encoding

If any condition fails, One-Hot Encoding is **disabled entirely**.

---

### Target Encoding

Target Encoding is applied when:

- Cardinality is high
- OHE limits are exceeded
- Dataset has many categorical columns

Target Encoding uses:
- Smoothing = 1.0
- Minimum samples per leaf = 1

This avoids overfitting while remaining deterministic.

If categorical features exist, **target values are required during fitting**.

---

## Numerical Feature Processing

Numerical columns are processed using:

- Median imputation
- No scaling
- No normalization

This ensures:
- Minimal distortion of feature distributions
- Model-agnostic preprocessing
- Faster execution

---

## Feature Transformer Construction

All transformations are assembled into a single `ColumnTransformer`:

- Numerical pipeline
- Categorical pipeline(s)
- Dropped remainder columns
- Dense output enforced

Sparse outputs are explicitly disabled to maintain consistency across models.

---

## Feature Output

After transformation:

- All features are converted to `float32`
- Output is a dense NumPy array
- Feature order is deterministic

This format is compatible with all supported ML and DL models.

---

## Target Encoding Logic

### Classification Tasks

- Targets are converted to strings
- Label encoding is applied
- Mapping is learned on training labels only

This ensures consistent class indexing.

---

### Regression Tasks

- Targets are passed through directly
- Converted to `float32`
- No transformation is applied

---

## Determinism and Reproducibility

The encoding process is:

- Deterministic
- Stateless after fitting
- Independent of model choice

Given the same dataset and random seed, SmartML will always produce identical encoded outputs.

---

## Feature Introspection

SmartML exposes metadata about the encoding process, including:

- Number of numerical features
- Number of categorical features
- Whether OHE was used
- Count of low- and high-cardinality columns
- Column names per category group

This information is used internally for logging and debugging.

---

## Design Rationale

This encoding strategy prioritizes:

- Fairness across models
- Controlled feature dimensionality
- Predictable behavior
- Benchmark stability

Aggressive feature engineering and custom transformations are intentionally excluded.

