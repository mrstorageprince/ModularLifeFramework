import fs from "fs-extra";
import path from "path";
import { Config } from "./ConfigType";

const configPath = path.resolve(__dirname, "config.json");

export class ConfigManager {
    private static config: Config;

    /**
     * Loads the configuration from config.json. If the file does not exist, creates a default config.
     */
    static async loadConfig(): Promise<void> {
        try {
            if (await fs.pathExists(configPath)) {
                const data = await fs.readFile(configPath, "utf-8");
                ConfigManager.config = JSON.parse(data);
            } else {
                await ConfigManager.resetToDefaults();
            }
        } catch (error) {
            console.error("Error loading config:", error);
        }
    }

    /**
     * Returns the current server configuration.
     */
    static getConfig(): Config {
        return ConfigManager.config;
    }

    /**
     * Updates the configuration and saves it to the config.json file.
     * @param newConfig - The updated configuration values.
     */
    static async updateConfig(newConfig: Partial<Config>): Promise<void> {
        ConfigManager.config = { ...ConfigManager.config, ...newConfig };
        await fs.writeFile(configPath, JSON.stringify(ConfigManager.config, null, 2));
    }

    /**
     * Resets the configuration to default values.
     */
    static async resetToDefaults(): Promise<void> {
        ConfigManager.config = {
            storageType: "json",
            welcomeMessage: "Welcome to the Modular Life Server!"
        };
        await ConfigManager.updateConfig(ConfigManager.config);
    }
}