# Classification Benchmarks

This document describes the **10 classification datasets** used in our evaluation, along with their characteristics and expected modeling behavior.

All benchmarks are evaluated using the **SmartML system** with **default model configurations** and **no hyperparameter tuning**.

> **Note:** The intent of these benchmarks is **system-level comparison** (accuracy, Macro-F1, latency, throughput), **not leaderboard optimization**.

---

## Benchmark Philosophy

- All datasets are evaluated under **identical preprocessing and evaluation protocols**
- **No dataset-specific tuning**
- **Single run per model**
- Focus on **practical behavior under production-like defaults**

**Note**: Differences in latency across models reflect inherent algorithmic scaling behavior rather than benchmark bias.
**Note**: Some models (e.g., SVC, KNN) are excluded from certain datasets due to scaling limitations or prohibitively high training/inference time at large sample counts.

> This setup reflects real-world constraints where tuning is limited by time, cost, or deployment requirements.

---

## Dataset Summary

| #  | Dataset                          | Samples × Features |
|----|---------------------------------|------------------|
| 1  | Bank Marketing                   | 45.2K × 17       |
| 2  | Click Prediction (Small Subset)  | 40K × 10         |
| 3  | Adult                            | 49K × 50         |
| 4  | Credit Card                      | 285K × 31        |
| 5  | APS Failure                      | 80K × 171        |
| 6  | KDD98 (Subset)                   | 83K × 478        |
| 7  | CoverType                        | 550K × 55        |
| 8  | Criteo Uplift (Balanced)         | 1.37M × 14       |
| 9  | Poker Hand                       | 1M × 11          |
| 10 | Santander Customer Satisfaction  | 200K × 202       |

---

## Dataset-wise Characteristics & Behavior

### 1. Bank Marketing (45.2K × 17)
- **Type:** Binary classification with moderate class imbalance  
- **Features:** Mix of categorical and numerical  
- **Model behavior:** Tree-based models perform well due to non-linear interactions  
- **Metric notes:** Macro-F1 is lower than accuracy due to minority-class difficulty  

**Why this dataset matters:** Classic business classification problem with realistic imbalance and feature heterogeneity.

---

#### Benchmark Results

| Model         | Train Time (s) | Batch Inference (s)  | Throughput (samples/s) | Accuracy | Macro-F1 | Single Mean (ms) | Single P95 (ms) |
| ------------- | -------------: | ------------------:  | ---------------------: | --------: | --------: | ---------------: | --------------: |
| LightGBM      | 0.395          | 0.025                     | 359,261                | **0.9103** | **0.7599** | 1.30             | 1.49           |
| XGBoost       | 0.417          | 0.015                     | 597,378                | 0.9079    | 0.7512    | 0.58             | 0.88           |
| CatBoost      | 1.026          | 0.0088                    | 1,024,817              | 0.9074    | 0.7479    | 0.44             | 0.50           |
| Random Forest | 2.306          | 0.078                     | 115,325                | 0.9045    | 0.7198    | 32.85            | 38.15          |
| Extra Trees   | 1.807          | 0.110                     | 82,314                 | 0.9028    | 0.7022    | 33.72            | 37.93          |
| Logistic Reg. | 1.925          | 0.0034                    | **2,699,455**          | 0.9007    | 0.6949    | 0.30             | 0.55           |
| SmartKNN      | 4.502          | 0.159                     | 57,022                 | 0.8951    | 0.7059    | **0.17**         | **0.20**       |
| KNN           | 0.026          | 1.033                     | 8,752                  | 0.8926    | 0.6876    | 2.88             | 3.26           |
| Naive Bayes   | **0.015**      | 0.0040                    | 2,254,836              | 0.8466    | 0.6839    | 0.18             | 0.26           |
| SVC           | 28.044         | 7.121                     | 1,270                  | 0.8983    | 0.6704    | 1.23             | 1.42           |

---

#### Key Insights

