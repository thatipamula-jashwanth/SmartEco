# Regression Benchmarks

All models are evaluated under default settings from their respective libraries.

- No hyperparameter tuning.
- Linear models and KNN are scaled for transparency.
- Same preprocessing for all models:
  - Unique encoding for categorical features
  - No dataset-specific tricks
- Metrics reported are 3-Fold Cross Validation means.
- Latency is measured on CPU.

Metrics shown:

 - RMSE (CV Mean)
 - RMSE (Test)
 - Single Inference P95 (ms)

---

## [Diamonds](https://www.openml.org/d/42225)

| Model        | CV RMSE | Test RMSE | Single P95 (ms) |
|--------------|---------|-----------|------------------|
| SmartKNN     | 892.21  | 860.76    | 0.19             |
| KNN          | 933.65  | 897.88    | 0.71             |
| RandomForest | 1153.65 | 745.21    | 34.46            |
| DecisionTree | 1392.59 | 1164.86   | 0.18             |
| LightGBM     | 1216.61 | 1191.34   | 1.23             |
| XGBoost      | 1339.78 | 1238.60   | 0.53             |
| Ridge        | 1287.62 | 1297.21   | 0.12             |
| CatBoost     | 1276.41 | 1436.24   | 1.19             |

---

## [OnlineNewsPopularity](https://www.openml.org/d/42724)

| Model        | CV RMSE | Test RMSE | Single P95 (ms) |
|--------------|---------|-----------|------------------|
| Ridge        | 16013.18| 10839.29  | 0.19             |
| CatBoost     | 11676.77| 10908.77  | 1.29             |
| LightGBM     | 11759.63| 11021.90  | 1.14             |
| RandomForest | 11909.29| 11247.33  | 36.10            |
| SmartKNN     | 12560.55| 11879.40  | 0.26             |
| KNN          | 12455.76| 11944.82  | 2.90             |
| XGBoost      | 12410.22| 13315.14  | 0.56             |
| DecisionTree | 17126.61| 22562.39  | 0.16             |

---

## [Allstate Claims Severity](https://www.openml.org/d/42571)

| Model        | CV RMSE | Test RMSE | Single P95 (ms) |
|--------------|---------|-----------|------------------|
| CatBoost     | 1918.54 | 1846.01   | 1.55             |
| LightGBM     | 1936.83 | 1869.23   | 1.34             |
| XGBoost      | 2325.40 | 1866.70   | 0.60             |
| RandomForest | 1989.76 | 1897.76   | 38.26            |
| Ridge        | 2085.99 | 2026.17   | 0.23             |
| SmartKNN     | 2227.13 | 2141.85   | 0.40             |
| KNN          | 2292.37 | 2216.83   | 19.54            |
| DecisionTree | 2907.48 | 2704.40   | 0.15             |

---

## [Buzz in Social Media (Twitter)](https://www.openml.org/d/4549)

| Model        | CV RMSE | Test RMSE | Single P95 (ms) |
|--------------|---------|-----------|------------------|
| RandomForest | 162.14  | 137.73    | 37.77            |
| Ridge        | 166.66  | 156.38    | 0.16             |
| SmartKNN     | 160.30  | 166.91    | 0.37             |
| KNN          | 163.58  | 172.84    | 38.89            |
| DecisionTree | 252.82  | 196.36    | 0.17             |
| LightGBM     | 187.52  | 209.01    | 1.20             |
| CatBoost     | 228.11  | 246.56    | 1.52             |
| XGBoost      | 286.47  | 265.39    | 0.58             |

---

## [California Housing](https://www.openml.org/d/43939)

| Model        | CV RMSE | Test RMSE | Single P95 (ms) |
|--------------|---------|-----------|------------------|
| CatBoost     | 46494.19| 45589.21  | 1.28             |
| XGBoost      | 48866.09| 46888.93  | 0.58             |
| LightGBM     | 48476.02| 47651.31  | 1.05             |
| RandomForest | 50266.48| 49046.64  | 36.87            |
| SmartKNN     | 61998.65| 61613.37  | 0.18             |
| KNN          | 62183.02| 61572.17  | 0.65             |
| DecisionTree | 70126.62| 69915.73  | 0.16             |
| Ridge        | 68646.24| 70158.56  | 0.11             |

---

## [Wine Reviews](https://www.openml.org/d/41275)

| Model        | CV RMSE | Test RMSE | Single P95 (ms) |
|--------------|---------|-----------|------------------|
| CatBoost     | 2.2060  | 2.1289    | 1.72             |
| LightGBM     | 2.2113  | 2.1472    | 1.04             |
| RandomForest | 2.2291  | 2.1558    | 35.51            |
| XGBoost      | 2.2990  | 2.1578    | 0.51             |
| SmartKNN     | 2.3285  | 2.3331    | 0.21             |
| KNN          | 2.3759  | 2.3559    | 0.69             |
| Ridge        | 2.4561  | 2.4344    | 0.19             |
| DecisionTree | 3.1205  | 2.8906    | 0.15             |

---

## [California Environmental Conditions](https://www.openml.org/d/43606)

| Model        | CV RMSE | Test RMSE | Single P95 (ms) |
|--------------|---------|-----------|------------------|
| RandomForest | 0.1122  | 0.1035    | 34.35            |
| XGBoost      | 0.1206  | 0.1104    | 0.56             |
| CatBoost     | 0.1156  | 0.1104    | 1.16             |
| SmartKNN     | 0.1175  | 0.1127    | 0.22             |
| LightGBM     | 0.1175  | 0.1138    | 1.02             |
| KNN          | 0.1203  | 0.1190    | 3.71             |
| DecisionTree | 0.1593  | 0.1485    | 0.15             |
| Ridge        | 0.1517  | 0.1550    | 0.18             |

---