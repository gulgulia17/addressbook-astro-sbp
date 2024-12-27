export const config = {
    app: {
        name: import.meta.env.APP_NAME || 'Shree Balaji Photocopiers',
        env: import.meta.env.APP_ENV || 'local',
        debug: import.meta.env.APP_DEBUG === 'true',
        url: import.meta.env.APP_URL || 'http://localhost:4321',
    },
    db: {
        connection: import.meta.env.DB_CONNECTION || 'sqlite',
        path: import.meta.env.DB_PATH || './db/auth.db'
    },
    jwt: {
        secret: import.meta.env.JWT_SECRET || 'default-secret-key'
    }
};

export function validateConfig() {
    const required = ['APP_NAME', 'JWT_SECRET', 'DB_PATH'];
    const missing = required.filter(key => !import.meta.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}