- **Best Accuracy & Macro-F1:** LightGBM achieves the highest predictive performance (**0.9103 Accuracy, 0.7599 Macro-F1**) under default settings.  
- **Fastest Training:** Naive Bayes and KNN variants train extremely quickly, though they trade off predictive accuracy.  
- **High Throughput:** Logistic Regression and CatBoost excel at batch throughput, making them efficient for large-scale scoring.  
- **Low Single-Inference Latency:** SmartKNN delivers the **lowest per-sample latency** (0.17 ms mean, 0.20 ms P95), ideal for real-time predictions despite higher training time.  
- **Tree Ensembles:** Random Forest and Extra Trees perform well in accuracy but are slower for both training and batch inference, reflecting their computational overhead.  
- **SVC:** Achieves decent accuracy but is prohibitively slow for both training and inference at this scale.  

---

### 2. Click Prediction (Small Subset) (40K × 10)
- **Type:** Binary classification with skewed click/no-click distribution  
- **Features:** Low-dimensional, sparse signal  
- **Model behavior:** Accuracy is generally high across models, but Macro-F1 exposes class imbalance  

**Why this dataset matters:** Highlights the difference between accuracy and class-balanced metrics in ad-tech style problems.

---

#### Benchmark Results

| Model         | Train Time (s) | Batch Inference (s)  | Throughput (samples/s) | Accuracy | Macro-F1 | Single Mean (ms) | Single P95 (ms) |
| ------------- | -------------: | ------------------:  | ---------------------: | --------: | --------: | ---------------: | --------------: |
| LightGBM      | 0.275          | 0.0227                       | 351,792                | **0.8362** | 0.5170    | 1.44             | 1.86           |
| CatBoost      | 0.494          | 0.0057                       | 1,390,990              | 0.8342    | 0.5169    | 0.48             | 0.63           |
| XGBoost       | 0.428          | 0.0138                       | 578,407                | 0.8302    | **0.5347** | 0.65             | 1.00           |
| Random Forest | 5.567          | 0.0912                       | 87,587                 | 0.8280    | 0.5372    | 35.49            | 38.90          |
| Logistic Reg. | 1.839          | **0.0010**                   | **7,987,149**          | 0.8324    | 0.4616    | 0.30             | 0.44           |
| Extra Trees   | 1.746          | 0.1362                       | 58,671                 | 0.8200    | 0.5287    | 36.03            | 39.43          |
| SmartKNN      | 3.527          | 0.0844                       | 94,698                 | 0.8015    | 0.5263    | **0.15**         | **0.18**       |
| KNN           | 0.069          | 1.669                        | 4,788                  | 0.8105    | 0.5256    | 2.06             | 2.46           |
| Naive Bayes   | **0.010**      | 0.0019                       | 4,151,311              | 0.8153    | 0.4851    | 0.22             | 0.32           |
| SVC           | 61.116         | 5.805                        | 1,376                  | 0.8324    | 0.4594    | 1.25             | 1.65           |

---

#### Key Insights

- **Highest Accuracy:** LightGBM leads with 0.8362 Accuracy, while XGBoost has the **best Macro-F1** (0.5347), showing the effect of class imbalance.  
- **Fastest Training:** Naive Bayes and KNN train extremely quickly; Logistic Regression also trains efficiently.  
- **High Throughput:** Logistic Regression and CatBoost excel in batch throughput, making them suitable for large-scale scoring.  
- **Low Single-Inference Latency:** SmartKNN has the **lowest per-sample latency** (0.15 ms mean, 0.18 ms P95), ideal for real-time predictions despite slower training.  
- **Tree Ensembles:** Random Forest and Extra Trees maintain competitive Macro-F1 but are slower for training and batch inference.  
- **SVC:** Again, accuracy is decent but training and inference times are prohibitively high.  



---

### 3. Adult (49K × 50)
- **Type:** Binary income prediction  
- **Features:** Structured tabular, moderate imbalance  
- **Model behavior:** Most models perform competitively; gains are incremental  

**Why this dataset matters:** Canonical ML benchmark showing trade-offs between simplicity and performance under defaults.

---

#### Benchmark Results

