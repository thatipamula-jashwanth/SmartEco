# Regression Benchmarks

This document describes the **10 regression datasets** used in our evaluation, along with their characteristics and expected modeling behavior.

All benchmarks are evaluated using the **SmartML system** with **default model configurations** and **no hyperparameter tuning**.

> **Note**: The intent of these benchmarks is **system-level comparison** (MSE, R², latency, throughput), **not leaderboard optimization**.

---

## Benchmark Philosophy

- All datasets are evaluated under **identical preprocessing and evaluation protocols**
- **No dataset-specific tuning**
- **Single run per model**
- Focus on **practical behavior under production-like defaults**

**Note**: Differences in latency across models reflect inherent algorithmic scaling behavior rather than benchmark bias.
**Note**: Some models (e.g., SVR, KNN) are excluded from certain datasets due to scaling limitations or prohibitively high training/inference time at large sample counts.

> This setup reflects real-world constraints where tuning is limited by time, cost, or deployment requirements.

---

## Dataset Summary

| #  | Dataset                          | Samples × Features |
|----|--------------------------------- |------------------|
| 1  | DIAMONDS                         | 54k * 10         |
| 2  | SARCOS                           | 45K × 22         |
| 3  | Wave Energy                      | 72K × 49         |
| 4  | Buzzinsocialmedia_Twitter        | 580K × 78        |
| 5  | California-Environmental         | 128K × 19        |
| 6  | Diabetes-130-Hospitals           | 102K × 25        |
| 7  | CoverType                        | 567K × 11        |
| 8  | SGEMM_GPU_kernel_performance     | 242K × 15        |
| 9  | DutchTwitterDataset              | 451K × 20        |
| 10 | Autos                            | 1M × 28          |


---

## Dataset Overview

### 1. DIAMONDS (54K × 10)
- **Samples:** 54,000  
- **Features:** 10 (including carat, cut, color, clarity, and physical dimensions of the diamond)  
- **Target:** Price of the diamond (continuous variable)  
- **Dataset characteristics:**  
  - Mix of categorical (cut, color, clarity) and numerical features (carat, x, y, z).  
  - Moderate feature correlation; strong non-linear relationships.  
  - Popular benchmark for **regression with tabular data**.  

---

## Benchmark Results

| Model         | Train Time (s) | Batch Inference (s) | Batch Samples | Batch Throughput (samples/s) | R²       | MSE           | Single Mean (ms) | Single P95 (ms) |
|---------------|----------------:|------------------:|--------------:|-----------------------------:|----------|---------------|----------------:|----------------:|
| LightGBM      | 0.315          | 0.027             | 10,788        | 405,639                     | **0.9817** | 291,703       | 0.978           | 1.205           |
| Random Forest | 10.848         | 0.155             | 10,788        | 69,383                      | 0.9810   | 302,595       | 33.50           | 37.18           |
| Extra Trees   | 8.436          | 0.189             | 10,788        | 56,983                      | 0.9806   | 308,089       | 34.78           | 37.54           |
| CatBoost      | 0.668          | 0.0055            | 10,788        | 1,955,742                   | 0.9803   | 312,984       | 0.842           | 0.934           |
| XGBoost       | 0.361          | 0.0172            | 10,788        | 628,996                     | 0.9800   | 318,286       | 0.485           | 0.616           |
| SmartKNN      | 7.835          | 0.163             | 10,788        | 66,065                      | 0.9764   | 375,274       | 0.143           | 0.163           |
| KNN           | 0.025          | 1.322             | 10,788        | 8,161                        | 0.9575   | 675,779       | 2.729           | 3.105           |
| Lasso         | 0.215          | 0.0031            | 10,788        | 3,506,000                    | 0.9190   | 1,288,437     | 0.379           | 0.462           |
| Ridge         | 0.036          | 0.0029            | 10,788        | 3,671,000                    | 0.9189   | 1,288,693     | 0.327           | 0.382           |
| Linear        | 0.069          | 0.0033            | 10,788        | 3,254,000                    | 0.9189   | 1,288,705     | 0.335           | 0.437           |
| ElasticNet    | 0.054          | 0.0033            | 10,788        | 3,243,000                    | 0.8489   | 2,402,448     | 0.359           | 0.437           |
| SVR           | 144.856        | 31.827            | 10,788        | 339                          | 0.3541   | 10,267,090    | 3.595           | 3.733           |


