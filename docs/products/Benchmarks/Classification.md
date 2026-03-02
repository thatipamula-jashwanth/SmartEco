# Classification Benchmarks

All models are evaluated under default settings from their respective libraries.

- No hyperparameter tuning.
- Logistic Regression and KNN is scaled for transparency.
- Same preprocessing for all models:
  - Unique encoding for categorical features
  - No dataset-specific tricks
- Metrics reported are 3-Fold Cross Validation means.
- Latency is measured on CPU.

Metrics shown:

 - Accuracy (CV Mean)
 - Macro F1 (CV Mean)
 - Single Inference P95 (ms)

---

## [Adult](https://www.openml.org/d/45068)

| Model        | Accuracy | Macro F1 | Single P95 (ms) |
|--------------|----------|----------|------------------|
| LightGBM     | 0.8734   | 0.8170   | 1.37             |
| XGBoost      | 0.8594   | 0.7812   | 0.59             |
| CatBoost     | 0.8726   | 0.8147   | 0.79             |
| RandomForest | 0.8638   | 0.7994   | 24.52            |
| LogReg       | 0.8491   | 0.7765   | 0.20             |
| KNN          | 0.8377   | 0.7671   | 2.14             |
| SmartKNN     | 0.8375   | 0.7680   | 0.21             |
| DecisionTree | 0.8051   | 0.7399   | 0.38             |

---

## [Credit Card Default](https://www.openml.org/d/42477)

| Model        | Accuracy | Macro F1 | Single P95 (ms) |
|--------------|----------|----------|------------------|
| CatBoost     | 0.8194   | 0.6842   | 1.09             |
| LightGBM     | 0.8201   | 0.6835   | 1.57             |
| XGBoost      | 0.8128   | 0.6763   | 0.63             |
| RandomForest | 0.8171   | 0.6811   | 25.47            |
| LogReg       | 0.8104   | 0.6259   | 0.24             |
| KNN          | 0.7939   | 0.6503   | 2.39             |
| SmartKNN     | 0.7933   | 0.6554   | 0.23             |
| DecisionTree | 0.7312   | 0.6188   | 0.18             |

---

## [Porto Seguro Safe Driver](https://www.openml.org/d/42742)

| Model        | Accuracy | Macro F1 | Single P95 (ms) |
|--------------|----------|----------|------------------|
| XGBoost      | 0.9633   | 0.4921   | 0.60             |
| CatBoost     | 0.9635   | 0.4911   | 0.82             |
| LightGBM     | 0.9636   | 0.4909   | 1.35             |
| RandomForest | 0.9635   | 0.4909   | 23.90            |
| LogReg       | 0.9635   | 0.4911   | 0.21             |
| DecisionTree | 0.9158   | 0.5058   | 0.18             |
| KNN          | 0.9630   | 0.4920   | 34.67            |
| SmartKNN     | 0.9629   | 0.4928   | 0.35             |

---

## [Bank Marketing](https://www.openml.org/d/1462)

| Model        | Accuracy | Macro F1 | Single P95 (ms) |
|--------------|----------|----------|------------------|
| SmartKNN     | 0.9982   | 0.9982   | 0.36             |
| KNN          | 0.9982   | 0.9982   | 1.46             |
| CatBoost     | 0.9973   | 0.9972   | 0.79             |
| LightGBM     | 0.9918   | 0.9917   | 1.20             |
| XGBoost      | 0.9918   | 0.9917   | 0.56             |
| RandomForest | 0.9882   | 0.9880   | 24.70            |
| DecisionTree | 0.9836   | 0.9834   | 0.18             |
| LogReg       | 0.9836   | 0.9834   | 0.32             |

---

## [Santander Customer Satisfaction](https://www.openml.org/d/45566)

| Model        | Accuracy | Macro F1 | Single P95 (ms) |
|--------------|----------|----------|------------------|
| CatBoost     | 0.9220   | 0.6994   | 1.17             |
| LogReg       | 0.9144   | 0.6722   | 0.21             |
| XGBoost      | 0.9120   | 0.6520   | 0.60             |
| LightGBM     | 0.9081   | 0.5661   | 1.76             |
| SmartKNN     | 0.8994   | 0.4755   | 0.56             |
| KNN          | 0.8994   | 0.4745   | 35.61            |
| RandomForest | 0.8995   | 0.4735   | 36.09            |
| DecisionTree | 0.8336   | 0.5535   | 0.18             |

---

## [Credit Card Fraud Detection](https://www.openml.org/d/42397)

| Model        | Accuracy | Macro F1 | Single P95 (ms) |
|--------------|----------|----------|------------------|
| CatBoost     | 0.9996   | 0.9313   | 0.84             |
| RandomForest | 0.9995   | 0.9226   | 25.01            |
| SmartKNN     | 0.9995   | 0.9214   | 0.31             |
| XGBoost      | 0.9995   | 0.9128   | 0.63             |
| KNN          | 0.9994   | 0.9049   | 12.51            |
| DecisionTree | 0.9991   | 0.8710   | 0.16             |
| LogReg       | 0.9992   | 0.8650   | 0.23             |
| LightGBM     | 0.9961   | 0.6495   | 1.32             |

---

## [Covertype](https://www.openml.org/d/43948)

| Model        | Accuracy | Macro F1 | Single P95 (ms) |
|--------------|----------|----------|------------------|
| RandomForest | 0.9423   | 0.9423   | 25.06            |
| SmartKNN     | 0.9352   | 0.9352   | 0.48             |
| DecisionTree | 0.9325   | 0.9325   | 0.16             |
| KNN          | 0.9164   | 0.9164   | 22.90            |
| CatBoost     | 0.9107   | 0.9107   | 0.96             |
| LightGBM     | 0.8486   | 0.8486   | 1.44             |
| LogReg       | 0.7706   | 0.7703   | 0.22             |
| XGBoost      | 0.6901   | 0.6601   | 0.65             |