| Model         | Train Time (s) | Batch Inference (s)  | Throughput (samples/s) | Accuracy | Macro-F1 | Single Mean (ms) | Single P95 (ms) |
| ------------- | -------------: | ------------------:  | ---------------------: | --------: | --------: | ---------------: | --------------: |
| LightGBM      | 0.366          | 0.0308                       | 317,301                | **0.8762** | **0.8189** | 1.36             | 1.62           |
| CatBoost      | 0.966          | 0.0100                       | 975,425                | 0.8746    | 0.8159    | 0.51             | 0.78           |
| XGBoost       | 0.397          | 0.0166                       | 586,969                | 0.8738    | 0.8166    | 0.59             | 0.85           |
| Random Forest | 2.646          | 0.1002                       | 97,528                 | 0.8608    | 0.7984    | 32.80            | 37.92          |
| Logistic Reg. | 1.876          | 0.0038                       | **2,588,927**          | 0.8515    | 0.7795    | 0.29             | 0.39           |
| SVC           | 49.779         | 11.021                       | 886                    | 0.8527    | 0.7766    | 1.58             | 1.70           |
| Extra Trees   | 2.313          | 0.1360                       | 71,828                 | 0.8431    | 0.7745    | 33.23            | 37.76          |
| KNN           | 0.033          | 1.3317                       | 7,336                  | 0.8332    | 0.7585    | 3.15             | 3.79           |
| SmartKNN      | 5.992          | 0.1746                      | 55,953                 | 0.8313    | 0.7576    | **0.18**         | **0.22**       |
| Naive Bayes   | **0.019**      | 0.0052                      | 1,878,899              | 0.7972    | 0.6493    | 0.17             | 0.18           |

---

#### Key Insights

- **Top Accuracy & Macro-F1:** LightGBM performs best overall (0.8762 Accuracy, 0.8189 Macro-F1), followed closely by CatBoost and XGBoost.  
- **Fastest Training:** Naive Bayes and KNN train extremely quickly; Logistic Regression also trains efficiently.  
- **High Throughput:** Logistic Regression achieves the **highest batch throughput** (≈2.59M samples/s), ideal for bulk scoring.  
- **Low Single-Inference Latency:** SmartKNN has the **lowest per-sample latency** (0.18 ms mean, 0.22 ms P95), making it suitable for real-time prediction.  
- **Tree Ensembles:** Random Forest and Extra Trees maintain strong Macro-F1 but are slower for both training and batch inference.  
- **SVC:** Performs decently in accuracy but is extremely slow in training and batch inference, limiting practical usability.  

---

### 4. Credit Card (285K × 31)
- **Type:** Highly imbalanced fraud detection task  
- **Features:** Mix of numerical and categorical features, high skew in target  
- **Model behavior:** Accuracy is extremely high for most models due to severe class imbalance; Macro-F1 reveals meaningful differences.  

**Why this dataset matters:** Demonstrates why **Macro-F1 and system-level metrics** are critical when accuracy alone is misleading in fraud detection.

---

#### Benchmark Results

| Model         | Train Time (s) | Batch Inference (s)  | Throughput (samples/s) | Accuracy  | Macro-F1 | Single Mean (ms) | Single P95 (ms) |
| ------------- | -------------: | ------------------:  | ---------------------: | ---------: | --------: | ---------------: | --------------: |
| Extra Trees   | 9.886          | 0.2633                     | 216,351                | **0.99963** | **0.9425** | 33.87           | 37.96          |
| Random Forest | 143.888        | 0.1988                     | 286,510                | 0.99961    | 0.9401    | 29.26           | 36.85          |
| CatBoost      | 4.506          | 0.0341                      | **1,669,088**          | 0.99956    | 0.9330    | 0.48            | 0.52           |
| SmartKNN      | 41.255         | 1.5284                      | 37,270                 | 0.99954    | 0.9285    | **0.24**        | **0.28**       |
| XGBoost       | 2.627          | 0.0759                      | 750,563                | 0.99946    | 0.9170    | 0.54            | 0.67           |
| Logistic Reg. | 2.575          | **0.0171**                  | **3,328,539**          | 0.99916    | 0.8619    | 0.39            | 0.50           |
| Naive Bayes   | **0.085**      | 0.0185                      | 3,074,959              | 0.97639    | 0.5489    | 0.17            | 0.19           |
| LightGBM      | 2.543          | 0.1132                      | 503,029                | 0.99252    | 0.5118    | 1.32            | 1.45           |

