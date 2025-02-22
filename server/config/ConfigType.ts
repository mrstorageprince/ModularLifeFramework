/**
 * ConfigType defines the structure of our configuration settings.
 * These settings allow the server operator to control various aspects of the server behavior.
 */
export interface Config {
    storageType: "postgres" | "json"; // Determines whether to use PostgreSQL or JSON storage for players.
    welcomeMessage: string; // Message displayed when players join the server.
}