--- 

### 2. SARCOS (45K × 22)
- **Samples:** 45,000  
- **Features:** 22 (joint positions, velocities, and accelerations of a 7-DOF robot arm)  
- **Target:** Torques for 7 robot joints (continuous variables)  
- **Dataset characteristics:**  
  - All numerical features; no categorical data.  
  - Strong non-linear relationships between joint states and torques.  
  - Popular benchmark for **high-dimensional regression** with real-world physical measurements.  

---

## Benchmark Results

| Model         | Train Time (s) | Batch Inference (s) | Batch Samples | Batch Throughput (samples/s) | R²       | MSE       | Single Mean (ms) | Single P95 (ms) |
|---------------|----------------:|------------------:|--------------:|-----------------------------:|----------|-----------|----------------:|----------------:|
| Extra Trees   | 10.920          | 0.162             | 8,897         | 54,859                       | **0.9803** | 8.087     | 34.32           | 36.92           |
| SmartKNN      | 7.839           | 0.127             | 8,897         | 69,784                       | 0.9786   | 8.800     | 0.143           | 0.166           |
| Random Forest | 47.589          | 0.142             | 8,897         | 62,690                       | 0.9740   | 10.675    | 35.09           | 38.41           |
| XGBoost       | 0.648           | 0.015             | 8,897         | 612,661                      | 0.9740   | 10.681    | 0.461           | 0.526           |
| KNN           | 0.010           | 0.870             | 8,897         | 10,224                       | 0.9716   | 11.685    | 1.851           | 2.522           |
| LightGBM      | 0.455           | 0.028             | 8,897         | 314,392                      | 0.9682   | 13.083    | 0.868           | 0.932           |
| CatBoost      | 0.723           | 0.0035            | 8,897         | 2,545,808                     | 0.9677   | 13.259    | 0.926           | 1.017           |
| Ridge         | 0.014           | 0.0017            | 8,897         | 5,192,842                     | 0.9239   | 31.277    | 0.317           | 0.342           |
| Linear        | 0.019           | 0.0017            | 8,897         | 5,212,028                     | 0.9239   | 31.278    | 0.310           | 0.349           |
| Lasso         | 0.051           | 0.0019            | 8,897         | 4,793,474                     | 0.8946   | 43.329    | 0.482           | 0.975           |
| ElasticNet    | 0.016           | 0.0019            | 8,897         | 4,761,156                     | 0.7480   | 103.577   | 0.343           | 0.367           |


---

### 3. Wave Energy (72K × 49)
- **Samples:** 72,000  
- **Features:** 49 (wave measurements and derived features for energy prediction)  
- **Target:** Wave energy output (continuous)  
- **Dataset characteristics:**  
  - All numerical features; some highly correlated.  
  - Moderate-to-high dimensionality (49 features).  
  - Designed to test **robust regression under complex feature interactions**.  


---

## Benchmark Results