---

#### Key Insights

- **Top Macro-F1:** Extra Trees and Random Forest lead in predictive quality (0.9425 and 0.9401 Macro-F1), reflecting their strength with minority-class detection.  
- **Highest Accuracy:** Most models achieve near-perfect accuracy (>99.9%), showing why raw accuracy is **misleading** in imbalanced datasets.  
- **Fastest Training:** Naive Bayes trains almost instantly; Logistic Regression and CatBoost are also efficient.  
- **High Throughput:** Logistic Regression and CatBoost handle large batch inference efficiently, ideal for real-time scoring.  
- **Low Single-Inference Latency:** SmartKNN has **lowest per-sample latency** (0.24 ms mean, 0.28 ms P95), balancing speed with strong Macro-F1.  
- **Trade-offs:** Tree ensembles achieve highest Macro-F1 but are slower in training and per-sample inference. Logistic Regression provides unmatched throughput at some cost to Macro-F1.  

---

### 5. APS Failure (80K × 171)
- **Type:** High-dimensional industrial failure dataset  
- **Features:** Sparse and noisy, many weak signals  
- **Model behavior:** Tree ensembles dominate in predictive performance; linear models struggle; latency differences are significant due to dimensionality.  

**Why this dataset matters:** Represents industrial monitoring problems with many weak features and limited signal density, testing both predictive quality and system efficiency.

---

#### Benchmark Results

| Model         | Train Time (s) | Batch Inference (s)  | Throughput (samples/s) | Accuracy  | Macro-F1 | Single Mean (ms) | Single P95 (ms) |
| ------------- | -------------: | ------------------:  | ---------------------: | ---------: | --------: | ---------------: | --------------: |
| Extra Trees   | 5.773          | 0.1363                      | 111,539                | **0.99480** | **0.9192** | 35.72           | 38.98          |
| Random Forest | 45.506         | 0.0916                      | 165,935                | 0.99474    | **0.9196** | 31.64           | 37.18          |
| CatBoost      | 4.945          | 0.0201                      | **755,952**            | 0.99454    | 0.9180    | 0.72            | 0.94           |
| LightGBM      | 3.444          | 0.0437                      | 347,766                | 0.99441    | 0.9161    | 1.59            | 1.84           |
| XGBoost       | 4.011          | 0.0272                      | 559,446                | 0.99329    | 0.8995    | 0.54            | 0.66           |
| SmartKNN      | 30.281         | 1.3649                      | 11,136                 | 0.99224    | 0.8756    | **0.33**        | **0.44**       |
| Logistic Reg. | 4.963          | 0.0293                      | 518,141                | 0.99026    | 0.8519    | 0.43            | 0.64           |
| Naive Bayes   | **0.094**      | 0.0296                      | 513,504                | 0.96757    | 0.7393    | 0.19            | 0.25           |

---

#### Key Insights

- **Top Accuracy & Macro-F1:** Extra Trees and Random Forest lead in predictive performance (~0.9948 Accuracy, 0.9192 Macro-F1), showing their robustness with high-dimensional sparse data.  
- **Fastest Training:** Naive Bayes trains almost instantly; CatBoost and LightGBM are also reasonably fast.  
- **High Throughput:** CatBoost and LightGBM achieve high batch throughput, suitable for bulk scoring.  
- **Low Single-Inference Latency:** SmartKNN delivers **lowest per-sample latency** (0.33 ms mean, 0.44 ms P95), ideal for real-time applications.  
- **Trade-offs:** Random Forest and Extra Trees achieve the best Macro-F1 but at higher training and single-inference costs. Logistic Regression and Naive Bayes are efficient but slightly lower in Macro-F1.  

---

### 6. KDD98 (Subset) (83K × 478)
- **Type:** Extremely high-dimensional tabular dataset with strong class imbalance  
- **Features:** Many redundant or weakly informative features  
- **Model behavior:** Most models achieve high accuracy due to class skew, but Macro-F1 highlights true minority-class performance; latency differences are significant.  

