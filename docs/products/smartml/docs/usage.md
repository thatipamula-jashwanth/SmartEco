# Usage Guide

This page shows **practical, copy-paste templates** for using SmartML correctly.

All examples reflect the **actual SmartEco.SmartML API** and recommended workflows.

---

## Importing SmartML

SmartML is exposed through the SmartEco package.

from SmartEco.SmartML import load_dataset, run_training, SmartML_Inspect

---

## Inspect Available Models

SmartML_Inspect()

This will show:

- Available classification models
- Available regression models
- Disabled models due to missing dependencies
- Unavailable models are automatically excluded during execution.

---

## Using OpenML Datasets

SmartML can load datasets directly from OpenML.

X, y = load_dataset(
    openml_id=562,
    target="usr",
    subset=None,
)

print(f"Dataset loaded: X={X.shape}, y={y.shape}")

- OpenML datasets are treated the same as CSV datasets after loading.

---

## Using Local CSV Datasets

SmartML supports standard CSV files.

X, y = load_dataset(
    csv_path="data/dataset.csv",
    target="label",
)

- CSV and OpenML datasets follow the same internal pipeline.

---

## Subsampling Large Datasets

For large datasets, subsampling can be used to get quick baseline results.

X, y = load_dataset(
    csv_path="data/large_dataset.csv",
    target="label",
    subset=50000,
)

---

## Selecting Specific Models

Run Only Selected Models

results = run_training(
    X_df=X,
    y_ser=y,
    task="classification",
    models=[
        "random_forest",
        "xgboost",
        "lightgbm",
        "smartknn",
    ],
)

---

## Exclude Models

results = run_training(
    X_df=X,
    y_ser=y,
    task="regression",
    exclude=[
        "svr",
        "knn",
    ],
)

Model names are:

- Case-insensitive
- Normalized internally
- Task-specific

---

## Sorting Results

SmartML does not auto-sort results.

- Classification

results.sort_values("macro_f1", ascending=False)

- Regression

results.sort_values("r2", ascending=False)

## Full Code

from SmartEco.SmartML import load_dataset, run_training, SmartML_Inspect

SmartML_Inspect()


X, y = load_dataset(
    openml_id=562,
    target="usr",
    subset=None,
)

print(f"Dataset loaded: X={X.shape}, y={y.shape}")


results = run_training(
    X_df=X,
    y_ser=y,
    task="regression",
    exclude=[
        "tabnet",
        "nam",
    ],
    output_csv="results/benchmark.csv",
)

print(
    results.sort_values(
        "r2",
        ascending=False,
    )
)

## Important Notes

- SmartML does not validate task–dataset correctness
- Wrong task selection will produce misleading results
- SmartML is not a production pipeline
- Benchmarks are dataset-specific

