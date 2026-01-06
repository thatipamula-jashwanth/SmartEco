# SmartEco

SmartEco is an open-source repository for building and evaluating **CPU-first, interpretable machine learning systems**.

The project focuses on **practical system design** for machine learning — prioritizing latency, predictability, and transparency over benchmark-only accuracy.

---

## SmartEco Models/Tools

### SmartKNN
A production-oriented nearest-neighbor engine designed for:
- Fast CPU inference
- Predictable latency
- Transparent decision logic

SmartKNN extends classical KNN with learned feature weighting, adaptive distance computation, and backend strategies optimized for real-world constraints.

---

### SmartML
A benchmarking and inspection toolkit for:
- Comparing ML and DL models under identical conditions
- Measuring accuracy, latency, and tail behavior
- Selecting model families before production work

SmartML is **not AutoML** and **not a production pipeline**.  
It exists to provide trustworthy baseline numbers and transparent evaluation.
