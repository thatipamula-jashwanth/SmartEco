# Architecture

SmartKNN is designed as a **system-level implementation of nearest-neighbor learning**, with explicit separation between configuration-time logic and runtime execution.

This page describes **how SmartKNN is structured as a system**—defining component boundaries, execution phases, and responsibilities—rather than the step-by-step algorithmic flow.

---

## Architectural Perspective

SmartKNN is organized around two strictly separated phases:

- **Configuration Phase (Preparation Time)**
- **Execution Phase (Inference Time)**

All learning, analysis, and decision-making about *how* predictions should behave occurs during configuration.  
Inference is fully deterministic and does not adapt or mutate system state.

---

## Core Architectural Layers

SmartKNN is composed of several architectural layers, each with a clearly defined role.

### Configuration Layer

The configuration layer is responsible for analyzing the dataset and preparing the inference system.

It owns:
- Feature importance estimation
- Optional feature pruning decisions
- Distance configuration
- Backend selection and initialization

This layer executes **once per model setup** and produces an immutable configuration used during inference.

---

### Distance and Similarity Layer

This layer defines how similarity between samples is computed.

It owns:
- Feature weighting
- Distance scaling and normalization
- Consistent distance behavior across backends

This layer does **not** perform neighbor retrieval or prediction logic.  
Its sole responsibility is defining **how distance is measured**.

---

### Neighbor Retrieval Layer

The neighbor retrieval layer is responsible for efficiently identifying candidate neighbors.

It owns:
- Backend-specific retrieval logic
- Indexing or data organization strategies
- Performance characteristics related to scale

This layer is interchangeable and does not influence prediction semantics—only how candidates are retrieved.

---

### Prediction and Reporting Layer

This layer is responsible for producing final outputs.

It owns:
- Aggregation of neighbor information
- Prediction computation
- Optional interpretability and reporting outputs

It does **not** perform learning, backend selection, or distance configuration.

---

## Execution-Time Guarantees

SmartKNN enforces several architectural guarantees at inference time:

- No parameter updates or learning
- No backend switching
- No configuration mutation
- Deterministic execution given identical inputs

These guarantees ensure predictable latency, reproducibility, and debuggability in production environments.

---

## Separation of Concerns

A key architectural principle in SmartKNN is strict separation of responsibilities:

- Configuration logic never executes during inference
- Distance logic is isolated from retrieval logic
- Backend strategy does not affect prediction semantics
- Prediction logic does not influence distance or retrieval behavior

This separation enables safe optimization and extension of individual components without cascading side effects.

---

## Architectural Implications

The SmartKNN architecture enables:

- Predictable and bounded inference latency
- Clear reasoning about system behavior
- Independent optimization of subsystems
- Safe extension and experimentation
- Strong alignment with production constraints

By structuring nearest-neighbor learning as a system rather than a monolithic algorithm, SmartKNN provides engineers with explicit control over performance, behavior, and trade-offs.
