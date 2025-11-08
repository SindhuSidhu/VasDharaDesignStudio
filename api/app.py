from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/generate-2d", methods=["POST"])
def generate_2d():
    data = request.json
    # Placeholder 2D plans
    return jsonify([
        {"id":"plan1","image":"../assets/modern1.jpg"},
        {"id":"plan2","image":"../assets/modern2.jpg"},
        {"id":"plan3","image":"../assets/modern3.jpg"}
    ])

@app.route("/generate-3d", methods=["POST"])
def generate_3d():
    plan_id = request.json.get('plan_id')
    return jsonify({"model_url":"../assets/modern1_3d.glb"})

if __name__=="__main__":
    app.run(debug=True)
