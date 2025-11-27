"use server";
import { neon } from "@neondatabase/serverless";

export async function getDbConnection() {
    if (!process.env.DATABASE_URL) {
        throw new Error('Tidak ada database terdeteksi')
    }
    const sql = neon(process.env.DATABASE_URL);
    return sql
}