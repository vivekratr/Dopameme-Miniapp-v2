from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from src.pipeline import Genrate
app = Flask(__name__)
CORS(app)


draw1 = Genrate.GenPhoto()


@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

    
@app.route("/imgen", methods=["POST"])
def make_image():
    try:
        data = request.json
        toptext, bottomtext = draw1.genimg(data["prompt"], normal=True)
        link_preview, link_download = draw1.drawimage(toptext, bottomtext, normal=True)
        return jsonify({"link_preview": link_preview, "link_download": link_download})
    except Exception as e:
        return jsonify({"error": "Error generating image"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0")
    