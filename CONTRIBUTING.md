# 🛠️ Contributing to ModularLifeFramework

Thank you for your interest in contributing to **ModularLifeFramework**! 🎉

This document outlines the guidelines for contributing to the project, including how to report issues, suggest improvements, and submit code changes.

---

## 🚀 **Getting Started**

### 1️⃣ **Fork the Repository**

1. Go to the project repository on GitHub.
2. Click the **Fork** button to create a copy of the repo in your account.
3. Clone the forked repository:

```bash
git clone https://github.com/YourUsername/ModularLifeFramework.git
cd ModularLifeFramework
```

### 2️⃣ **Install Dependencies**

Ensure you have **Node.js** and **PostgreSQL** installed.

```bash
npm install
```

### 3️⃣ **Create a Branch**

Create a feature branch based on the task you're working on:

```bash
git checkout -b feature/your-feature-name
```

---

## 🐞 **Reporting Issues**

If you encounter a bug or have a feature request:

1. Navigate to the **Issues** tab on GitHub.
2. Click **New Issue**.
3. Provide a **clear title** and detailed description.
4. Add relevant **labels** (e.g., bug, enhancement).
5. Attach **screenshots** or **logs** if applicable.

**Template for Bug Reports:**
```markdown
**Description:**
A clear and concise description of the issue.

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
A clear and concise description of what you expected to happen.

**Screenshots:**
If applicable, add screenshots to help explain the issue.

**Environment:**
- OS: [e.g. Windows 10]
- Node.js version: [e.g. 18.17.0]
- Game Engine: [e.g. Arma 3]
```

---

## 🛠️ **Code Contribution Guidelines**

### ✅ **Code Standards**

- **Use TypeScript**: Ensure all new code is written in **TypeScript**.
- **Naming Conventions**: Use **camelCase** for variables/functions and **PascalCase** for classes.
- **Comments**: Use clear and concise comments.
- **Modularity**: Stick to the existing **modular structure**.

### 🧪 **Testing Code**

Ensure all new code includes tests:

- Add tests to the `test/` folder.
- Run tests before submitting your PR:

```bash
npx ts-node test/testFactionManager.ts
npx ts-node test/testTreasuryManager.ts
```

### 🔍 **Linting**

Run ESLint to check your code:

```bash
npm run lint
```

---

## 🔁 **Submitting a Pull Request (PR)**

1. **Commit Changes**:

```bash
git add .
git commit -m "Add feature: description"
```

2. **Push Branch**:

```bash
git push origin feature/your-feature-name
```

3. Go to the GitHub repo and create a **Pull Request**.
4. Provide a **clear description** of your changes.
5. Add relevant **labels** (e.g., feature, bugfix).

**PR Checklist:**
- [ ] Code follows the style guide.
- [ ] Tests have been written and pass.
- [ ] Code is documented where necessary.
- [ ] Feature/fix was tested locally.

---

## 🌱 **Development Guidelines**

### **Modules**
Each gameplay system is structured as a **module** in `core/modules/`. When adding new gameplay elements, follow this structure:

1. **Module Folder**: Create a folder in `core/modules/`.
2. **Manager Class**: Create a `Manager.ts` file (e.g., `FactionManager.ts`).
3. **Repository Interface**: Add the `IYourModuleRepository.ts` interface.
4. **Repository Implementations**: Add `InMemory` and `Postgres` implementations.

### **Entities & Models**

All entities are in `bridge/src/entities/` and models in `core/models/`. If adding a new entity:

- Add the **Entity** in `bridge/src/entities`.
- Add the **TypeScript Model** in `core/models`.

### **Database Migrations**

If your changes require database changes, run migrations:

```bash
npm run typeorm migration:generate -- -n MigrationName
npm run typeorm migration:run
```

---

## ⚔️ **Gameplay Rules Development**

When contributing to gameplay systems (like **territory control**, **government mechanics**, or **economy**):

- Follow the **existing gameplay logic**.
- Ensure **NPC and player interactions** behave dynamically.
- Test **edge cases** like **large transactions** or **massive population growth**.

---

## 🧠 **Understanding the Core Systems**

### 1️⃣ **Factions & Coalitions**
- Factions can form coalitions dynamically.
- Coalitions operate as a sum of member factions.
- Government takeovers require **territory dominance**.

### 2️⃣ **Economy System**
- The treasury system mirrors **bank-like accounts**.
- Uses **TransactionEntity** and **AccountEntity** to track funds.
- Supports **coalition-wide accounts**.

### 3️⃣ **Territory Control**
- Uses **stepwise control mechanisms**.
- Factions must capture checkpoints, districts, and strategic points.

### 4️⃣ **Law Enforcement**
- Supports **dynamic police roles**.
- NPC police respond to **crime levels** and **faction actions**.

### 5️⃣ **Government Structure**
- Government shifts from **NPC to player-controlled** based on coups.

---

## ❗ **Important Notes**

- **DO NOT hardcode** sensitive data (e.g., passwords).
- **Document** all new modules and functions.
- **Test changes thoroughly**.

---

**💙 Thank you for contributing to ModularLifeFramework!**

