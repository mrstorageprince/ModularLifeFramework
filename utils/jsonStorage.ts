import fs from "fs-extra";

/**
 * Utility class for handling JSON file storage.
 */
export class JSONStorage<T> {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
        fs.ensureFileSync(this.filePath);
    }

    async read(): Promise<T[]> {
        try {
            const data = await fs.readFile(this.filePath, "utf-8");
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    async write(data: T[]): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }
}