| Model         | Train Time (s) | Batch Inference (s) | Batch Samples | Batch Throughput (samples/s) | R²       | MSE          | Single Mean (ms) | Single P95 (ms) |
|---------------|----------------:|------------------:|--------------:|-----------------------------:|----------|--------------|----------------:|----------------:|
| Ridge         | 0.041          | 0.005             | 14,400        | 2,871,421                     | 1.0000   | 5,269        | 0.350           | 0.430           |
| Linear        | 0.072          | 0.008             | 14,400        | 1,797,951                     | 1.0000   | 5,276        | 0.304           | 0.325           |
| Lasso         | 0.068          | 0.016             | 14,400        | 909,344                       | 1.0000   | 5,259        | 0.594           | 3.399           |
| CatBoost      | 1.534          | 0.004             | 14,400        | 4,022,440                     | 0.9897   | 1.282e+08    | 0.991           | 1.099           |
| XGBoost       | 1.941          | 0.024             | 14,400        | 598,174                       | 0.9577   | 5.292e+08    | 0.486           | 0.588           |
| LightGBM      | 1.348          | 0.042             | 14,400        | 344,427                       | 0.9416   | 7.300e+08    | 0.912           | 0.965           |
| ElasticNet    | 0.062          | 0.008             | 14,400        | 1,736,283                     | 0.8828   | 1.466e+09    | 0.358           | 0.413           |
| Extra Trees   | 42.536         | 0.286             | 14,400        | 50,349                        | 0.8476   | 1.906e+09    | 35.632          | 38.030          |
| Random Forest | 188.638        | 0.266             | 14,400        | 54,194                        | 0.8364   | 2.046e+09    | 33.863          | 37.039          |
| KNN           | 0.036          | 2.836             | 14,400        | 5,078                         | 0.7632   | 2.961e+09    | 4.118           | 4.379           |
| SmartKNN      | 18.191         | 0.343             | 14,400        | 41,933                        | 0.7568   | 3.042e+09    | 0.176           | 0.203           |


---

### 4. Buzzinsocialmedia_Twitter (580K × 78)
- **Samples:** 580,000  
- **Features:** 78 (user activity, tweet metadata, engagement metrics, etc.)  
- **Target:** Engagement score or related continuous metric  
- **Dataset characteristics:**  
  - Large-scale, high-dimensional dataset.  
  - Mix of highly correlated features and sparsity in some user activity fields.  
  - Designed to test **scalable regression models under real-world social media data**.  

---

## Benchmark Results

| Model         | Train Time (s) | Batch Inference (s) | Batch Samples | Batch Throughput (samples/s) | R²       | MSE           | Single Mean (ms) | Single P95 (ms) |
|---------------|----------------:|------------------:|--------------:|-----------------------------:|----------|---------------|----------------:|----------------:|
| Lasso         | 15.857          | 0.078             | 116,650       | 1,498,953                     | 0.9371   | 23,593.96     | 0.360           | 0.440           |
| Ridge         | 0.620           | 0.058             | 116,650       | 2,014,685                     | 0.9348   | 24,453.78     | 0.321           | 0.348           |
| Linear        | 1.456           | 0.057             | 116,650       | 2,058,530                     | 0.9302   | 26,175.83     | 0.302           | 0.328           |
| SmartKNN      | 253.027         | 7.679             | 116,650       | 15,190                        | 0.9256   | 27,894.62     | 0.413           | 0.460           |
| ElasticNet    | 30.218          | 0.085             | 116,650       | 1,365,232                     | 0.9010   | 37,113.69     | 0.345           | 0.384           |
| LightGBM      | 6.379           | 0.175             | 116,650       | 667,612                       | 0.8835   | 43,684.85     | 0.940           | 0.976           |
| CatBoost      | 17.685          | 0.091             | 116,650       | 1,283,054                     | 0.8466   | 57,517.84     | 1.690           | 3.726           |
| XGBoost       | 5.451           | 0.176             | 116,650       | 661,987                       | 0.8122   | 70,429.23     | 0.461           | 0.509           |

---

### 5. California-Environmental-Conditions-Dataset (128K × 19)
- **Samples:** 128,000  
- **Features:** 19 (temperature, humidity, air quality, pollution levels, etc.)  
- **Target:** Continuous environmental metric (e.g., air quality index or temperature prediction)  
- **Dataset characteristics:**  
  - Medium-scale regression dataset.  
  - Mostly numerical features with potential correlations.  
  - Includes both slowly varying environmental signals and occasional spikes.  

---

## Benchmark Results