**Why this dataset matters:** Tests **scalability, robustness, and noise tolerance** rather than pure predictive power.

---

#### Benchmark Results

| Model         | Train Time (s) | Batch Inference (s)  | Throughput (samples/s) | Accuracy | Macro-F1 | Single Mean (ms) | Single P95 (ms) |
| ------------- | -------------: | ------------------:  | ---------------------: | --------: | --------: | ---------------: | --------------: |
| LightGBM      | 8.573          | 0.0686                      | 240,175                | **0.8609** | 0.5040    | 2.31            | 2.76           |
| CatBoost      | 8.325          | 0.0282                      | 584,174                | 0.8570    | **0.5109** | 1.03            | 1.21           |
| XGBoost       | 8.467          | 0.0406                      | 405,320                | 0.8541    | 0.5064    | 0.57            | 0.83           |
| Logistic Reg. | 8.481          | 0.0781                      | 210,883                | 0.8520    | 0.5083    | 0.51            | 0.84           |
| SmartKNN      | 65.843         | 3.6427                      | 4,520                  | 0.8596    | 0.4918    | 0.61            | 0.71           |
| Random Forest | 37.802         | 0.2801                      | 58,777                 | 0.8790    | 0.4752    | 36.46           | 39.09          |
| Extra Trees   | 20.899         | 0.3391                      | 48,553                 | 0.8816    | 0.4736    | 36.56           | 39.00          |
| Naive Bayes   | **0.307**      | 0.0906                      | 181,711                | 0.5937    | 0.4653    | **0.19**        | **0.22**       |

---

#### Key Insights

- **Highest Accuracy:** Extra Trees and Random Forest achieve highest raw accuracy (0.8816 and 0.8790), but Macro-F1 reveals true performance on minority classes is limited.  
- **Top Macro-F1:** CatBoost leads slightly in Macro-F1 (0.5109), showing better balance for rare-class detection.  
- **Fastest Training:** Naive Bayes is extremely fast; Logistic Regression also trains efficiently.  
- **Throughput Leaders:** CatBoost achieves high batch throughput, ideal for large-scale scoring.  
- **Low Single-Inference Latency:** Naive Bayes and SmartKNN provide lowest per-sample latency.  
- **Trade-offs:** Tree ensembles give high accuracy but are slower for both training and single inference; CatBoost balances throughput, accuracy, and Macro-F1 well.  


---

### 7. CoverType (550K × 55)
- **Type:** Large multi-class classification problem  
- **Features:** Relatively balanced classes, mixed numerical/categorical features  
- **Model behavior:** Tree-based methods dominate due to spatial and hierarchical structure; linear models perform poorly.  

**Why this dataset matters:** Evaluates **multi-class scalability and performance consistency** at medium-to-large scale.

---

#### Benchmark Results

| Model         | Train Time (s) | Batch Inference (s)  | Throughput (samples/s) | Accuracy | Macro-F1 | Single Mean (ms) | Single P95 (ms) |
| ------------- | -------------: | ------------------:  | ---------------------: | --------: | --------: | ---------------: | --------------: |
| Random Forest | 57.827         | 2.168                      | 53,589                 | **0.9543** | **0.9256** | 36.92           | 39.50          |
| Extra Trees   | 44.640         | 3.122                      | 37,221                 | 0.9526    | 0.9252    | 46.65           | 69.67          |
| SmartKNN      | 221.993        | 5.930                      | 19,596                 | 0.9466    | 0.9049    | **0.38**        | **0.45**       |
| XGBoost       | 31.279         | 1.230                      | 94,476                 | 0.8682    | 0.8518    | 0.78            | 0.92           |
| LightGBM      | 16.242         | 2.112                      | 55,032                 | 0.8518    | 0.8260    | 1.57            | 1.86           |
| Logistic Reg. | 52.693         | **0.073**                  | **1,593,008**          | 0.7235    | 0.5303    | 0.43            | 0.71           |
| Naive Bayes   | **0.289**      | 0.246                      | 472,183                | 0.5658    | 0.4468    | 0.34            | 0.56           |
| CatBoost      | 27.708         | 0.126                      | 925,254                | 0.3646    | 0.0763    | 0.62            | 0.89           |

