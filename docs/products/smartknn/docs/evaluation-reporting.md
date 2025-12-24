# Evaluation and Reporting

SmartKNN includes a **unified evaluation and reporting engine** designed to support both regression and classification tasks in a consistent, production-friendly manner.

Rather than exposing fragmented metric utilities, SmartKNN treats evaluation as a **first-class system component** with explicit guarantees around correctness, safety, and downstream integration.

---

## Unified Evaluation Model

SmartKNN automatically adapts its evaluation behavior based on the task type inferred during configuration.

This unified model ensures that:
- The correct set of metrics is applied
- Outputs are consistent across tasks
- Evaluation logic remains centralized and auditable

Users do not need to manually switch evaluation modes or metric definitions.

---

## Regression Metrics

For regression tasks, SmartKNN reports the following metrics:

- **Mean Squared Error (MSE)**  
  Measures average squared prediction error.

- **Root Mean Squared Error (RMSE)**  
  Provides error magnitude in the same scale as the target variable.

- **Mean Absolute Error (MAE)**  
  Measures average absolute deviation between predictions and targets.

- **R² Score**  
  Indicates the proportion of variance explained by the model.

These metrics together provide a balanced view of error magnitude, variance, and overall fit.

---

## Classification Metrics

For classification tasks, SmartKNN reports:

- **Accuracy**  
  Overall fraction of correct predictions.

- **Precision (Macro-Averaged)**  
  Measures correctness of positive predictions across classes.

- **Recall (Macro-Averaged)**  
  Measures coverage of true class instances across classes.

- **F1 Score (Macro-Averaged)**  
  Balances precision and recall, especially under class imbalance.

- **Confusion Matrix**  
  Provides a detailed view of prediction outcomes across classes.

Macro-averaging is used by default to ensure fair treatment of all classes, including minority classes.

---

## Input Validation and Safety

All evaluation routines enforce strict validation rules:

- Input arrays are sanitized before evaluation
- Length mismatches are detected and rejected
- Invalid or missing values are handled explicitly

These checks prevent silent errors and ensure that reported metrics accurately reflect model behavior.

---

## Structured Reporting Outputs

Evaluation results are returned as **structured outputs** rather than unstructured logs.

This design enables:
- Easy integration with logging systems
- Compatibility with CI/CD pipelines
- Programmatic inspection and comparison of results
- Consistent experiment tracking

Metrics are designed to be machine-readable as well as human-interpretable.

---

## Role in Model Development

The evaluation and reporting engine supports multiple stages of the SmartKNN lifecycle:

- Model validation during development
- Performance regression checks during iteration
- Benchmarking against alternative systems
- Production monitoring and analysis

By standardizing evaluation behavior, SmartKNN reduces ambiguity and improves confidence in reported results.

---

## Design Intent

The evaluation system in SmartKNN is designed to be:

- **Task-aware** — adapts automatically to regression or classification
- **Safe** — validates inputs and prevents silent failures
- **Consistent** — produces comparable results across runs
- **Production-ready** — suitable for automated pipelines and monitoring

Evaluation is treated not as an afterthought, but as a core part of the system’s reliability and usability.
