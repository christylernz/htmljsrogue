# Development Plan

This document outlines an example of the core features and development tasks presented with user story formatting for clarity and checkboxes for tracking progress.

## General Tasks

[x] Tidy up the list and update the tasks where needed.
[ ] Consider using a given when then structure for the tests.
[ ] Decide how debug mode shows, maybe if you're viewing it from localhost? Or include a keystroke?
[ ] Review Basic UI & Feedback and maybe make it a seperate phase, but it at least needs task updates.

## Future Features to Consider

[ ] Resource gatherers that can move and collect rather than collection from a static resource
[ ] Persistent Objects (current called echoes) can be upgraded and the upgrades persist across resets
[ ] Include a way for the player to become aware that they are near to a persistent object they have had or interacted with before.
[ ] Is there a way to write a story about the objects so across resets the player can see the 'history' of an object.

---

## **Phase 1: Core Loop & Basic Persistence**

The goal of this phase is to establish the fundamental roguelike exploration, resource gathering, and the 'game reset' loop with a basic persistence of objects across resets.

* ### **Basic World Generation & Player Movement**

  * **User Story:** I want to move around an ASCII map so I can explore and interact with it.
    * [x] **ASCII Rendering:** Render basic tiles (`.` floor, `#` wall, `@` player).
      * [x] Player `@` appears on screen.
    * [ ] **Render Basic UI**
      * [x] Able to view basic components of the user interface
      * [ ] Able to see a debug mode maybe
    * [x] **Player Movement:** Implement Arrow key movement, one tile per turn.
      * [ ] Player can move in all 4 cardinal directions.
    * [x] **Basic Map Loading:** Implement simple map loading from a file  for a fixed size.
      * [ ] New map is loaded on each game start.
    * [ ] **Object Loading** Improve the simple map loading to allow create objects
      * [ ] insert test here

* ### **Resource Gathering & Display**

  * **User Story:** I want to collect basic resources from the world so I can accumulate them for later use.
    * [ ] **Resource Tile Generation:** Place common resources (`#` Wood Block, `$` Sparkle Dust, `^` Gear Bits) on the map.
      * [ ] Resource tiles appear on the map.
    * [ ] **Object Interaction:** Implement `E` key to collect resources when on a resource tile, removing the resource from the map.
      * [ ] Interacting with a resource tile adds it to inventory and removes it from the map.
    * [ ] **Resource Display:** Show current collected resources (e.g., `Wood: X, Dust: Y, Gears: Z`) in a UI panel.
      * [ ] UI display updates correctly when resources are collected.

* ### **Game Reset**

  * **User Story:** I want the world to reset after a set number of turns so I can understand the cyclical nature of the game.
    * [ ] **Turn Counter:** Display `Turns Remaining: XXX` and decrement it with each player action.
      * [ ] When using debug mode you are able to see the turns remaining
    * [ ] **Reset Trigger:** When `Turns Remaining` reaches 0, trigger the "Grand Reset" event.
      * [ ] Turn counter decrements correctly.
    * [ ] **Reset Logic:** Clear current inventory (except persistent elements, to be added later), regenerate map, reset turn counter.
      * [ ] When turns hit 0, a new map loads and turn counter resets.
    * [ ] **Basic Map Generation:** Implement a simple procedural map generation (e.g., drunken walk or simple room/corridor) for a fixed size.
      * [ ] Resources collected in previous cycle are gone after reset.

* ### **Basic Persistence**

  * **User Story:** I want to find a unique object that persists across resets so I can feel a sense of permanent progress.
    * [ ] **Single Echo Definition:** Define a single Echo (e.g., The Omnicube `Ω`) with a unique name and basic (initially null) effect.
    * [ ] **Object Placement:** Place one `Ω` randomly on the map during generation.
      * [ ] [ ] `Ω` appears on the map.
    * [ ] **ObjectbCollection:** Interacting with `Ω` adds it to a "Collected Echoes (Current Cycle)" list.
    * [ ] **Permanent Echo Collection:** At Grand Reset, move `Ω` from "Collected Echoes (Current Cycle)" to "Permanent Echo Collection" list.
    * [ ] **Re-spawn:** If `Ω` is in "Permanent Echo Collection," ensure it spawns randomly on the *next* map.
      * [ ] In the next cycle, `Ω` appears randomly on the new map.