| Model         | Train Time (s) | Batch Inference (s) | Batch Samples | Batch Throughput (samples/s) | R²        | MSE       | Single Mean (ms) | Single P95 (ms) |
|---------------|----------------:|------------------:|--------------:|-----------------------------:|-----------|-----------|----------------:|----------------:|
| XGBoost       | 0.643           | 0.040             | 25,625        | 641,179                       | 0.7275    | 0.01117   | 0.470           | 0.551           |
| LightGBM      | 0.562           | 0.033             | 25,625        | 777,359                       | 0.6970    | 0.01242   | 0.892           | 1.033           |
| SmartKNN      | 11.074          | 0.430             | 25,625        | 59,540                        | 0.6941    | 0.01254   | 0.161           | 0.182           |
| CatBoost      | 1.150           | 0.006             | 25,625        | 4,445,293                     | 0.6864    | 0.01285   | 0.998           | 1.164           |
| Linear        | 0.046           | 0.004             | 25,625        | 6,969,827                     | 0.4149    | 0.02397   | 0.332           | 0.386           |
| Ridge         | 0.038           | 0.003             | 25,625        | 7,881,582                     | 0.4149    | 0.02397   | 0.321           | 0.339           |
| Lasso         | 0.031           | 0.010             | 25,625        | 2,635,151                     | -0.00004  | 0.04098   | 0.627           | 3.439           |
| ElasticNet    | 0.034           | 0.016             | 25,625        | 1,636,454                     | -0.00004  | 0.04098   | 0.607           | 3.432           |


---

### 6. Diabetes-130-Hospitals (Fairlearn)
- **Samples:** 130,000 (subset used: 20,354 per batch)  
- **Features:** Multiple clinical and demographic features per patient  
- **Target:** Continuous outcome (e.g., glucose level, readmission risk, or treatment response)  
- **Dataset characteristics:**  
  - Medium-scale regression dataset in healthcare.  
  - Fairness-focused dataset (Fairlearn), potentially including sensitive attributes.  
  - Features may be heterogeneous (numerical + categorical) with complex interactions.  

---

## Benchmark Results

| Model         | Train Time (s) | Batch Inference (s) | Batch Samples | Batch Throughput (samples/s) | R²        | MSE           | Single Mean (ms) | Single P95 (ms) |
|---------------|----------------:|------------------:|--------------:|-----------------------------:|-----------|---------------|----------------:|----------------:|
| XGBoost       | 0.170           | 0.007             | 20,354        | 2,778,491                     | 1.0000    | 1.22e-11      | 0.438           | 0.520           |
| SmartKNN      | 5.763           | 0.310             | 20,354        | 65,627                        | 1.0000    | 0.0000        | 0.171           | 0.204           |
| Ridge         | 0.035           | 0.003             | 20,354        | 6,745,938                     | 1.0000    | 2.93e-11      | 0.329           | 0.401           |
| Linear        | 0.040           | 0.003             | 20,354        | 7,129,392                     | 1.0000    | 3.92e-14      | 0.316           | 0.355           |
| LightGBM      | 0.505           | 0.049             | 20,354        | 418,504                        | 1.0000    | 7.03e-11      | 0.843           | 0.910           |
| CatBoost      | 0.677           | 0.005             | 20,354        | 4,153,346                     | 0.999993  | 6.55e-07      | 0.964           | 1.106           |
| Lasso         | 0.035           | 0.006             | 20,354        | 3,346,010                     | -0.000007 | 0.09966       | 0.727           | 1.068           |
| ElasticNet    | 0.026           | 0.003             | 20,354        | 1,636,454                     | -0.000007 | 0.09966       | 0.550           | 0.804           |

---

### 7. COVERTYPE
- **Samples:** 567,000 (subset used: 113,321 per batch)  
- **Features:** 11 features including elevation, slope, soil type, and hydrological metrics  
- **Target:** Continuous label representing forest cover type  
- **Dataset characteristics:**  
  - Large-scale regression dataset from UCI Covertype data.  
  - Features are a mix of numerical and categorical (encoded as binaries).  
  - Commonly used for predicting land cover and forestry classification regression problems.

---

## Benchmark Results

