# sklearn Compatibility and Production Usage

SmartKNN is designed to integrate cleanly with the **scikit-learn ecosystem** while providing additional guarantees required for production deployment.

This page describes SmartKNN’s sklearn compatibility, lifecycle behavior, and production considerations.

---

## sklearn API Compatibility

SmartKNN follows core scikit-learn estimator conventions.

### Supported Methods

SmartKNN implements:

- `fit(X, y)`
- `predict(X)`
- `get_params(deep=True)`
- `set_params(**params)`

This allows SmartKNN to be used with:

- sklearn pipelines
- parameter tuning tools
- model selection workflows
- cross-validation utilities

---

## Estimator State and Fitting Semantics

SmartKNN exposes a fitted-state indicator compatible with sklearn tooling.

- The model is considered fitted only after `fit()` completes successfully
- Calling `predict()` before fitting raises an error
- All configuration is frozen after fitting

This ensures predictable behavior during model evaluation and deployment.

---

## Parameter Introspection and Reproducibility

All constructor arguments are exposed via `get_params()` and configurable via `set_params()`.

This enables:

- Reproducible experiment tracking
- Safe hyperparameter tuning
- Integration with grid search or randomized search workflows

Once fitted, parameters affecting inference behavior are not modified.

---

## Task Inference Behavior

SmartKNN automatically infers task type based on the target variable:

- Regression by default
- Classification when target cardinality is low

This behavior can be overridden explicitly if required.

Task inference occurs during `fit()` and remains fixed for the lifetime of the model.

---

## Deterministic Inference

SmartKNN guarantees deterministic inference behavior:

- No online learning
- No parameter mutation during prediction
- No backend switching at runtime
- No hidden state updates

Given identical input data and configuration, SmartKNN produces identical outputs across runs.

This property is critical for debugging, testing, and production reliability.

---

## Thread Safety

SmartKNN enforces thread safety during model fitting.

- `fit()` is protected by an internal lock
- Concurrent fitting is serialized
- Inference does not mutate shared state

This ensures safe usage in multi-threaded environments when models are prepared or loaded.

---

## Backend Freezing and Stability

Backend selection (brute-force or approximate) occurs during `fit()`.

Once selected:

- The backend remains fixed
- Prediction semantics do not change
- Only retrieval mechanics differ internally

This guarantees consistent behavior across scaling scenarios.

---

## Serialization and Deployment

SmartKNN supports safe serialization for deployment.

- Internal locks are excluded from serialized state
- All learned configuration is preserved
- Models can be safely saved and restored

Typical workflows include:

- Offline training
- Serialization to disk
- Deployment into production services
- Deterministic inference at runtime

---

## Production Deployment Guidelines

When deploying SmartKNN in production:

- Perform all fitting offline
- Validate memory usage for target dataset size
- Prefer deterministic configurations
- Monitor latency under realistic load
- Use version-pinned dependencies

SmartKNN is designed to behave as a **pure inference system** once deployed.

---

## Integration with Existing Systems

SmartKNN is compatible with:

- Batch inference pipelines
- REST or RPC-based inference services
- Offline evaluation workflows
- CI/CD pipelines with automated testing

Its explicit design avoids hidden runtime behavior, making integration straightforward.

---

## Summary

SmartKNN combines sklearn compatibility with production-grade guarantees.

It provides:

- Familiar estimator interfaces
- Deterministic and safe inference
- Clear lifecycle separation
- Stable backend behavior
- Serialization-friendly deployment

These properties make SmartKNN suitable for real-world production systems, not just experimentation.
