# Dataset Splitting Strategy

SmartML applies a **fixed, deterministic dataset splitting strategy** to ensure fair and reproducible benchmarking across models.

Splitting behavior differs slightly between **classification** and **regression** tasks, but the core principles remain the same.

---

## Overview

- A single dataset is accepted as input
- Splitting is handled internally
- External train/test splits are not supported
- The same split is used for all models

This guarantees that every model is evaluated under identical conditions.

---

## Default Configuration

SmartML uses the following fixed defaults:

- **Test size**: 20%
- **Train size**: 80%
- **Random seed**: 42
- **Shuffling**: Enabled

These values are not exposed for modification to preserve benchmark consistency.

---

## Classification Splitting

For classification tasks, SmartML attempts to use **stratified splitting** whenever possible.

### Stratification Rules

- Target values are converted to a pandas Series
- Class frequencies are analyzed
- Stratification is enabled **only if every class has at least 2 samples**

If any class has fewer than 2 samples:
- Stratification is disabled
- A standard shuffled split is used instead
- A warning is logged

This prevents runtime errors while maintaining maximum balance when feasible.

---

## Class Distribution Logging

When stratification is enabled, SmartML logs:

- Normalized class distribution in the training set

This allows users to verify that class balance has been preserved during the split.

---

## Regression Splitting

For regression tasks:

- No stratification is applied
- A simple shuffled split is used
- Targets are treated as continuous values

Regression splitting is deterministic given the same random seed.

---

## Input Validation

Before splitting:

- Feature data must be a pandas DataFrame
- Target data must be a pandas Series or NumPy array

Invalid inputs raise explicit errors to prevent silent failures.

---

## Split Information

After splitting, SmartML computes and logs:

- Total number of samples
- Number of training samples
- Number of test samples
- Train/test ratios

This information is used for transparency and debugging.

---

## Determinism and Reproducibility

The splitting process is fully deterministic:

- Fixed random seed
- Explicit shuffle behavior
- No dependency on model choice

Given the same dataset, SmartML will always produce the same split.

---

## Design Rationale

This splitting strategy is designed to:

- Prevent benchmark manipulation
- Avoid data leakage
- Ensure fair model comparison
- Keep results reproducible across runs and environments

Flexible splitting options are intentionally excluded.

