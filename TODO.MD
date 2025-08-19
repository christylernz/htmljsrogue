

---

# Development Plan

This document outlines an example of the core features and development
tasks presented with user story formatting for clarity and checkboxes
for tracking progress.


[ ] Task 1 - Tidy up the list and update the tasks where needed
---

## **Phase 1: Core Loop & Basic Persistence**

The goal of this phase is to establish the fundamental roguelike exploration, resource gathering, and the 'game reset' loop with a basic persistence of objects across resets.

### **Features to Develop:**

*   ### **Basic World Generation & Player Movement**
    *   **User Story:** I want to move around an ASCII map so I can explore and interact with it.
    *   **Sub-features:**
        *   [x] **ASCII Rendering:** Render basic tiles (`.` floor, `#` wall, `@` player).
        *   [x] **Player Movement:** Implement Arrow key movement, one tile per turn.
        *   [x] **Basic Map Loading:** Implement simple map loading from a file  for a fixed size.
        *   [ ] **Object Loading** Improve the simple map loading to allow create objects

*   ### **Resource Gathering & Display**
    *   **User Story:** I want to collect basic resources from the world so I can accumulate them for later use.
    *   **Sub-features:**
        *   [ ] **Resource Tile Generation:** Place common resources (`#` Wood Block, `$` Sparkle Dust, `^` Gear Bits) on the map.
        *   [ ] **Object Interaction:** Implement `E` key to collect resources when on a resource tile, removing the resource from the map.
        *   [ ] **Resource Display:** Show current collected resources (e.g., `Wood: X, Dust: Y, Gears: Z`) in a UI panel.

*   ### **Game Reset**
    *   **User Story:** I want the world to reset after a set number of turns so I can understand the cyclical nature of the game.
    *   **Sub-features:**
        *   [ ] **Turn Counter:** Display `Turns Remaining: XXX` and decrement it with each player action.
        *   [ ] **Reset Trigger:** When `Turns Remaining` reaches 0, trigger the "Grand Reset" event.
        *   [ ] **Reset Logic:** Clear current inventory (except persistent elements, to be added later), regenerate map, reset turn counter.
        *   [ ] **Basic Map Generation:** Implement a simple procedural map generation (e.g., drunken walk or simple room/corridor) for a fixed size.

*   ### **Basic Persistence**
    *   **User Story:** I want to find a unique Echo that persists across resets so I can feel a sense of permanent progress.
    *   **Sub-features:**
        *   [ ] **Single Echo Definition:** Define a single Echo (e.g., The Omnicube `Ω`) with a unique name and basic (initially null) effect.
        *   [ ] **Object Placement:** Place one `Ω` randomly on the map during generation.
        *   [ ] **ObjectbCollection:** Interacting with `Ω` adds it to a "Collected Echoes (Current Cycle)" list.
        *   [ ] **Permanent Echo Collection:** At Grand Reset, move `Ω` from "Collected Echoes (Current Cycle)" to "Permanent Echo Collection" list.
        *   [ ] **Re-spawn:** If `Ω` is in "Permanent Echo Collection," ensure it spawns randomly on the *next* map.
---

## **Phase 2: Automation, Upgrades & Offline Progression**

This phase introduces the core idle mechanics, permanent upgrades, and the strategic layer of Echo development.

### **Features to Develop:**

*   ### **Pocket Workshop & Core Synthesizers**
    *   **User Story:** I want a permanent base to generate resources even when I'm offline, so I always make progress.
    *   **Sub-features:**
        *   [ ] **Pocket Workshop UI:** Implement a separate UI screen for the Pocket Workshop (accessed via hotkey from main game).
        *   [ ] **Core Synthesizer Definitions:** Define Wood Synthesizer (`W`), Dust Reactor (`D`), Gear Forge (`G`).
        *   [ ] **Initial Synthesizer Construction:** Allow initial construction of Tier 1 Synthesizers using common resources.
        *   [ ] **Passive Resource Generation:** Synthesizers generate resources at a fixed rate per second.
        *   [ ] **Offline Generation Logic:** Implement logic for Synthesizers to accumulate resources while the game is closed.
        *   [ ] **Synthesizer Upgrades:** Allow upgrading Synthesizer tiers (costs common resources), increasing their production rate.

