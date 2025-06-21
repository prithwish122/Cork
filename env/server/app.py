from flask import Flask
from flask_cors import CORS

from routes.upload_routes import upload_bp
from routes.download_routes import download_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(upload_bp)
app.register_blueprint(download_bp)

if __name__ == '__main__':
    app.run(debug=True)
