# Frequently Asked Questions (FAQ)

This section answers common questions and clarifies expected SmartML behavior.

---

### What is SmartML primarily used for?

SmartML is a **benchmarking and inspection tool**.

It is designed to:

- Compare multiple models fairly on the same dataset
- Provide baseline performance and latency numbers
- Help select a model family before building a custom pipeline

It is not intended for production or leaderboard submissions.

---

### Can SmartML be used for Kaggle competitions?

Yes, **for model selection only**.

Recommended usage:

- Run SmartML on the competition dataset
- Identify strong-performing model families
- Exit SmartML
- Build and tune a custom pipeline manually

SmartML should **not** be used to generate final Kaggle submissions.

---

### Why doesn’t SmartML allow custom train/test splits?

Custom splits introduce:

- Data leakage risks
- Inconsistent benchmarks
- Unfair comparisons

SmartML enforces internal splits to ensure every model is evaluated under identical conditions.

---

### What happens if I choose the wrong task type?

SmartML does **not** block execution.

- Classification on regression data will run
- Regression on classification data will run

However, results will be **incorrect or misleading**.

Correct task selection is the user’s responsibility.

---

### Why is there no hyperparameter tuning?

Hyperparameter tuning:

- Biases benchmarks
- Inflates results
- Breaks reproducibility

SmartML compares **model families**, not optimized configurations.

---

### Why are some models missing when I run SmartML?

Some models require **optional dependencies**.

If a dependency is missing:

- The model is silently disabled
- It does not appear in the available model list

Use the inspection utilities to see which models are available.

---

### Are deep learning models slow in SmartML?

Yes, often.

Deep learning models:

- Run on CPU by default
- Use conservative training limits
- Are included for comparison, not speed

They are not optimized for large-scale production training.

---

### Does SmartML support GPUs?

No, GPU usage is not managed automatically.

All deep learning models run with CPU-safe defaults unless explicitly modified by the user.

---

### Can I add my own models?

Yes.

Custom models can be added by:

- Implementing the required interface
- Registering the model in the appropriate registry
- Ensuring deterministic behavior

SmartML does not auto-discover external models.

---

### Is SmartML suitable for production deployment?

No.

SmartML:

- Does not export pipelines
- Does not manage inference services
- Does not guarantee backward compatibility

It is strictly a benchmarking tool.

---

### How should SmartML results be interpreted?

SmartML results are:

- Directional, not absolute
- Dataset-specific
- Dependent on fixed defaults

They should be used to guide decisions, not finalize them.

---

### Where can I find exact model defaults?

Exact defaults are documented in the **Models** section of the documentation.

No defaults are hidden or tuned dynamically.

---

## Final Note

SmartML assumes an **informed user**.

If you need guardrails, automation, or production safety checks, SmartML may not be the right tool.
