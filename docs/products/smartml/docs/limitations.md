# Limitations and Important Notes

SmartML is intentionally constrained to preserve **benchmark correctness and reproducibility**.  
The following limitations are by design and must be understood before use.

---

## Task–Dataset Mismatch

SmartML **does not validate semantic correctness** between the chosen task and the dataset.

- Using **classification** on a regression dataset will not raise an error
- Using **regression** on a classification dataset will not raise an error
- Models will still train and produce outputs

However, the results will be **meaningless or misleading**.

### Important
It is the user’s responsibility to:
- Select the correct task type
- Ensure the target variable matches the task

SmartML assumes **expert usage**, not guardrails.

---

## No Custom Train/Test Splits

- External train/test datasets are not supported
- Cross-validation is not supported
- Split ratios are fixed

This is required to ensure fair comparison across models.

---

## No Hyperparameter Tuning

- All models run with fixed defaults
- No grid search or Bayesian optimization
- No per-model tuning

SmartML compares **model families**, not optimized instances.

---

## Not a Production Pipeline

SmartML is **not suitable for production use**.

- No pipeline export
- No inference serving
- No model persistence guarantees

Results are intended for analysis only.

---

## Limited Dataset Validation

SmartML does not enforce:
- Target type validation
- Label distribution sanity checks
- Feature leakage detection

Users must validate datasets independently.

---

## Deep Learning Constraints

Deep learning models:
- Run on CPU by default
- Use conservative training limits
- May be slow on large datasets
- Are intended for comparison, not performance tuning

GPU acceleration is not managed automatically.

---

## Dependency-Based Model Availability

- Some models require optional dependencies
- Missing dependencies silently disable models
- Disabled models are excluded from execution

SmartML does not install dependencies automatically.

---

## Memory and Scale Constraints

- Large datasets may cause high memory usage
- Deep models can be resource intensive
- SmartML does not perform automatic dataset sharding

Users are responsible for resource management.

---

## Benchmark Interpretation

SmartML outputs:
- Raw performance metrics
- Latency measurements
- No confidence intervals
- No statistical significance tests

Results should be interpreted as **directional guidance**, not absolute rankings.

---

## Summary

SmartML limitations are intentional.

It assumes:
- Correct task selection
- Clean datasets
- Informed interpretation of results

If strict validation, automation, or safety checks are required, SmartML may not be the appropriate tool.


