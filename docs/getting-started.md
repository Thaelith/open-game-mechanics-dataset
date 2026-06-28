# Getting Started

The fastest way to use the dataset is to open `dataset.json` for summaries or a mechanic file under `data/` for full detail.

## Install Tooling

```bash
pip install -r requirements.txt
```

## Validate

```bash
python tools/validate_dataset.py
```

## Regenerate the Index

```bash
python tools/generate_index.py
```

## Read One Mechanic

Open a file such as `data/movement/dash.json`. Use `related_mechanics` and `combines_well_with` to discover adjacent mechanics.