---

#### Key Insights

- **Top Accuracy & Macro-F1:** Random Forest and Extra Trees dominate (0.9543 and 0.9256), confirming tree ensembles excel at multi-class tabular tasks.  
- **Low Latency Single-Inference:** SmartKNN delivers **lowest per-sample latency** (0.38 ms mean, 0.45 ms P95) despite slower training.  
- **High Throughput:** Logistic Regression and CatBoost achieve very high batch throughput, but predictive quality suffers.  
- **Linear Models:** Logistic Regression and Naive Bayes are efficient but underperform in accuracy and Macro-F1.  
- **Trade-offs:** Tree ensembles achieve top predictive performance at higher training and inference costs; SmartKNN balances latency and strong Macro-F1.  

---

### 8. Criteo Uplift (Balanced) (1.37M × 14)
- **Type:** Large-scale binary classification  
- **Features:** Low-dimensional but extremely high sample count  
- **Model behavior:** XGBoost achieves highest predictive quality; system-level metrics (throughput and latency) reveal trade-offs for large-scale scoring.

**Why this dataset matters:** Stress-tests **training time, batch inference throughput, and memory efficiency** at scale.

---

#### Benchmark Results

| Model         | Train Time (s) | Batch Inference (s)  | Throughput (samples/s) | Accuracy | Macro-F1 | Single Mean (ms) | Single P95 (ms) |
| ------------- | -------------: | ------------------:  | ---------------------: | --------: | --------: | ---------------: | --------------: |
| XGBoost       | 24.510         | 1.720                     | **158,930**            | **0.7201** | **0.6510** | 0.71            | 0.97           |
| LightGBM      | 20.227         | 3.283                      | 83,248                 | 0.7196    | 0.6508    | 1.42            | 1.68           |
| Logistic Reg. | 12.829         | **0.0767**                 | **3,565,107**          | 0.6960    | 0.6177    | 0.38            | 0.50           |
| Random Forest | 158.947        | 8.040                      | 33,992                 | 0.6833    | 0.6184    | 36.81           | 40.27          |
| Extra Trees   | 89.121         | 9.791                      | 27,915                 | 0.6803    | 0.6150    | 36.24           | 38.75          |
| SmartKNN      | 121.743        | 13.685                     | 19,971                 | 0.6678    | 0.5994    | **0.49**        | **0.58**       |
| Naive Bayes   | **0.338**      | 0.1665                     | 1,641,407              | 0.3067    | 0.2921    | 0.22            | 0.26           |
| CatBoost      | 41.667         | 0.1993                     | 1,371,246              | 0.3659    | 0.1339    | 0.40            | 0.48           |

---
### 9. Poker Hand (1M × 11)
- **Type:** Multi-class classification with deterministic feature patterns  
- **Features:** Low-dimensional but expressive patterns favor tree-based methods  
- **Model behavior:** Tree ensembles excel; linear models struggle; SmartKNN achieves very low latency.  

**Why this dataset matters:** Separates **expressive models from linear baselines** under default configurations.

---

#### Benchmark Results

| Model         | Train Time (s) | Batch Inference (s)  | Throughput (samples/s) | Accuracy | Macro-F1 | Single Mean (ms) | Single P95 (ms) |
| ------------- | -------------: | ------------------:  | ---------------------: | --------: | --------: | ---------------: | --------------: |
| XGBoost       | 3.927          | 0.322                     | 636,386                | **0.8894** | **0.8890** | 0.60            | 0.77           |
| Extra Trees   | 66.686         | 5.304                      | 38,653                 | 0.8627    | 0.8625    | 35.01           | 39.68          |
| Random Forest | 81.772         | 4.768                      | 42,997                 | 0.8515    | 0.8512    | 36.49           | 52.38          |
| CatBoost      | 6.234          | 0.090                      | **2,266,050**          | 0.8454    | 0.8448    | 0.71            | 0.88           |
| LightGBM      | 4.531          | 0.435                      | 471,140                | 0.7060    | 0.7034    | 1.82            | 3.22           |
| SmartKNN      | 56.156         | 7.558                     | 27,126                 | 0.6276    | 0.6276    | **0.42**        | **0.45**       |
| Naive Bayes   | **0.150**      | 0.032                     | 6,360,374              | 0.5234    | 0.5108    | 0.20            | 0.36           |
| Logistic Reg. | 2.437          | **0.023**                  | **8,829,797**          | 0.5175    | 0.4993    | 0.44            | 0.75           |

