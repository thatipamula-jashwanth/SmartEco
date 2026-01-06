# Models Supported in SmartML

SmartML supports a fixed set of **classification** and **regression** models covering:

- Classical machine learning baselines  
- Tree-based ensemble methods  
- Deep learning models for tabular data  
- Specialized neighborhood-based models  

All models are instantiated with **fixed defaults** to ensure fair and reproducible benchmarking.

Model availability depends on installed optional dependencies.  
Unavailable models are automatically excluded at runtime.

---

## Classification Models

### Baseline Models

These models provide strong and interpretable baselines for tabular classification.

- **Logistic Regression**
  - Linear classifier with probabilistic outputs
  - Default solver and regularization from scikit-learn
  - No hyperparameter tuning
  - Used as the minimal baseline

- **Support Vector Classifier (SVC)**
  - Margin-based classifier
  - Default kernel and parameters from scikit-learn
  - Feature scaling applied internally
  - No kernel or C-value search

- **K-Nearest Neighbors (KNN)**
  - Distance-based classifier
  - Default number of neighbors
  - Feature scaling applied
  - Sensitive to feature space geometry

- **Naive Bayes**
  - Probabilistic classifier
  - Uses standard distribution assumptions
  - No smoothing or prior tuning

---

### Tree-Based Ensemble Models

Tree ensembles are widely used for tabular data due to robustness and performance.

- **Random Forest**
  - 100 trees
  - Parallel execution enabled
  - Fixed random seed (42)
  - No depth or feature tuning

- **Extra Trees**
  - 100 trees
  - High randomization in split selection
  - Parallel execution enabled
  - Fixed random seed (42)

- **LightGBM**
  - 100 boosting iterations
  - CPU execution
  - Parallel training enabled
  - Logging disabled
  - Fixed random seed (42)

- **XGBoost**
  - 100 boosting iterations
  - Histogram-based tree method
  - CPU execution
  - Parallel training enabled
  - Logging disabled
  - Fixed random seed (42)

- **CatBoost**
  - 100 boosting iterations
  - Native categorical handling
  - Silent training mode
  - Fixed random seed (42)

---

### Deep Learning Models (Tabular)

Deep models are included **for comparison**, not tuning or production usage.  
All deep models use conservative, deterministic defaults.

Common characteristics:
- CPU execution
- Fixed number of training epochs
- Deterministic training enabled
- No logging or progress bars

Models included:

- **MLP**
  - Fully connected neural network
  - Two hidden layers (256 → 128)
  - Dropout enabled
  - Fixed epoch count

- **FT-Transformer**
  - Transformer-based architecture for tabular data
  - Fixed number of attention heads
  - Fixed hidden dimension
  - No architecture search

- **TabTransformer**
  - Transformer with categorical embeddings
  - Default embedding and attention configuration
  - Deterministic execution

- **SAINT**
  - Self-attention based tabular model
  - Default attention configuration
  - Fixed training setup

- **TabNet**
  - Sparse attention with feature selection
  - Fixed number of decision steps
  - Deterministic seed

- **NODE**
  - Neural Oblivious Decision Ensembles
  - Library defaults
  - No depth or ensemble tuning

- **NAM**
  - Neural Additive Model
  - Explainability-focused architecture
  - Default configuration only

- **GrowNet**
  - Boosting-inspired neural architecture
  - Library defaults
  - CPU execution

- **Modern NCA**
  - Neural neighborhood-based classifier
  - Default neighborhood configuration
  - Deterministic execution

---

### Specialized Models

- **SmartKNN (Classification)**
  - Optimized neighborhood-based classifier
  - Custom distance and candidate selection logic
  - Designed for fast inference and scalability
  - Used as a strong non-parametric baseline

---

## Regression Models

### Baseline Models

All baseline regression models apply **standard feature scaling** internally.

- **Linear Regression**
  - Ordinary least squares
  - No regularization
  - Scaled inputs

- **Ridge Regression**
  - L2 regularization
  - Default regularization strength
  - Scaled inputs

- **Lasso Regression**
  - L1 regularization
  - Default sparsity strength
  - Scaled inputs

- **ElasticNet**
  - Combination of L1 and L2 regularization
  - Default mixing ratio
  - Scaled inputs

- **Support Vector Regressor (SVR)**
  - Default kernel and parameters
  - Scaled inputs
  - No kernel tuning

- **K-Nearest Neighbors Regressor**
  - Fixed number of neighbors
  - Distance-based prediction
  - Scaled inputs

---

### Tree-Based Ensemble Models

- **Random Forest Regressor**
  - 100 trees
  - Parallel execution enabled
  - Fixed random seed (42)

- **Extra Trees Regressor**
  - 100 trees
  - Highly randomized splits
  - Parallel execution enabled
  - Fixed random seed (42)

- **LightGBM Regressor**
  - 100 boosting iterations
  - CPU execution
  - Logging disabled
  - Fixed random seed (42)

- **XGBoost Regressor**
  - 100 boosting iterations
  - Histogram-based training
  - CPU execution
  - Fixed random seed (42)

- **CatBoost Regressor**
  - 100 boosting iterations
  - Native categorical support
  - Silent mode
  - Fixed random seed (42)

---

### Deep Learning Models (Tabular)

Deep regression models follow the same execution constraints as classification:

- CPU-only execution
- Deterministic behavior
- Fixed training configuration
- No hyperparameter search

Models included:

- **MLP Regressor**
- **FT-Transformer Regressor**
- **TabTransformer Regressor**
- **SAINT Regressor**
- **TabNet Regressor**
- **NODE Regressor**
- **NAM Regressor**
- **DeepGBM Regressor**
- **GrowNet Regressor**

All use library defaults with fixed training limits.

---

### Specialized Models

- **SmartKNN (Regression)**
  - Optimized neighborhood-based regressor
  - Fast inference-oriented design
  - Deterministic execution

---

## Model Registry Behavior

SmartML maintains separate registries for classification and regression.

- Models are selected based on task type
- Missing dependencies automatically disable affected models
- Only available models are listed and executed
- Model keys are normalized internally

---

## Design Rationale

Model inclusion follows these principles:

- Coverage of common tabular modeling approaches
- Strong baselines over tuned variants
- Fixed defaults for fairness
- Deterministic and reproducible behavior

Hyperparameter tuning is intentionally excluded.
