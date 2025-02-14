# 🎮 ModularLifeFramework

**ModularLifeFramework** is a **highly modular, scalable framework** for creating **life simulation missions** in game engines like **Arma 3** and **Arma Reforger**.  
It provides **dynamic game systems** such as **faction management**, **economy**, **government control**, **territory control**, and **civilian activity**.

---

## 🚀 **Project Goals**

- 🛠️ **Modularity:** Easily extendable, with each game system as a module.
- 🧠 **Dynamic Gameplay:** Faction-driven political dynamics, government overthrows, and NPC resistance.
- 💱 **Realistic Economy:** Treasury accounts with transaction logging and secure banking logic.
- 🌆 **Territory Control:** Capture minor checkpoints, districts, and strategic zones.
- 🏛️ **Government Structures:** NPC and player-controlled governments with coup mechanics.
- 👮 **Law Enforcement:** Police forces can patrol, respond to crime, and manage civilians.
- 🚚 **Civilian Jobs:** Delivery missions, job markets, and economic interactions.

---

## 🏗️ **Technology Stack**

- **Language:** TypeScript
- **Database:** PostgreSQL (production) / In-Memory (testing)
- **Engine Integration:** Arma 3 / Arma Reforger (via bridge)
- **Framework:** Node.js
- **ORM:** TypeORM

---

## 📂 **Folder Structure**

```plaintext
📁 ModularLifeFramework
   ├─ 📁 bridge (Engine Integration)
   │    └─ src
   │        └─ entities     # Game world entities (factions, economy, etc.)
   │        └─ services     # Engine-facing services
   │        └─ utils        # Utility helpers
   ├─ 📁 core (Business Logic)
   │    └─ models           # Data models
   │    └─ modules          # Game logic modules
   │    └─ repositories     # Data access and persistence
   │    └─ services         # Core services used across modules
   │    └─ utils            # Core utilities
   ├─ 📁 test (Test scripts)
   │    └─ testFactionManager.ts
   │    └─ testTreasuryManager.ts
   │    └─ testGovernmentManager.ts
   └─ 📄 README.md
```

**Key Components**:
- **Bridge** – Handles engine interactions.
- **Core** – Implements gameplay logic.
- **Test** – Runs validation tests.

---

## 🧩 **Core Game Systems**

### 🛡️ **1. Faction Management**
- Create, join, and manage factions.
- Form **coalitions** with multiple factions.
- Overthrow governments through political actions.

### 💵 **2. Economic System**
- Treasury accounts with transaction logs.
- Dynamic economy with adjustable inflation and taxes.
- Supports **faction-controlled** and **government-controlled** accounts.

### 🗺️ **3. Territory Control**
- Step-by-step capture of checkpoints, districts, and cities.
- **Multi-stage process** ensures gradual faction growth.
- Territory influences **economy**, **law enforcement**, and **civilian activity**.

### 🏛️ **4. Government System**
- **NPC-controlled governments** maintain order until players take control.
- Players can form **factional governments** by seizing critical infrastructure.
- Government actions include: **law enforcement**, **economic policy**, and **public services**.

### 👮 **5. Law Enforcement**
- Police forces handle **crime detection**, **arrests**, and **patrols**.
- Law enforcement can be **independent** or **faction-aligned**.
- **On-duty/off-duty** mechanics allow for civilian-mode police officers.

### 🛠️ **6. Civilian Activities**
- Civilians can **take jobs**, **deliver goods**, and **contribute to the economy**.
- Civilian activities respond to **economic shifts** and **territorial changes**.

---

## 🔍 **How it Works**

### ⚙️ **Gameplay Flow**

1. **Factions Form**: Players create or join factions.
2. **Territory Acquisition**: Factions capture **checkpoints** and **districts**.
3. **Government Resistance**: NPCs resist faction growth.
4. **Coup Attempt**: Once enough territory is captured, factions can **attempt a coup**.
5. **Post-Coup Dynamics**: If the coup succeeds, **new laws and policies** can be enacted.

---

## 🛠️ **Setup Guide**

### 🖥️ **Prerequisites**

- **Node.js** (v18+)
- **PostgreSQL**
- **Arma 3 / Reforger** (for engine integration)

---

### 🛠️ **Installation**

```bash
# Clone the repository
git clone https://github.com/YourUserName/ModularLifeFramework.git

# Navigate to the project directory
cd ModularLifeFramework

# Install dependencies
npm install
```

---

### ⚙️ **Database Configuration**

Update the database config in:  
`bridge/src/data-source.ts`

```typescript
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your_db_user',
    password: 'your_db_password',
    database: 'modular_life',
    synchronize: true,
    logging: false,
    entities: ['./src/entities/**/*.ts'],
});
```

---

### 🚀 **Running Tests**

Run **FactionManager** tests:
```bash
npx ts-node test/testFactionManager.ts
```

Run **TreasuryManager** tests:
```bash
npx ts-node test/testTreasuryManager.ts
```

---

### 🎯 **Running the Project**

```bash
npm start
```

The framework will connect to the database, initialize entities, and start all core services.

---

## ⚔️ **Gameplay Dynamics Overview**

### 🌐 **Territory Control**

- **Phase 1:** Checkpoint Capture
- **Phase 2:** District Control
- **Phase 3:** Capital Seizure

### 🏛️ **Coup Mechanics**

**Requirements:**
- **75% territory control**
- **Sufficient treasury funds**
- **Minimum faction strength**

### 👮 **Law Enforcement Dynamics**

- **Police can go on/off duty**.
- **Criminal activity** is tracked in real-time.

---

## ⚠️ **Troubleshooting**

1. **Database Connection Errors**:
    - Check if **PostgreSQL** is running.
    - Verify database credentials.

2. **Missing Modules**:
    - Run `npm install` again to restore packages.

3. **TypeScript Compile Issues**:
    - Run `npm run build` to check for issues.

---

## 🤝 **Contributing**

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## 📜 **License**

This project is licensed under the **MIT License**.

---

🌆 **Happy simulating!** 🌆