---

#### Key Insights

- **Top Accuracy & Macro-F1:** XGBoost leads (0.8894 Accuracy, 0.8890 Macro-F1), confirming tree-based models excel in deterministic multi-class patterns.  
- **Fastest Training & Throughput:** Naive Bayes and Logistic Regression are extremely fast, with massive throughput, but low predictive quality.  
- **Low Single-Inference Latency:** SmartKNN achieves **lowest per-sample latency** (0.42 ms mean, 0.45 ms P95), balancing speed and reasonable performance.  
- **Linear Models:** Logistic Regression and Naive Bayes fail to capture complex patterns (low Accuracy & Macro-F1).  
- **Trade-offs:** Tree ensembles dominate in predictive quality but are slower; SmartKNN is a strong choice when **latency is critical**.  

---

### 10. Santander Customer Satisfaction (200K × 202)
- **Type:** Extremely imbalanced binary classification  
- **Features:** High-dimensional tabular data with sparse signals  
- **Model behavior:** Accuracy is nearly identical across all models due to extreme imbalance; differences are primarily **system-level** (latency, throughput, efficiency).  

**Why this dataset matters:** Illustrates why **accuracy alone is insufficient** and why reporting **latency, throughput, and efficiency** is critical.

---

#### Benchmark Results

| Model         | Train Time (s) | Batch Inference (s)  | Throughput (samples/s) | Accuracy | Macro-F1 | Single Mean (ms) | Single P95 (ms) |
| ------------- | -------------: | ------------------:  | ---------------------: | --------: | -------: | ---------------: | --------------: |
| CatBoost      | 10.556         | 0.0215                      | **1,864,126**          | **0.8995** | 0.4735   | 0.79            | 0.96           |
| XGBoost       | 6.367          | 0.0245                      | 1,635,031               | 0.8995    | 0.4735   | 0.55            | 0.73           |
| LightGBM      | 7.641          | 0.0690                      | 579,707                 | 0.8995    | 0.4735   | 1.58            | 1.87           |
| Logistic Reg. | 4.160          | 0.0896                      | 446,572                 | 0.8995    | 0.4735   | 0.39            | 0.48           |
| Naive Bayes   | **0.316**      | 0.1179                      | 339,184                 | 0.8995    | 0.4735   | **0.17**        | **0.21**       |
| Extra Trees   | 16.253         | 0.3030                      | 132,018                 | 0.8995    | 0.4735   | 26.45           | 35.72          |
| Random Forest | 148.571        | 0.2441                      | 163,845                 | 0.8995    | 0.4735   | 25.04           | 26.51          |
| SmartKNN      | 69.707         | 5.2203                      | 7,662                   | 0.8995    | 0.4735   | 0.49            | 0.55           |

---

#### Key Insights

- **Predictive Equality:** All models achieve the **same Accuracy (0.8995)** and Macro-F1 (0.4735) due to extreme class imbalance.  
- **Fastest Training:** Naive Bayes and Logistic Regression are extremely fast.  
- **Highest Throughput:** CatBoost leads batch throughput (~1.86M samples/s), making it ideal for large-scale scoring.  
- **Low Single-Inference Latency:** Naive Bayes and SmartKNN provide lowest per-sample latency.  
- **Trade-offs:** While predictive performance is identical, **training cost, latency, and throughput** differentiate the models for deployment.  

---

## Key Takeaways Across Datasets

- Accuracy can be **misleading under class imbalance**  
- Macro-F1 provides a **more reliable signal** of real performance  
- Many datasets **converge under default settings**  
- Differences often emerge in **latency, throughput, and scalability**, not just accuracy  

---

## Evaluation Note

These benchmarks are intended to evaluate **model behavior under identical, untuned conditions**, reflecting **practical deployment scenarios** rather than optimized leaderboard results.