---

## **Phase 2: Automation, Upgrades & Offline Progression**

This phase introduces the core idle mechanics, permanent upgrades, and the strategic layer of Echo development.

* ### **Pocket Workshop & Core Synthesizers**

  * **User Story:** I want a permanent base to generate resources even when I'm offline, so I always make progress.
    * [ ] **Pocket Workshop UI:** Implement a separate UI screen for the Pocket Workshop (accessed via hotkey from main game).
    * [ ] **Core Synthesizer Definitions:** Define Wood Synthesizer (`W`), Dust Reactor (`D`), Gear Forge (`G`).
    * [ ] **Initial Synthesizer Construction:** Allow initial construction of Tier 1 Synthesizers using common resources.
      * [ ] Synthesizers can be built/upgraded at cost.
    * [ ] **Passive Resource Generation:** Synthesizers generate resources at a fixed rate per turn.
      * [ ] Resource counts increase passively every turn that is taken.
    * [ ] **Offline Generation Logic:** Implement logic for Synthesizers to accumulate resources while the game is closed.
      * [ ] After closing and reopening game, accumulated offline resources are granted.
    * [ ] **Synthesizer Upgrades:** Allow upgrading Synthesizer tiers (costs common resources), increasing their production rate.
      * [ ] Upgraded Synthesizers show increased production rate.

* ### **Schematics & Deployed Automata**

  * **User Story:** I want to deploy automated toy machines to gather resources in the world so I can free up my own turns for exploration.
    * [ ] **Schematic Discovery (`?`):** Implement `?` tiles on the map. Interacting with them grants an "Unidentified Schematic."
      * [ ] `?` tiles appear, interaction grants Schematic.
    * [ ] **Schematic Deciphering:** allow "deciphering" Schematics (costs resources, consumes turns).
      * [ ] Schematics can be deciphered at cost.
      * [ ] Deciphered Schematics allow building Automata.
    * [ ] **Automata Definitions:** Define Gear Automaton (`g`), Robo-Woodcutter (`r`), Dust Sweeper (`d`) with movement AI and gathering logic.
    * [ ] **Automata Deployment:** Allow building and deploying Automata into the current World cycle.
      * [ ] Deployed Automata move and collect resources.
    * [ ] **Automata Logic:** Automata move towards and collect their specific resource type.
      * [ ] Resources collected by Automata are added to player's global resource count.
    * [ ] **Automata Reset:** Deployed Automata disappear on game reset.
      * [ ] Automata are gone after game Reset.

---

## **Phase 3: Lore, More Echoes & Game Polish**

This phase expands the content, introduces the narrative, and polishes the user experience.

* ### **Lore Fragments & Chronicle Log**

  * **User Story:** I want to discover fragments of the world's story that persist across resets so I can uncover the mystery.
    * [ ] **Lore Fragment Placement (`L`):** Place `L` tiles randomly on the map.
      * [ ] `L` tiles appear on the map.
    * [ ] **Lore Interaction:** Interacting with `L` adds a text entry to a permanent "Chronicle Log."
      * [ ] Interacting with `L` adds a lore entry to the log.
    * [ ] **Chronicle Log UI:** Implement a UI to view all discovered lore entries.
      * [ ] Lore entries persist in the log across game resets.

