# Game Anchor Policy v0.3

This policy defines how `example_games` titles and notes should be written during v0.3 review work. It applies to the lightweight mechanic-level `example_games` field and the derived Games browser view.

The current system is a study/discovery aid, not a complete game database, source citation layer, or proof of exact implementation details.

## Exact Title Strings

Use exact, specific game titles whenever possible. The browser currently groups games by normalized title string only, so inconsistent titles split what readers see in the Games view.

Prefer:

- `The Witcher 3: Wild Hunt`
- `Metal Gear Solid V: The Phantom Pain`
- `Grand Theft Auto IV`
- `Grand Theft Auto V`

Avoid informal abbreviations or shortened titles when they refer to the same specific game:

- `The Witcher 3` when the intended title is `The Witcher 3: Wild Hunt`
- `Metal Gear Solid V` when the intended title is `Metal Gear Solid V: The Phantom Pain`
- `GTA IV`, `GTA V`, `BOTW`, or `MGS V`

## Subtitle Usage

Use the subtitle when it disambiguates a specific game title or is the common official title.

Good:

- `The Witcher 3: Wild Hunt`
- `Resident Evil 7: Biohazard`
- `Metal Gear Solid V: The Phantom Pain`

Do not split examples between a shorter title and a subtitle title unless the shorter title intentionally refers to a distinct release.

## Numbered Sequels

Keep numbered sequels separate because mechanics, camera, UI, pacing, and systems can differ materially.

Examples that should remain separate:

- `Portal` and `Portal 2`
- `Grand Theft Auto IV` and `Grand Theft Auto V`
- `Resident Evil 2`, `Resident Evil 4`, and `Resident Evil 7: Biohazard`
- `Super Mario Bros.`, `Super Mario World`, and `Super Mario Odyssey`

## Remakes, Remasters, And Deluxe Editions

Keep remakes, remasters, and deluxe editions separate when mechanics, camera, content, interface, platform assumptions, multiplayer, or balance differ materially.

Be careful with titles such as:

- `Mario Kart 8` vs `Mario Kart 8 Deluxe`
- `Resident Evil 4` vs a remake-specific title

If the example note is true of both versions but the current title names one specific version, leave it specific. Do not merge editions in code during v0.3.

## Franchise-Level Names

Avoid broad franchise-level names unless the note is intentionally about a named title that is commonly represented by that exact title.

Be careful:

- `Diablo` vs `Diablo III`
- `The Legend of Zelda` vs specific Zelda games
- `Final Fantasy` vs specific numbered entries
- `Monster Hunter` vs `Monster Hunter: World`

If a mechanic is visible across many entries in a franchise, prefer a specific representative game over a franchise-level title unless the mechanic entry is intentionally broad and the note clearly says so.

## Expansions, DLC, And Live-Service Seasons

Avoid version-specific claims unless the title or note states the version context clearly. This matters for MMOs and live-service games where abilities, UI, maps, balance, and progression systems change over time.

Examples:

- `World of Warcraft` examples should use broad, durable visible behavior and avoid expansion-specific claims unless an expansion title is named.
- Live-service examples should avoid seasonal details unless the season/event is part of the title or note.

## Abbreviations

Do not use abbreviations as canonical example titles.

Avoid:

- `GTA IV`
- `GTA V`
- `BOTW`
- `MGS V`
- `RE4`

Use the full title instead.

## Series Vs Specific Title Examples

Use the most specific title that accurately supports the mechanic note.

Good:

- `The Witcher 3: Wild Hunt` for Geralt's repair, quest, combat, and RPG systems.
- `Metal Gear Solid V: The Phantom Pain` for prone movement and enemy search behavior.
- `Portal 2` for co-op puzzle state and partner coordination.

Be careful:

- `Diablo` may refer to a series or the original game. Use `Diablo III` when the note is based on that specific game.
- `The Legend of Zelda` may be too broad when a specific Zelda title would be clearer.

## When To Keep Separate Anchors

Keep separate anchors when:

- the titles are different numbered games
- the edition/remake/remaster changes mechanics, UI, content, camera, or platform assumptions
- the note depends on a specific mode, campaign, platform, or release
- merging would hide a useful study distinction

## When To Rewrite A Title

Rewrite an example title to a canonical title when:

- the shorter title clearly refers to the same specific game already used elsewhere
- the subtitle is the common title and avoids ambiguity
- the existing title is an abbreviation
- the existing title would split one game anchor without adding useful distinction

Do not rewrite if the title may intentionally refer to a series, earlier game, edition, remake, expansion, or separate release. Document uncertain cases instead.

## When To Avoid Adding A Game Example

Do not add a game example when:

- the title would be ambiguous
- the example depends on a version, expansion, event, or mod that is not named
- the mechanic boundary does not cleanly fit the visible behavior
- the note would only say that the game is in the same genre
- the example would inflate an already saturated anchor without adding a useful study angle

## Example Note Style

Notes should describe visible player-facing behavior. They should not claim exact implementation details, proprietary internals, engine systems, or source evidence.

Good:

- "Uses tracked quest markers and minimap routing for objectives."
- "Uses prone movement for stealth approach and concealment."
- "Uses online party and raid group play for dungeons, quests, and shared objectives."
- "Uses breakable pots and other fragile props as part of run exploration."

Avoid:

- "Implements the same internal system as..."
- "Probably uses..."
- "Uses the engine's proprietary..."
- "Has this mechanic."
- "Uses advanced AI."

## Alias Handling

Do not add alias merging to the static browser or report tooling during v0.3.

If alias handling becomes necessary, propose a separate curated `games/` or `game_tags/` layer rather than adding ad hoc fields to mechanic JSON. That future layer could own canonical title, aliases, release year, edition/remake relationships, platform/version notes, and review metadata.
