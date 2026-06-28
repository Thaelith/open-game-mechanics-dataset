# Query Examples

## Python: Mechanics for a Genre

```python
import json

with open("dataset.json", encoding="utf-8") as handle:
    index = json.load(handle)

print(index["groups"]["genre"]["platformer"])
```

## Python: Load Full Mechanic Files

```python
import json
from pathlib import Path

with open("dataset.json", encoding="utf-8") as handle:
    index = json.load(handle)

by_id = {item["id"]: item for item in index["mechanics"]}
path = Path(by_id["movement.dash"]["path"])
mechanic = json.loads(path.read_text(encoding="utf-8"))
print(mechanic["parameters"])
```

## jq: Mechanics by Tag

```bash
jq -r '.groups.tags.mobility[]' dataset.json
```
