import numpy as np
import pandas as pd
# import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # Use Anti-Grain Geometry backend (no GUI)
import matplotlib.pyplot as plt


from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import PolynomialFeatures
from sklearn.metrics import r2_score
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder

from sklearn.linear_model import LinearRegression
from sklearn.svm import SVR
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor

import os
import joblib
import time


# linear regression -> FINAL
def func_linearRegression(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].values
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 1/3, random_state = 0)

    regressor = LinearRegression()
    regressor.fit(X_train, y_train)

    y_pred = regressor.predict(regressor.transform(X_test))

    r2s = r2_score(y_test, y_pred)

    output_path = os.path.join(PROCESSED_FOLDER, 'r1_model.joblib')
    joblib.dump(regressor, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'r1.py')
    with open(output_path2, "w") as f:
        f.write("""
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression 
import joblib
import os
                
dataset = pd.read_csv(filepath)
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values
    
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 1/3, random_state = 0)

regressor = LinearRegression()
regressor.fit(X_train, y_train)
                
y_pred = regressor.predict(regressor.transform(X_test))

r2s = r2_score(y_test, y_pred)

output_path = os.path.join(PROCESSED_FOLDER, 'r1_model.joblib')
joblib.dump(regressor, output_path)
    """)

    return [output_path, output_path2, r2s]


# multiple linear regression
def func_multipleLinearRegression(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].values

    ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [3])], remainder='passthrough')
    X = np.array(ct.fit_transform(X))

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

    regressor = LinearRegression()
    regressor.fit(X_train, y_train)

    output_path = os.path.join(PROCESSED_FOLDER, 'r2_model.joblib')
    joblib.dump(regressor, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'r2.py')
    with open(output_path2, "w") as f:
        f.write("""
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
import joblib
import os
                
dataset = pd.read_csv(filepath)
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [3])], remainder='passthrough')
X = np.array(ct.fit_transform(X))

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

regressor = LinearRegression()
regressor.fit(X_train, y_train)

output_path = os.path.join(PROCESSED_FOLDER, 'r2_model.joblib')
joblib.dump(regressor, output_path)                
                """)
        
    return [output_path, output_path2]


# polynomial regression -> FINAL
# def func_polynomialRegression(filepath, PROCESSED_FOLDER):
def func_polynomialRegression(arr):
    filepath = arr[0]
    PROCESSED_FOLDER = arr[1]
    ind = 0 if arr[2]==False else 1
    miss = arr[3]
    cat = arr[4]
    cat2 = arr[5]
    split = arr[6]
    scale = arr[7]
    deg = arr[8]
    rs = arr[9]

    s = '''
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
'''
    # try:
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, ind:-1].values
    y = dataset.iloc[:, -1].values

    s += f'''
dataset = pd.read_csv(filepath)
X = dataset.iloc[:, {ind}:-1].values
y = dataset.iloc[:, -1].values
'''

    if miss == True:
        imputer = SimpleImputer(missing_values = np.nan, strategy='mean') #replace msissing value by mean of that column
        imputer.fit(X[:, 1:3]) #including all numeric columns for filling missing data
        X[:, 1:3] = imputer.transform(X[:, 1:3])
        s += '''
from sklearn.impute import SimpleImputer
imputer = SimpleImputer(missing_values = np.nan, strategy='mean')
imputer.fit(X[:, 1:3])
X[:, 1:3] = imputer.transform(X[:, 1:3])
'''

    if cat!=-1:
        ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [cat])], remainder='passthrough')
        X = ct.fit_transform(X)
        s+= f'''
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [{cat}])], remainder='passthrough')
X = ct.fit_transform(X)
'''
    if cat2 == True:
        le = LabelEncoder()
        y = le.fit_transform(y)

    if split == True:
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = rs)
        s+= f'''
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = {rs})
'''
    else:
        X_train = X
        X_test = X
        y_train = y
        y_test = y

    # scaling
    if scale == True:
        sc = StandardScaler()
        X_train = sc.fit_transform(X_train)
        X_test = sc.transform(X_test)
        s += f'''
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)
'''

    
    poly_reg = PolynomialFeatures(degree = deg)
    X_poly = poly_reg.fit_transform(X_train)
    regressor = LinearRegression()
    regressor.fit(X_poly, y_train)

    y_pred = regressor.predict(poly_reg.transform(X_test))

    r2s = 'R^2 score = ' + str(round(r2_score(y_test, y_pred)*100,2)) + '%'

    output_path = os.path.join(PROCESSED_FOLDER, 'r3_model.joblib')
    joblib.dump(regressor, output_path)

    # plot_path = os.path.join(PROCESSED_FOLDER, 'r3_plot.png')
    timestamp = int(time.time())
    plot_path = os.path.join(PROCESSED_FOLDER, f'r3_plot_{timestamp}.png')
    plt.scatter(y_test, y_pred, color = 'red')
    plt.plot([min(y_test), max(y_test)], [min(y_test), max(y_test)], color='blue', linestyle='--')
    # plt.plot(y_test, y_pred, color = 'blue')
    plt.title('Polynomial Regression')
    plt.xlabel('Actual')
    plt.ylabel('Predicted')
    plt.savefig(plot_path)
    plt.close()

    s += f'''
from sklearn.preprocessing import PolynomialFeatures
poly_reg = PolynomialFeatures(degree = {deg})
X_poly = poly_reg.fit_transform(X_train)

from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_poly, y_train)

y_pred = regressor.predict(poly_reg.transform(X_test))

from sklearn.metrics import r2_score
r2s = 'R^2 score = ' + str(round(r2_score(y_test, y_pred)*100,2)) + '%'

import os
import joblib
output_path = os.path.join(PROCESSED_FOLDER, 'r3_model.joblib')
joblib.dump(regressor, output_path)

import time
timestamp = int(time.time())
plot_path = os.path.join(PROCESSED_FOLDER, f'r3_plot_timestamp.png')
plt.scatter(y_test, y_pred, color = 'red')
plt.plot([min(y_test), max(y_test)], [min(y_test), max(y_test)], color='blue', linestyle='--')
plt.title('Polynomial Regression')
plt.xlabel('Actual')
plt.ylabel('Predicted')
plt.show()
'''

    output_path2 = os.path.join(PROCESSED_FOLDER, 'r3.py')
    # save as separate strings like appending
    with open(output_path2, "w") as f:
        f.write(s)

    return [output_path, output_path2, r2s, plot_path]

    # except Exception as e:
    #     return [e]

