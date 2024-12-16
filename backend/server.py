# server.py
from flask import Flask, request, jsonify
from datetime import datetime, timedelta
app = Flask(__name__)

# Initial group data
groups_data = [{
    "id": 1,
    "name": "Senior Night",
    "duration": "6 Hours",
    "eventType": "Party",
    "createdAt": datetime.now().isoformat(),
    "members": [
        {"name": "Jacob", "status": "All Good", "battery": 82, "emoji": "✅"},
        {"name": "Jaewon", "status": "I am so drunk", "battery": 15, "emoji": "🍺"},
        {"name": "Patrick", "status": "Left", "battery": 45, "emoji": "✌️"},
        {"name": "Murat", "status": "Walking to 1020!", "battery": 67, "emoji": "🚶"}
    ]
}]

@app.route('/api/groups', methods=['GET'])
def get_groups():
    return jsonify(groups_data)

@app.route('/api/groups', methods=['POST'])
def create_group():
    json_data = request.get_json()
    
    # Generate new group ID
    new_id = max([group["id"] for group in groups_data]) + 1 if groups_data else 1
    
    # Create new group with current timestamp
    new_group = {
        "id": new_id,
        "name": json_data["name"],
        "duration": json_data["duration"],
        "eventType": json_data["eventType"],
        "createdAt": datetime.now().isoformat(),
        "members": json_data["members"]
    }
    
    groups_data.append(new_group)
    return jsonify(new_group)

@app.route('/api/groups/<int:group_id>', methods=['GET'])
def get_group(group_id):
    group = next((g for g in groups_data if g["id"] == group_id), None)
    if group:
        return jsonify(group)
    return jsonify({"error": "Group not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)