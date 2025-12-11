from flask import Blueprint, request, jsonify
import uuid
import threading

auth = Blueprint("auth", __name__)

# Store active sessions in memory
SESSION_STORE = {}
SESSION_LOCK = threading.Lock()


@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    client_id = data.get("client_id")
    password = data.get("password")

    if not client_id or not password:
        return jsonify({"success": False, "message": "Missing credentials"}), 400

    # RULE: Password = ClientID
    if str(client_id) != str(password):
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

    token = str(uuid.uuid4())

    with SESSION_LOCK:
        SESSION_STORE[token] = {"client_id": client_id}

    return jsonify({
        "success": True,
        "token": token,
        "client_id": client_id
    })
    

def get_client_id_from_token(token: str):
    with SESSION_LOCK:
        session = SESSION_STORE.get(token)
        if session:
            return session.get("client_id")
    return None
