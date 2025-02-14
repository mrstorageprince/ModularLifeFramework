# 🧑‍💼 Player Module Documentation

## 🧠 Core Concepts
- **Players:** Represent individual participants in the game world.
- **Faction Membership:** Each player can belong to only one faction.
- **Roles and Responsibilities:** Players can have roles (e.g., civilian, police officer).
- **Persistent Data:** Player state is stored across sessions.

### ⚖️ Rules
- **Unique Player ID:** Each player has a unique UUID.
- **Single Faction Membership:** A player can join only one faction.
- **Police Role Management:** Police status is managed independently.
- **Economy Integration:** Player balances are managed via the Economy Module.

---

## ⚙️ System Components
**Key Classes**
- 🧩 `PlayerManager` → Core business logic.
- 🧩 `IPlayerRepository` → Repository interface.
- 🧩 `InMemoryPlayerRepository` → In-memory persistence.
- 🧩 `PostgresPlayerRepository` → PostgreSQL persistence.
- 🧩 `PlayerEntity` → Database entity for players.
- 🧩 `PlayerTypes` → TypeScript interfaces.

**File Structure**
```plaintext
core/
├── models/player/PlayerTypes.ts
├── entities/player/PlayerEntity.ts
├── repositories/player/
│    ├─ IPlayerRepository.ts
│    ├─ InMemoryPlayerRepository.ts
│    └─ PostgresPlayerRepository.ts
├── modules/player/PlayerManager.ts
test/testPlayerManager.ts
```

---

## 🚀 API Overview

### 🧑‍💼 Player Methods
- `createPlayer(playerName, factionId?)` → Create a new player.
- `findById(playerId)` → Retrieve player details.
- `update(playerId, updates)` → Update player details.
- `delete(playerId)` → Delete a player.
- `findAll()` → Retrieve all players.

---

## 🛠️ Database Schema

### 🧑‍💼 Players Table
```sql
CREATE TABLE players (
    player_id UUID PRIMARY KEY,
    player_name TEXT NOT NULL,
    faction_id INT NULL,
    money_balance NUMERIC NOT NULL DEFAULT 0,
    is_police BOOLEAN NOT NULL DEFAULT false,
    last_login TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);
```

### 🔍 Indexes for Optimization
```sql
CREATE INDEX idx_player_id ON players(player_id);
CREATE INDEX idx_faction_id ON players(faction_id);
```

---

## ⚙️ Design Considerations

1. **Faction Dependency:** Faction membership is optional during player creation.
2. **Police Status:** Managed independently for flexibility.
3. **Balance Management:** Delegated to the Economy Module.
4. **UUID Usage:** Ensures global uniqueness across all game systems.