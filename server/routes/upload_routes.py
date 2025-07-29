from flask import Blueprint, request, jsonify
import os
from algos import regression, classification
import json
from dotenv import load_dotenv
# load_dotenv()
# mongo_pass = os.getenv("mongo_pass")
# from pymongo import MongoClient
# import gridfs
# import certifi
# from pymongo.server_api import ServerApi

upload_bp = Blueprint('upload', __name__)
PROCESSED_FOLDER = "D:\\buffer_\\uploads"

# uri = "mongodb+srv://pranithdutta26:"+mongo_pass+"@users.gcqvzvl.mongodb.net/?retryWrites=true&w=majority&appName=Users"
# client = MongoClient(uri, server_api=ServerApi('1'), tlsCAFile=certifi.where())
# db = client["test1"]
# fs = gridfs.GridFS(db)

@upload_bp.route('/upload', methods=['POST'])
def upload():
    try:
        file = request.files.get('dataset')
        options_json = request.form.get('options')
        selected_algorithm = request.form.get('selectedAlgorithm')
        categorical_input = request.form.get('categoricalInput')
        print(categorical_input)
        categorical_target_present = request.form.get('categoricalTargetPresent') == 'true'

        # polynomial_degree = request.form.get('polynomialDegree')
        # regression_random_state = int(request.form.get('regressionRandomState'))
        # decision_tree_criterion = request.form.get('decisionTreeCriterion')
        # classification_random_state = int(request.form.get('classificationRandomState'))

        # dropOption = request.form.get('dropOption')
        # missOption = request.form.get('missOption')
        # colNum = int(request.form.get('colNum'))
        # caty = request.form.get('cat2')
        # splitOption = request.form.get('splitOption')
        # scaleOption = request.form.get('scaleOption')
        # option = request.form.get('option')
        optionType = 'lol'

        if not file:
            return jsonify({'error': 'No file uploaded'}), 400

        # file_id = fs.put(file, filename=file.filename, content_type='text/csv')
        # print(f"CSV uploaded successfully! File ID: {file_id}")
        # file.seek(0)
        
        try:
            options = json.loads(options_json)
        except json.JSONDecodeError:
            return jsonify({'error': 'Invalid options format'}), 400

        import_libraries = options.get('importLibraries', False)
        drop_first_column = options.get('dropFirstColumn', False)
        handle_missing_data = options.get('handleMissingData', False)
        categorical_data = options.get('categoricalData', False)
        split_dataset = options.get('splitDataset', False)
        perform_scaling = options.get('performScaling', False)

        arr = [
            file,
            PROCESSED_FOLDER,
            drop_first_column,
            handle_missing_data,
            int(categorical_input) if categorical_input!='' else -1,
            categorical_target_present,
            # categorical_data,
            split_dataset,
            perform_scaling]
        #     polynomial_degree,
        #     selected_algorithm,
        #     regression_random_state,
        #     decision_tree_criterion,
        #     classification_random_state,
        #     
        # ]

        output_path = 'ans'
        # if selected_algorithm == 'regression':
        #     optionType = request.form.get('regressionType')
        # elif selected_algorithm == 'classification':
        #     optionType = request.form.get('classificationType')

        # arr = [file, PROCESSED_FOLDER]
        # arr.append(int(dropOption[-1]))
        # arr.append(int(missOption[-1]))
        # arr.append(colNum)
        # arr.append(int(caty[-1]))
        # arr.append(int(splitOption[-1]))
        # arr.append(int(scaleOption[-1]))
            
        if selected_algorithm == 'polynomial-regression':
            polynomial_degree = int(request.form.get('polynomialDegree'))
            regression_random_state = int(request.form.get('regressionRandomState'))
            arr.append(polynomial_degree)
            arr.append(regression_random_state)
            output_path = regression.func_polynomialRegression(arr)
        elif selected_algorithm == 'decision-tree':
            decision_tree_criterion = request.form.get('decisionTreeCriterion')
            classification_random_state = int(request.form.get('classificationRandomState'))
            arr.append(decision_tree_criterion)
            arr.append(classification_random_state)
            output_path = classification.func_decisionTreeClassifier(arr)

        # if option == 'regression':
        #     if optionType == 'r1':
        #         output_path = regression.func_linearRegression(file, PROCESSED_FOLDER)
        #     elif optionType == 'r2':
        #         output_path = regression.func_multipleLinearRegression(file, PROCESSED_FOLDER)
        #     elif optionType == 'r3':
                # deg = int(request.form.get('polyreg_deg')[-1])
                # rs = int(request.form.get('polyreg_rs')[-1])
                # if rs != 0:
                #     rs = 42
        #         arr.append(polynomial_degree)
        #         arr.append(regression_random_state)
        #         output_path = regression.func_polynomialRegression(arr)
        #     elif optionType == 'r4':
        #         output_path = regression.func_svr(file, PROCESSED_FOLDER)
        #     elif optionType == 'r5':
        #         output_path = regression.func_decisionTreeRegression(file, PROCESSED_FOLDER)
        #     else:
        #         output_path = regression.func_randomForestRegression(file, PROCESSED_FOLDER)

        # elif option == 'classification':
        #     if optionType == 'c1':
        #         output_path = classification.func_logisticRegression(file, PROCESSED_FOLDER)
        #     elif optionType == 'c2':
        #         output_path = classification.func_kNearestNeighbors(file, PROCESSED_FOLDER)
        #     elif optionType == 'c3':
        #         output_path = classification.func_supportVectorMachine(file, PROCESSED_FOLDER)
        #     elif optionType == 'c4':
        #         output_path = classification.func_kernelSupportVectorMachine(file, PROCESSED_FOLDER)
        #     elif optionType == 'c5':
        #         output_path = classification.func_naiveBayes(file, PROCESSED_FOLDER)
        #     elif optionType == 'c6':
                # crit = request.form.get('dtclass_crit')
                # rs = int(request.form.get('dtclass_rs')[-1])
                # if rs != 0:
                #     rs = 42
            #     arr.append(decision_tree_criterion)
            #     arr.append(classification_random_state)
            #     output_path = classification.func_decisionTreeClassifier(arr)
            # else:
            #     output_path = classification.func_randomForestClassifier(file, PROCESSED_FOLDER)

        if len(output_path) == 1:
            return jsonify({'message': 'File processed', 'result': output_path[0]}), 200

        modelPath = output_path[0]
        rawFilePath = output_path[1]
        result = output_path[2]
        plotPath = output_path[3]
        s = output_path[4]

        return jsonify({
            'message': 'File processed',
            'modelPath': f'/download/{os.path.basename(modelPath)}',
            'rawFilePath': f'/download/{os.path.basename(rawFilePath)}',
            'result': result,
            'rawPyStr': s,
            'plot_path': f'/plot/{os.path.basename(plotPath)}'
        }), 200

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': str(e), 'message': 'An error occurred on the server.'}), 500
