import os
import datetime
from functools import wraps

import jwt
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # allows React (localhost:3000) to call this API (localhost:5000)

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-change-me")
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "workhub_db"),
}


def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)


# =========================================
# JWT HELPERS
# =========================================

def generate_token(user_id, email):
    payload = {
        "user_id": user_id,
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=JWT_EXPIRY_HOURS),
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def token_required(f):
    """Decorator to protect routes - expects 'Authorization: Bearer <token>' header."""
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"message": "Missing or invalid authorization header"}), 401

        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
            request.user_id = payload["user_id"]
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token expired, please log in again"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        return f(*args, **kwargs)
    return decorated


# =========================================
# AUTH ROUTES
# =========================================

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify({"message": "Name, email, and password are required"}), 400

    if len(password) < 6:
        return jsonify({"message": "Password must be at least 6 characters"}), 400

    password_hash = generate_password_hash(password)

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (name, email, password_hash) VALUES (%s, %s, %s)",
            (name, email, password_hash),
        )
        conn.commit()
    except mysql.connector.IntegrityError:
        return jsonify({"message": "An account with this email already exists"}), 409
    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": "Account created successfully"}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if not user or not check_password_hash(user["password_hash"], password):
        return jsonify({"message": "Invalid email or password"}), 401

    token = generate_token(user["id"], user["email"])
    return jsonify({"token": token, "name": user["name"], "email": user["email"]}), 200


# =========================================
# DASHBOARD ROUTE
# =========================================

@app.route("/api/dashboard-stats", methods=["GET"])
@token_required
def dashboard_stats():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total FROM employees")
    total_employees = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(DISTINCT department) AS depts FROM employees")
    departments = cursor.fetchone()["depts"]

    cursor.close()
    conn.close()

    # "activeToday" is a placeholder metric until you add real attendance tracking
    return jsonify({
        "totalEmployees": total_employees,
        "activeToday": total_employees,
        "departments": departments,
    }), 200


# =========================================
# EMPLOYEE CRUD ROUTES
# =========================================

@app.route("/api/employees", methods=["GET"])
@token_required
def get_employees():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, name, email, department FROM employees ORDER BY id DESC")
    employees = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(employees), 200


@app.route("/api/employees/<int:employee_id>", methods=["GET"])
@token_required
def get_employee(employee_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, name, email, department FROM employees WHERE id = %s", (employee_id,))
    employee = cursor.fetchone()
    cursor.close()
    conn.close()

    if not employee:
        return jsonify({"message": "Employee not found"}), 404

    return jsonify(employee), 200


@app.route("/api/employees", methods=["POST"])
@token_required
def add_employee():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    department = data.get("department", "").strip()

    if not name or not email or not department:
        return jsonify({"message": "Name, email, and department are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO employees (name, email, department) VALUES (%s, %s, %s)",
            (name, email, department),
        )
        conn.commit()
        new_id = cursor.lastrowid
    except mysql.connector.IntegrityError:
        return jsonify({"message": "An employee with this email already exists"}), 409
    finally:
        cursor.close()
        conn.close()

    return jsonify({"message": "Employee added successfully", "id": new_id}), 201


@app.route("/api/employees/<int:employee_id>", methods=["PUT"])
@token_required
def update_employee(employee_id):
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    department = data.get("department", "").strip()

    if not name or not email or not department:
        return jsonify({"message": "Name, email, and department are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE employees SET name = %s, email = %s, department = %s WHERE id = %s",
        (name, email, department, employee_id),
    )
    conn.commit()
    affected = cursor.rowcount
    cursor.close()
    conn.close()

    if affected == 0:
        return jsonify({"message": "Employee not found"}), 404

    return jsonify({"message": "Employee updated successfully"}), 200


@app.route("/api/employees/<int:employee_id>", methods=["DELETE"])
@token_required
def delete_employee(employee_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM employees WHERE id = %s", (employee_id,))
    conn.commit()
    affected = cursor.rowcount
    cursor.close()
    conn.close()

    if affected == 0:
        return jsonify({"message": "Employee not found"}), 404

    return jsonify({"message": "Employee deleted successfully"}), 200


# =========================================
# HEALTH CHECK (useful for Jenkins/EC2 later)
# =========================================

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)