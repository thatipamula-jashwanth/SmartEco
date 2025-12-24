# Limitations

SmartKNN is designed to be practical, interpretable, and production-safe.  
It includes built-in safeguards for scaling, clipping, and numerical stability.

However, like any machine learning system, it has **explicit limitations** that should be understood before use.

These limitations are documented to help users make informed decisions and avoid inappropriate deployments.

---

## Not Optimized for Extremely High-Dimensional Dense Data

SmartKNN includes feature weighting, pruning, and learned distance scaling.  
However, nearest-neighbor methods can still degrade in **very high-dimensional dense spaces**.

Potential challenges include:
- Distance concentration effects
- Increased memory footprint
- Reduced neighborhood discrimination

SmartKNN mitigates these effects, but for extremely high-dimensional dense representations, alternative modeling approaches may be more suitable.

---

## Memory Usage at Scale

Nearest-neighbor methods inherently require storing training data in memory.

SmartKNN includes:
- Memory usage estimation
- Fail-fast checks to prevent OOM conditions
- Support for approximate backends

Even with these safeguards, very large datasets may still require substantial RAM, particularly when exact (brute-force) execution is used.

Memory requirements should be evaluated as part of deployment planning.

---

## Approximate Backend Trade-offs

When using approximate nearest-neighbor (ANN) backends, SmartKNN introduces controlled approximation.

This may result in:
- Slight changes in neighbor ordering
- Small accuracy trade-offs
- Sensitivity to backend parameters

ANN backends are designed to balance speed and accuracy.  
They improve scalability but do not guarantee exact neighbor retrieval.

---

## Not a Universal Model Replacement

SmartKNN is not intended to replace all machine learning models.

In particular:
- Problems requiring strong global generalization may favor other approaches
- Highly non-linear decision boundaries may be better handled by tree-based or neural models
- Very small datasets may not benefit significantly from nearest-neighbor methods

Model selection should always reflect problem structure and constraints.

---

## Configuration-Time Cost on Large Datasets

SmartKNN performs all learning and analysis during a configuration phase.

On very large datasets, steps such as:
- Feature weight estimation
- Backend preparation
- Optional pruning

may incur noticeable upfront cost.

SmartKNN mitigates this through subsampling, bounded computation, and safe fallbacks, but preparation time should still be considered in large-scale workflows.

---

## No Online or Continual Learning

SmartKNN does not support:
- Online learning
- Incremental updates during inference
- Continuous adaptation to streaming data

All configuration is completed before inference begins.  
For continuously evolving data streams, alternative approaches may be more appropriate.

---

## Hardware and Deployment Constraints

SmartKNN is optimized for CPU execution and includes internal handling for:
- Feature scaling
- Clipping
- Numerical sanitization

Performance still depends on:
- Available memory
- CPU cache behavior
- Core count and threading configuration

Extremely constrained environments may require careful tuning or simplified configurations.

---

## Summary

SmartKNN handles many low-level concerns internally, including scaling and numerical safety.

Its limitations arise primarily from:
- The fundamental properties of nearest-neighbor methods
- Memory requirements at scale
- Trade-offs introduced by approximation
- Explicit design choices favoring determinism and safety

Understanding these constraints ensures appropriate usage and reliable deployment.