*   ### **Schematics & Deployed Automata**
    *   **User Story:** I want to deploy automated toy machines to gather resources in the world so I can free up my own turns for exploration.
    *   **Sub-features:**
        *   [ ] **Schematic Discovery (`?`):** Implement `?` tiles on the map. Interacting with them grants an "Unidentified Schematic."
        *   [ ] **Schematic Deciphering:** In Pocket Workshop, allow "deciphering" Schematics (costs resources, consumes turns). Deciphered Schematics enable building Automata.
        *   [ ] **Automata Definitions:** Define Gear Automaton (`g`), Robo-Woodcutter (`r`), Dust Sweeper (`d`) with movement AI and gathering logic.
        *   [ ] **Automata Deployment:** Allow building and deploying Automata from Pocket Workshop into the current Toy World cycle (they appear on map and start moving).
        *   [ ] **Automata Logic:** Automata move towards and collect their specific resource type. Resources collected by Automata go to global storage.
        *   [ ] **Automata Reset:** Deployed Automata disappear on Grand Reset.
    
*   ### ** Upgrade & Knowledge Persistence**
    *   **User Story:**  I want to upgrade my collected Echoes and for those upgrades to be permanently known across cycles so my Echoes become increasingly powerful.
    *   **Sub-features:**
        *   [ ] **Echo Upgrade Paths:** Define 2-3 upgrade tiers/paths for the initial `Ω` Echo (costs common resources).
        *   [ ] **Echo Upgrade UI:** In Pocket Workshop, when an Echo is in "Collected Echoes (Current Cycle)," show its upgrade options.
        *   [ ] **Apply Echo Upgrade:** Allow spending resources to apply an upgrade to a collected Echo.
        *   [ ] **Permanent Upgrade Knowledge:** When an Echo upgrade is applied, mark that specific upgrade path/tier as "Learned" for that Echo globally.
        *   [ ] **Automatic Learned Upgrades:** On subsequent cycles, when `Ω` is re-collected, automatically apply any "Learned" upgrades for free.
        *   [ ] **Echo Effects:** Implement initial effect for `Ω` (e.g., `+X%` Global Resource Gain for current cycle), applying its base and learned upgrade values.

---

## **Phase 3: Lore, More Echoes & Game Polish**

This phase expands the content, introduces the narrative, and polishes the user experience.

### **Features to Develop:**

*   ### **Lore Fragments & Chronicle Log**
    *   **User Story:** As a Passerby, I want to discover fragments of the world's story that persist across resets so I can uncover the mystery.
    *   **Sub-features:**
        *   [ ] **F3.1: Lore Fragment Placement (`L`):** Place `L` tiles randomly on the map.
        *   [ ] **F3.2: Lore Interaction:** Interacting with `L` adds a text entry to a permanent "Chronicle Log."
        *   [ ] **F3.3: Chronicle Log UI:** Implement a UI to view all discovered lore entries.
    *   **Tests:**
        *   [ ] **T3.1.1:** `L` tiles appear on the map.
        *   [ ] **T3.1.2:** Interacting with `L` adds a lore entry to the log.
        *   [ ] **T3.1.3:** Lore entries persist in the log across Grand Resets.

