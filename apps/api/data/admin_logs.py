# backend/data/admin_logs.py

admin_logs = []

def add_log(entry: dict):
    admin_logs.append(entry)

def get_logs():
    return admin_logs
