# SmartML

SmartML is a **benchmarking tool** for traditional ML and selected DL models.

It is designed to help you **compare models fairly on the same dataset** using transparent defaults and consistent evaluation rules.

---

### What SmartML Is

SmartML focuses on **model comparison**, not automation.

It allows you to:

- Run multiple ML and DL models on a dataset
- Compare performance using consistent metrics
- Measure training and inference latency

SmartML prioritizes **reproducibility, clarity, and fairness**.

---

### What SmartML Is Not

SmartML is intentionally limited.

It is **not**:

- An AutoML system
- A production training pipeline
- A hyperparameter tuning framework
- A feature engineering search tool
- A Kaggle submission generator

These limitations exist to keep benchmarks honest and comparable.

---

### How SmartML Should Be Used

SmartML is best used as a **decision-making tool**.

Typical workflow:

- Run SmartML on a dataset
- Identify the best-performing model family
- Exit SmartML
- Build a custom pipeline manually

SmartML helps you **choose models**, not deploy them.

---

### Core Principles

SmartML is built around a few simple ideas:

- Same data for every model
- Fixed and documented defaults
- No hidden automation
- Clear and inspectable results

If a result cannot be explained, it does not belong in SmartML.

---

### Documentation Overview

This documentation covers:

- How data is encoded before training
- How datasets are split internally
- Which models are supported
- Default parameters used for benchmarking
- Training and evaluation flow
- Benchmarking methodology and metrics
- Known limitations and common questions

Each section exists to answer **how** and **why**, not just **what**.

---

### When to Use SmartML

SmartML is a good fit if you:

- Need quick, fair model comparisons
- Want baseline numbers you can trust
- Are evaluating models for research or experimentation
- Are selecting model families before production work

---

### When Not to Use SmartML

SmartML is not suitable if you:

- Need full control over training pipelines
- Require custom train/test splits
- Want automated feature engineering or tuning
- Are building production-ready systems

---

### Final Note

SmartML is opinionated by design.

If you agree with its assumptions, it will save you time.  
If you do not, the code is open and the behavior is explicit.
