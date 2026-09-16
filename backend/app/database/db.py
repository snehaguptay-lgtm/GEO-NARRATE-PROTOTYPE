import sqlite3
import json
import os
from typing import Dict, Any, List, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "geonarrate.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Table for analyses
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS analyses (
        analysis_id TEXT PRIMARY KEY,
        title TEXT,
        scenario_id TEXT,
        location_json TEXT,
        images_json TEXT,
        result_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # Table for queries & narrations
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS queries (
        query_id TEXT PRIMARY KEY,
        analysis_id TEXT,
        user_query TEXT,
        answer TEXT,
        evidence_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    conn.commit()
    conn.close()

def save_analysis(analysis_data: Dict[str, Any]):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
    INSERT OR REPLACE INTO analyses (analysis_id, title, scenario_id, location_json, images_json, result_json)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (
        analysis_data["analysis_id"],
        analysis_data["title"],
        analysis_data["scenario_id"],
        json.dumps(analysis_data["location"]),
        json.dumps(analysis_data["images"]),
        json.dumps(analysis_data)
    ))
    conn.commit()
    conn.close()

def get_analysis(analysis_id: str) -> Optional[Dict[str, Any]]:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT result_json FROM analyses WHERE analysis_id = ?", (analysis_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return json.loads(row[0])
    return None

def get_all_analyses() -> List[Dict[str, Any]]:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT result_json FROM analyses ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [json.loads(r[0]) for r in rows]

def save_query(query_data: Dict[str, Any]):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
    INSERT INTO queries (query_id, analysis_id, user_query, answer, evidence_json)
    VALUES (?, ?, ?, ?, ?)
    """, (
        query_data["query_id"],
        query_data["analysis_id"],
        query_data["user_query"],
        query_data["answer"],
        json.dumps(query_data["evidence"])
    ))
    conn.commit()
    conn.close()