*   ### **Multiple Echoes & Rarity**
    *   **User Story:** As a Passerby, I want to find a variety of unique Echoes with different effects, making each cycle's hunt exciting.
    *   **Sub-features:**
        *   [ ] **F3.4: Define 3-5 New Echoes:** Create definitions for several new Echoes (e.g., `β` Boltzman's Battery, `∞` Infini-Spool) with unique symbols, effects, and upgrade paths.
        *   [ ] **F3.5: Echo Rarity:** Assign rarity tiers (e.g., Common, Uncommon, Rare) to Echoes, influencing their spawn chance.
        *   [ ] **F3.6: Random Echo Spawns:** During map generation, randomly select and place a set number of Echoes based on their rarity and player's permanent collection.
    *   **Tests:**
        *   [ ] **T3.2.1:** New Echo symbols appear on the map.
        *   [ ] **T3.2.2:** Each Echo collected applies its specific effect.
        *   [ ] **T3.2.3:** Rarity influences how frequently Echoes are encountered.
        *   [ ] **T3.2.4:** New Echoes can be added to the permanent collection and will then reappear in subsequent cycles.

*   ### **Basic UI & Feedback**
    *   **User Story:** As a Passerby, I want clear visual feedback on my actions and game state so I can understand what's happening.
    *   **Sub-features:**
        *   [ ] **F3.7: Turn Counter Visibility:** Prominent display of `Turns Remaining`.
        *   [ ] **F3.8: Resource Change Notifications:** Small pop-up or scroll messages for resource gains/losses.
        *   [ ] **F3.9: Echo Collection Notifications:** Clear message when an Echo is collected.
        *   [ ] **F3.10: Basic Sound Effects:** Simple sounds for movement, interaction, resource collection, Grand Reset.
    *   **Tests:**
        *   [ ] **T3.3.1:** All UI elements are visible and update correctly.
        *   [ ] **T3.3.2:** Notifications appear for key actions.
        *   [ ] **T3.3.3:** Sound effects play as expected.

---

## **Phase 4: Advanced Gameplay & End Game**

Introducing deeper mechanics, greater strategy, and a sense of progression towards a significant long-term goal.

### **Features to Develop:**

*   ### **Automata Targeting & Efficiency**
    *   **User Story:** As a Passerby, I want to optimize my automated gatherers' behavior so they are more efficient.
    *   **Sub-features:**
        *   [ ] **F4.1: Automata Range/Pathing Upgrades:** Implement upgrades for Automata (via Schematics or Echoes) to increase their collection range or improve their pathfinding.
        *   [ ] **F4.2: Automata Deployment Strategy:** Allow placing Automata on any cleared tile.
        *   [ ] **F4.3: Limited Offline Automata Operation:** Implement a "sleep timer" for deployed Automata for offline production (e.g., they gather for X minutes after player logs off).
    *   **Tests:**
        *   [ ] **T4.1.1:** Upgraded Automata demonstrate improved range/pathing.
        *   [ ] **T4.1.2:** Automata can be deployed anywhere, start collecting.
        *   [ ] **T4.1.3:** Automata gather some resources offline for a limited duration.

*   ### **Environmental Hazards & Opportunities**
    *   **User Story:** As a Passerby, I want to encounter varying terrain and special points of interest so the world feels more dynamic and offers strategic choices.
    *   **Sub-features:**
        *   [ ] **F4.4: Obstacles (`O`):** Impassable terrain that forces player to find alternate routes.
        *   [ ] **F4.5: Slowing Terrain (`~`):** Terrain that costs more than 1 turn to traverse.
        *   [ ] **F4.6: Boost Modules (`+`):** Temporary structures that provide a local, limited-duration buff to nearby Automata/player collection when interacted with. Costs resources to activate.
        *   [ ] **F4.7: Rare Resource Deposits:** Very large clusters of resources or new types of rare resources (`*`).
    *   **Tests:**
        *   [ ] **T4.2.1:** Player cannot move through `O`.
        *   [ ] **T4.2.2:** `~` costs more than 1 turn to move through.
        *   [ ] **T4.2.3:** `+` modules can be activated and apply their buffs.
        *   [ ] **T4.2.4:** Rare resource deposits appear and yield more resources.

*   ### **Endgame Progression & Deeper Lore**
    *   **User Story:** As a Passerby, I want to feel like I'm building towards a significant long-term goal beyond just collecting Echoes, and learn the full story.
    *   **Sub-features:**
        *   [ ] **F4.8: "Prime Echoes" Set Bonus:** Implement a special set of highly rare Echoes. Collecting all of them unlocks a powerful, permanent global bonus and a major Lore Revelation.
        *   [ ] **F4.9: Grand Machine Anomaly (`!M`):** A special, recurring "Anomaly" that gradually reveals the mechanics of the "Grand Reset" and offers a choice to influence the next cycle (e.g., higher chance of specific Echoes, but fewer turns).
        *   [ ] **F4.10: Final Narrative Revelation:** Upon meeting specific conditions (e.g., collecting all Prime Echoes, reaching a high number of cycles), trigger the full story reveal and a "Game Completed" state (or a new prestige layer).
    *   **Tests:**
        *   [ ] **T4.3.1:** Collecting all Prime Echoes triggers the set bonus and lore.
        *   [ ] **T4.3.2:** `!M` appears and offers choices.
        *   [ ] **T4.3.3:** The final narrative revelation triggers at the appropriate time.

---
