import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

async function inicializeDb() {
    if (db) return db;
    
    db = await open({
        filename: ":memory:",
        driver: sqlite3.Database
    });
    
    // Habilitar foreign keys
    await db.exec("PRAGMA foreign_keys = ON");
    
    return db;
}

// Wrapper para manter compatibilidade com código existente
export default {
    query: async (sql, params = []) => {
        const database = await inicializeDb();
        
        // Converter SQL de PostgreSQL para SQLite
        let modifiedSql = sql;
        
        // Remover "if not exists" de cláusulas create
        modifiedSql = modifiedSql.replace(/create table if not exists/gi, "create table if not exists");
        
        // Converter tipos UUID para TEXT
        modifiedSql = modifiedSql.replace(/uuid primary key/gi, "text primary key");
        
        // Converter serial para INTEGER AUTOINCREMENT
        modifiedSql = modifiedSql.replace(/serial primary key/gi, "integer primary key autoincrement");
        
        // Converter timestamp para TEXT
        modifiedSql = modifiedSql.replace(/timestamp/gi, "text");
        modifiedSql = modifiedSql.replace(/current_timestamp/gi, "CURRENT_TIMESTAMP");
        
        // Converter $N para ?
        let paramIndex = 1;
        modifiedSql = modifiedSql.replace(/\$\d+/g, () => "?");
        
        try {
            // Para SELECT
            if (modifiedSql.trim().toUpperCase().startsWith("SELECT")) {
                const rows = await database.all(modifiedSql, params);
                return { rows: rows || [] };
            }
            
            // Para INSERT, UPDATE, DELETE
            const result = await database.run(modifiedSql, params);
            return { rowCount: result.changes || 0, rows: [] };
        } catch (error) {
            throw error;
        }
    },
    
    end: async () => {
        if (db) {
            await db.close();
            db = null;
        }
    }
};

// Inicializar na primeira importação
await inicializeDb();