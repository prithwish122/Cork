from flask import Blueprint, send_from_directory, jsonify
import os

download_bp = Blueprint('download', __name__)
PROCESSED_FOLDER = "C:\\Users\\Prithwish\\OneDrive\\Desktop\\umm\\Hack4bengal_4.O\\uploads"

@download_bp.route('/download/<filename>')
def download(filename):
    print('download')
    path = os.path.join(PROCESSED_FOLDER, filename)
    if not os.path.exists(path):
        return jsonify({"error": "File not found"}), 404
    return send_from_directory(PROCESSED_FOLDER, filename, as_attachment=True)

@download_bp.route('/plot/<filename>')
def serve_plot(filename):
    return send_from_directory(PROCESSED_FOLDER, filename, mimetype='image/png')
