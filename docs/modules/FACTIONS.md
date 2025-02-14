# 🏰 Faction Module Documentation

## 🧠 Core Concepts
- **Factions:** Player-created groups with a common goal.
- **Coalitions:** Alliances between multiple factions with shared resources.
- **Members & Roles:** Players join factions and receive assigned roles.
- **Dynamic Power Structures:** Factions can challenge NPC governments or other factions for control.

### ⚖️ Rules
- Each **player** can only join **one faction**.
- Each **faction** can only belong to **one coalition**.
- A **coalition** requires **at least two factions**.
- Treasury operations are managed in the **Economy Module**.

---

## ⚙️ System Components
**Key Classes**
- 🧉 `FactionManager` → Core business logic.
- 🧉 `IFactionRepository` → Repository interface.
- 🧉 `InMemoryFactionRepository` → In-memory persistence.
- 🧉 `PostgresFactionRepository` → PostgreSQL persistence.
- 🧉 `FactionEntity` → Database entity for factions.
- 🧉 `FactionMemberEntity` → Database entity for members.
- 🧉 `FactionTypes` → TypeScript interfaces.

**File Structure**
```plaintext
core/
├── models/factions/FactionTypes.ts
├── entities/factions/FactionEntity.ts
├── entities/factions/FactionMemberEntity.ts
├── repositories/factions/
│    ├─ IFactionRepository.ts
│    ├─ InMemoryFactionRepository.ts
│    └─ PostgresFactionRepository.ts
├── modules/factions/FactionManager.ts
test/testFactionManager.ts
```

---

## 🚀 API Overview

### 🏰 Faction Methods
- `createFaction(name, description, treasuryId)` → Create a faction.
- `deleteFaction(factionId)` → Delete a faction.
- `findFactionById(factionId)` → Find faction by ID.
- `updateFaction(faction)` → Update a faction.

---

### 👥 Member Methods
- `addMember(factionId, playerId, role)` → Add member.
- `removeMember(memberId)` → Remove member.
- `findMembersByFactionId(factionId)` → Get all members.

---

### 🤝 Coalition Methods
- `createCoalition(name, description, treasuryId, factionIds)` → Create coalition.
- `removeFactionFromCoalition(factionId)` → Remove faction.
- `findCoalitionById(coalitionId)` → Retrieve coalition.

---

## 🛠️ Database Schema

### 🏰 Factions Table
```sql
CREATE TABLE factions (
    faction_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    treasury_id TEXT NOT NULL,
    coalition_id TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL
);
```

### 👥 Faction Members Table
```sql
CREATE TABLE faction_members (
    member_id UUID PRIMARY KEY,
    player_id TEXT NOT NULL,
    faction_id INT NOT NULL,
    role TEXT CHECK (role IN ('leader', 'officer', 'member')),
    joined_at TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (faction_id) REFERENCES factions(faction_id) ON DELETE CASCADE
);
```

### 🤝 Coalitions Table
```sql
CREATE TABLE coalitions (
    coalition_id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    treasury_id TEXT NOT NULL,
    faction_ids INTEGER[] NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);
```

---

## ⚙️ Design Considerations

1. **Faction Limitations**: One coalition per faction.
2. **Coalition Minimum**: At least two factions required.
3. **Member Roles**: Leader, Officer, Member.
4. **Treasury Integration**: Treasury IDs linked to the Economy Module.