| Model         | Train Time (s) | Batch Inference (s) | Batch Samples | Batch Throughput (samples/s) | R²        | MSE       | Single Mean (ms) | Single P95 (ms) |
|---------------|----------------:|------------------:|--------------:|-----------------------------:|-----------|-----------|----------------:|----------------:|
| SmartKNN      | 20.413          | 2.802             | 113,321       | 40,447                        | 0.8272    | 0.043203  | 0.264           | 0.321           |
| XGBoost       | 1.851           | 0.175             | 113,321       | 648,308                       | 0.5808    | 0.104801  | 0.472           | 0.514           |
| CatBoost      | 3.447           | 0.013             | 113,321       | 8,974,239                     | 0.5098    | 0.122548  | 0.950           | 1.052           |
| LightGBM      | 1.571           | 0.227             | 113,321       | 498,750                        | 0.4799    | 0.130029  | 0.862           | 0.919           |
| Ridge         | 0.081           | 0.008             | 113,321       | 14,553,170                     | 0.0769    | 0.230768  | 0.317           | 0.374           |
| Linear        | 0.111           | 0.009             | 113,321       | 12,867,660                     | 0.0767    | 0.230836  | 0.313           | 0.394           |
| Lasso         | 0.076           | 0.009             | 113,321       | 12,821,830                     | -0.000000 | 0.250000  | 0.367           | 0.442           |
| ElasticNet    | 0.072           | 0.008             | 113,321       | 13,337,130                     | -0.000000 | 0.250000  | 0.465           | 0.577           |

---

### 8. SGEMM_GPU_kernel_performance
- **Samples:** 242,000 (subset used: 48,320 per batch)  
- **Features:** 15 GPU kernel performance metrics including matrix sizes, block dimensions, and computational throughput  
- **Target:** Continuous label representing kernel execution time (or performance metric)  
- **Dataset characteristics:**  
  - High-dimensional regression dataset for GPU kernel performance prediction.  
  - Features are primarily numerical and represent low-level hardware and kernel parameters.  
  - Useful for evaluating models in **hardware-aware performance prediction** tasks.

---

## Benchmark Results

| Model         | Train Time (s) | Batch Inference (s) | Batch Samples | Batch Throughput (samples/s) | R²        | MSE        | Single Mean (ms) | Single P95 (ms) |
|---------------|----------------:|------------------:|--------------:|-----------------------------:|-----------|------------|----------------:|----------------:|
| LightGBM      | 1.035           | 0.104             | 48,320        | 466,325                        | 0.9904    | 1,285.37   | 1.273           | 3.218           |
| XGBoost       | 1.029           | 0.076             | 48,320        | 638,878                        | 0.9847    | 2,057.10   | 0.496           | 0.565           |
| SmartKNN      | 13.823          | 0.840             | 48,320        | 57,494                         | 0.9835    | 2,212.46   | 0.194           | 0.236           |
| CatBoost      | 1.641           | 0.007             | 48,320        | 7,079,067                      | 0.9765    | 3,159.37   | 1.011           | 1.205           |
| Ridge         | 0.045           | 0.005             | 48,320        | 9,675,293                      | 0.4025    | 80,236.66  | 0.317           | 0.350           |
| Linear        | 0.068           | 0.017             | 48,320        | 2,770,231                      | 0.4025    | 80,236.67  | 0.535           | 3.343           |
| Lasso         | 0.069           | 0.005             | 48,320        | 10,513,860                     | 0.4024    | 80,248.38  | 0.371           | 0.458           |
| ElasticNet    | 0.054           | 0.005             | 48,320        | 9,482,767                      | 0.3399    | 88,649.51  | 0.354           | 0.409           |

---

### 9. DutchTwitterDataset
- **Samples:** 451,000 (batch subset: 90,240)  
- **Features:** 20 linguistic, user, and tweet metadata features  
- **Target:** Continuous sentiment or engagement score  
- **Dataset characteristics:**  
  - Real-world social media dataset.  
  - Mix of numerical and categorical features (encoded).  
  - Evaluates models on **text-derived numerical regression** tasks.  

