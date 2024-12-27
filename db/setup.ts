import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const db = new Database('db/database.db');

db.pragma('foreign_keys = ON');

const schema = fs.readFileSync(path.join(process.cwd(), 'db/schema.sql'), 'utf-8');
db.exec(schema);

export default db;