* ### **Multiple Echoes & Rarity**

  * **User Story:** I want to find a variety of unique Echoes with different effects, making each cycle's hunt exciting.
    * [ ] **Define 3-5 New Echoes:** Create definitions for several new Echoes (e.g., `β` Boltzman's Battery, `∞` Infini-Spool) with unique symbols, effects, and upgrade paths.
      * [ ] New Echo symbols appear on the map.
      * [ ] Each Echo collected applies its specific effect.
    * [ ] **Echo Rarity:** Assign rarity tiers (e.g., Common, Uncommon, Rare) to Echoes, influencing their spawn chance.
      * [ ] Rarity influences how frequently Echoes are encountered.
    * [ ] **Random Echo Spawns:** During map generation, randomly select and place a set number of Echoes based on their rarity and player's permanent collection.
      * [ ] New Echoes can be added to the permanent collection and will then reappear in subsequent cycles.

* ### **Basic UI & Feedback**

  * **User Story:** I want clear visual feedback on my actions and game state so I can understand what's happening.
    * [ ] **Turn Counter Visibility:** Prominent display of `Turns Remaining`.
      * [ ] All UI elements are visible and update correctly.
    * [ ] **Resource Change Notifications:** Small pop-up or scroll messages for resource gains/losses.
      * [ ] Notifications appear for key actions.
    * [ ] **Echo Collection Notifications:** Clear message when an Echo is collected.
    * [ ] **Basic Sound Effects:** Simple sounds for movement, interaction, resource collection, Grand Reset.
      * [ ] Sound effects play as expected.

---

## **Phase 4: Advanced Gameplay & End Game**

Introducing deeper mechanics, greater strategy, and a sense of progression towards a significant long-term goal.

### **Features to Develop:**

* ### **Automata Targeting & Efficiency**

  * **User Story:** I want to optimize my automated gatherers' behavior so they are more efficient.
    * [ ] **Automata Range/Pathing Upgrades:** Implement upgrades for Automata (via Schematics or Echoes) to increase their collection range or improve their pathfinding.
    * [ ] **Automata Deployment Strategy:** Allow placing Automata on any cleared tile.
    * [ ] **Limited Offline Automata Operation:** Implement a "sleep timer" for deployed Automata for offline production (e.g., they gather for X minutes after player logs off).
  * **Tests:**
    * [ ] Upgraded Automata demonstrate improved range/pathing.
    * [ ] Automata can be deployed anywhere, start collecting.
    * [ ] Automata gather some resources offline for a limited duration.

* ### **Environmental Hazards & Opportunities**

  * **User Story:** I want to encounter varying terrain and special points of interest so the world feels more dynamic and offers strategic choices.
    * [ ] **Obstacles (`O`):** Impassable terrain that forces player to find alternate routes.
    * [ ] **Slowing Terrain (`~`):** Terrain that costs more than 1 turn to traverse.
    * [ ] **Boost Modules (`+`):** Temporary structures that provide a local, limited-duration buff to nearby Automata/player collection when interacted with. Costs resources to activate.
    * [ ] **Rare Resource Deposits:** Very large clusters of resources or new types of rare resources (`*`).
  * **Tests:**
    * [ ] Player cannot move through `O`.
    * [ ] `~` costs more than 1 turn to move through.
    * [ ] `+` modules can be activated and apply their buffs.
    * [ ] Rare resource deposits appear and yield more resources.

* ### **Endgame Progression & Deeper Lore**

  * **User Story:** I want to feel like I'm building towards a significant long-term goal beyond just collecting Echoes, and learn the full story.
    * [ ] **"Prime Echoes" Set Bonus:** Implement a special set of highly rare Echoes. Collecting all of them unlocks a powerful, permanent global bonus and a major Lore Revelation.
    * [ ] **Grand Machine Anomaly (`!M`):** A special, recurring "Anomaly" that gradually reveals the mechanics of the "Grand Reset" and offers a choice to influence the next cycle (e.g., higher chance of specific Echoes, but fewer turns).
  * **Tests:**
    * [ ] Collecting all Prime Echoes triggers the set bonus and lore.
    * [ ] `!M` appears and offers choices.
    * [ ] The final narrative revelation triggers at the appropriate time.

---