**Why this dataset matters:**  
It tests **model scalability and latency** on social media-sized datasets, where batch inference speed and single-sample latency are important.

---

## Benchmark Results

| Model         | Train Time (s) | Batch Inference (s) | Batch Samples | Batch Throughput (samples/s) | R²        | MSE       | Single Mean (ms) | Single P95 (ms) |
|---------------|----------------:|------------------:|--------------:|-----------------------------:|-----------|-----------|----------------:|----------------:|
| SmartKNN      | 81.724          | 2.593             | 90,240        | 34,805                         | 0.9492    | 0.001984  | 0.267           | 0.309           |
| XGBoost       | 1.527           | 0.138             | 90,240        | 652,627                        | 0.8841    | 0.004526  | 0.498           | 0.614           |
| LightGBM      | 1.458           | 0.155             | 90,240        | 580,956                        | 0.8662    | 0.005223  | 0.892           | 0.958           |
| CatBoost      | 3.292           | 0.019             | 90,240        | 4,634,122                      | 0.8628    | 0.005356  | 0.865           | 0.955           |
| Ridge         | 0.207           | 0.020             | 90,240        | 4,583,470                      | 0.0758    | 0.036085  | 0.324           | 0.374           |
| Linear        | 0.349           | 0.042             | 90,240        | 2,152,844                      | 0.0758    | 0.036087  | 0.393           | 0.370           |
| Lasso         | 0.238           | 0.021             | 90,240        | 4,321,524                      | ~0        | 0.039046  | 0.348           | 0.376           |
| ElasticNet    | 0.220           | 0.021             | 90,240        | 4,347,271                      | ~0        | 0.039046  | 0.344           | 0.386           |

---

### 10. Autos
- **Samples:** 1,000,000 (batch subset: 200,000)  
- **Features:** 28 features including vehicle specs, engine performance, and sales metadata  
- **Target:** Continuous variable (e.g., car price or fuel efficiency)  
- **Dataset characteristics:**  
  - Large-scale tabular dataset.  
  - Mix of numerical and categorical features (mostly encoded).  
  - Evaluates both **model scalability** and **single-sample latency** for high-volume industrial datasets.  



## Benchmark Results

| Model         | Train Time (s) | Batch Inference (s) | Batch Samples | Batch Throughput (samples/s) | R²       | MSE      | Single Mean (ms) | Single P95 (ms) |
|---------------|----------------:|------------------:|--------------:|-----------------------------:|----------|----------|----------------:|----------------:|
| XGBoost       | 8.967           | 0.322             | 200,000       | 621,688                        | 0.6532   | 0.5543   | 0.503           | 0.622           |
| CatBoost      | 9.067           | 0.076             | 200,000       | 2,626,389                      | 0.6413   | 0.5733   | 0.929           | 1.085           |
| LightGBM      | 7.726           | 0.544             | 200,000       | 367,857                        | 0.6162   | 0.6135   | 1.399           | 3.674           |
| SmartKNN      | 548.474         | 12.648            | 200,000       | 15,813                         | 0.4902   | 0.8149   | 0.509           | 0.597           |
| Ridge         | 5.372           | 0.089             | 200,000       | 2,244,214                      | 0.4181   | 0.9301   | 0.320           | 0.366           |
| Linear        | 2.270           | 0.099             | 200,000       | 2,027,420                      | 0.4181   | 0.9301   | 0.306           | 0.343           |
| ElasticNet    | 1.587           | 0.096             | 200,000       | 2,072,844                      | 0.1126   | 1.4183   | 0.376           | 0.479           |
| Lasso         | 1.399           | 0.092             | 200,000       | 2,183,667                      | ~0       | 1.5983   | 0.398           | 0.633           |

---

## Evaluation Note

These benchmarks are intended to evaluate **model behavior under identical, untuned conditions**, reflecting **practical deployment scenarios** rather than optimized leaderboard results.