# support vector regression -> FINAL
def func_svr(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, 1:-1].values
    y = dataset.iloc[:, -1].values
    y = y.reshape(len(y),1)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

    sc_X = StandardScaler()
    sc_y = StandardScaler()
    X_train = sc_X.fit_transform(X_train)
    y_train = sc_y.fit_transform(y_train)

    regressor = SVR(kernel = 'rbf')
    regressor.fit(X_train, y_train)

    y_pred = sc_y.inverse_transform(regressor.predict(sc_X.transform(X_test)).reshape(-1,1))

    r2s = r2_score(y_test, y_pred)

    output_path = os.path.join(PROCESSED_FOLDER, 'r4_model.joblib')
    joblib.dump(regressor, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'r4.py')
    with open(output_path2, "w") as f:
        f.write("""
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVR
import joblib
import os

dataset = pd.read_csv(filepath)
X = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, -1].values
y = y.reshape(len(y),1)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

sc_X = StandardScaler()
sc_y = StandardScaler()
X_train = sc_X.fit_transform(X_train)
y_train = sc_y.fit_transform(y_train)

regressor = SVR(kernel = 'rbf')
regressor.fit(X_train, y_train)

y_pred = sc_y.inverse_transform(regressor.predict(sc_X.transform(X_test)).reshape(-1,1))

r2s = r2_score(y_test, y_pred)

output_path = os.path.join(PROCESSED_FOLDER, 'r4_model.joblib')
joblib.dump(regressor, output_path)
""")

    return [output_path, output_path2, r2s]


# decision tree regression
def func_decisionTreeRegression(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, 1:-1].values
    y = dataset.iloc[:, -1].values

    regressor = DecisionTreeRegressor(random_state = 0)
    regressor.fit(X, y)

    output_path = os.path.join(PROCESSED_FOLDER, 'r5_model.joblib')
    joblib.dump(regressor, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'r5.py')
    with open(output_path2, "w") as f:
        f.write("""

import pandas as pd
from sklearn.tree import DecisionTreeRegressor
import os
import joblib
                
dataset = pd.read_csv(filepath)
X = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, -1].values

regressor = DecisionTreeRegressor(random_state = 0)
regressor.fit(X, y)

output_path = os.path.join(PROCESSED_FOLDER, 'r5_model.joblib')
joblib.dump(regressor, output_path)
""")

    return [output_path, output_path2]


#random forest regression
def func_randomForestRegression(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, 1:-1].values
    y = dataset.iloc[:, -1].values

    regressor = RandomForestRegressor(n_estimators = 10, random_state = 0)
    regressor.fit(X, y)

    output_path = os.path.join(PROCESSED_FOLDER, 'r6_model.joblib')
    joblib.dump(regressor, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'r6.py')
    with open(output_path2, "w") as f:
        f.write("""
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import os
import joblib

dataset = pd.read_csv(filepath)
X = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, -1].values

regressor = RandomForestRegressor(n_estimators = 10, random_state = 0)
regressor.fit(X, y)

output_path = os.path.join(PROCESSED_FOLDER, 'r6_model.joblib')
joblib.dump(regressor, output_path)
""")

    return [output_path, output_path2]