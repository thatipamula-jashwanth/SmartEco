# Training and Execution Flow

This document describes how SmartML loads data, prepares inputs, trains models, and evaluates results.

The training flow is **linear, deterministic, and identical for all models**, with the exception of **model-specific preprocessing where mathematically required**.

---

## Overview

SmartML training consists of the following high-level stages:

1. Dataset loading  
2. Task validation  
3. Train/test split  
4. Feature encoding  
5. Target encoding  
6. Model selection  
7. Model training  
8. Evaluation and timing  
9. Result aggregation  

No step is skipped.  
Model-specific behavior is explicit and documented.

---

## Dataset Loading

Datasets can be loaded from:

- Local CSV files  
- OpenML datasets (via dataset ID)  

After loading:

- The target column is validated
- Optional subsampling may be applied
- Features and target are separated

If the target column is missing, execution fails immediately.

---

## Subsampling Behavior

If a subset size is provided and the dataset is larger than that value:

- A random subset is selected
- Sampling is performed **without replacement**
- A fixed random seed is used

This is intended for controlled benchmarking on large datasets.

---

## Task Validation

SmartML supports two task types only:

- **Classification**
- **Regression**

The task must be specified explicitly.  
Invalid task values result in an error.

---

## Train / Test Split

Before training, SmartML performs an internal split:

- **Train size**: 80%  
- **Test size**: 20%  
- **Random seed**: 42  
- **Shuffling**: Enabled  

### Classification Tasks

- Stratified splitting is attempted
- Stratification is used only if every class has at least 2 samples
- If stratification is not possible, it is disabled and logged

### Regression Tasks

- No stratification is applied
- A standard shuffled split is used

The same split is reused for all models.

---

## Feature Encoding

After splitting:

- Feature encoding is fitted **only on the training data**
- The fitted encoder is applied to both train and test sets
- Encoded features are converted to dense `float32` arrays

Feature encoding is fully documented in the Encoding section.

---

## Feature Scaling (Model-Specific)

SmartML applies **feature scaling only for models where it is mathematically required or standard practice**.

Scaling is **not applied globally** and **not forced on all models**.

### Models That Use Feature Scaling

Scaling is applied internally for:

- Linear models (Linear, Ridge, Lasso, ElasticNet)
- Support Vector Machines (SVC, SVR)
- K-Nearest Neighbors (classification and regression)

These models use **standard normalization** to ensure:

- Distance-based comparisons are meaningful
- Optimization converges correctly
- Benchmarks reflect correct model behavior

### Models That Do Not Use Scaling

Scaling is intentionally **not applied** to:

- Tree-based models (Random Forest, Extra Trees, LightGBM, XGBoost, CatBoost)
- Deep learning models with internal normalization
- SmartKNN (uses its own internal distance logic)

Applying scaling to these models would either:

- Have no effect
- Degrade performance
- Bias benchmarks unfairly

### Key Principle

Scaling is applied **only when required for correctness**, not for optimization.

---

## Target Encoding

Target encoding depends on task type.

### Classification

- Labels are converted to strings
- Label encoding is applied
- Mapping is learned from training labels only

### Regression

- Target values are passed through directly
- Converted to `float32`

---

## Memory Management

Once encoding is complete:

- Raw DataFrames and Series are explicitly deleted
- Only NumPy arrays are kept for training and evaluation

This reduces memory pressure during multi-model runs.

---

## Model Selection

Models are selected using the internal model registry.

- If no model list is provided, all compatible models for the task are selected
- Models can be explicitly excluded
- If no models remain, execution fails

Model availability depends on installed dependencies.

---

## Model Training

For each selected model:

- A fresh model instance is created
- Training is performed using encoded (and scaled, if applicable) training data
- Training time is measured using a high-resolution timer

No model receives hidden optimizations or undocumented preprocessing.

---

## Warmup Phase

If a model implements a `warmup` method:

- Warmup is executed after training
- Warmup uses training data
- Warmup time is **not included** in training time

This stabilizes inference latency measurements.

---

## Evaluation

After training, each model is evaluated on the test set.

Evaluation includes:

- Task-specific performance metrics
- Training time
- Inference latency metrics

Evaluation logic is handled by the internal evaluation module.

---

## Result Aggregation

For each model, SmartML collects:

- Model name
- All computed metrics
- Timing information

Results are stored in a tabular structure and combined into a single results table.

---

## Output Handling

If an output path is provided:

- The results directory is created if missing
- Results are written to CSV
- No formatting or post-processing is applied

The raw output is intended for further analysis.

---

## Determinism and Reproducibility

Training behavior is deterministic due to:

- Fixed random seed
- Fixed split ratio
- Fixed encoding rules
- Fixed model defaults
- Explicit scaling rules

Given the same dataset and environment, SmartML will produce identical results.

---

## Design Rationale

The training system is designed to:

- Treat all models fairly
- Apply preprocessing only where required
- Prevent benchmark manipulation
- Avoid hidden optimizations
- Favor transparency over flexibility

If custom training logic is required, SmartML is not intended to be extended implicitly.
