import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics import accuracy_score
from matplotlib.colors import ListedColormap

from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier

import os
import joblib
import time



# logistic regression
def func_logisticRegression(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].value

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)
    
    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    classifier = LogisticRegression(random_state = 0)
    classifier.fit(X_train, y_train)

    output_path = os.path.join(PROCESSED_FOLDER, 'c1_model.joblib')
    joblib.dump(classifier, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'c1.py')
    with open(output_path2, "w") as f:
        f.write("""
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import os
import joblib
                                
dataset = pd.read_csv(filepath)
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].value

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

classifier = LogisticRegression(random_state = 0)
classifier.fit(X_train, y_train)

output_path = os.path.join(PROCESSED_FOLDER, 'c1_model.joblib')
joblib.dump(classifier, output_path)
                """)

    return [output_path, output_path2]


# knn
def func_kNearestNeighbors(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    classifier = KNeighborsClassifier(n_neighbors = 5, metric = 'minkowski', p = 2)
    classifier.fit(X_train, y_train)

    output_path = os.path.join(PROCESSED_FOLDER, 'c2_model.joblib')
    joblib.dump(classifier, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'c2.py')
    with open(output_path2, "w") as f:
        f.write("""
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import os
import joblib
                
dataset = pd.read_csv(filepath)
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

classifier = KNeighborsClassifier(n_neighbors = 5, metric = 'minkowski', p = 2)
classifier.fit(X_train, y_train)

output_path = os.path.join(PROCESSED_FOLDER, 'c2_model.joblib')
joblib.dump(classifier, output_path)
                """)

    return [output_path, output_path2]


#svm
def func_supportVectorMachine(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    classifier = SVC(kernel = 'linear', random_state = 0)
    classifier.fit(X_train, y_train)

    output_path = os.path.join(PROCESSED_FOLDER, 'c3_model.joblib')
    joblib.dump(classifier, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'c3.py')
    with open(output_path2, "w") as f:
        f.write("""
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
import os
import joblib
                
dataset = pd.read_csv(filepath)
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

classifier = SVC(kernel = 'linear', random_state = 0)
classifier.fit(X_train, y_train)

output_path = os.path.join(PROCESSED_FOLDER, 'c3_model.joblib')
joblib.dump(classifier, output_path)
                """)

    return [output_path, output_path2]


# kernel svm
def func_kernelSupportVectorMachine(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    classifier = SVC(kernel = 'rbf', random_state = 0)
    classifier.fit(X_train, y_train)

    output_path = os.path.join(PROCESSED_FOLDER, 'c4_model.joblib')
    joblib.dump(classifier, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'c4.py')
    with open(output_path2, "w") as f:
        f.write("""
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
import os
import joblib

dataset = pd.read_csv(filepath)
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

classifier = SVC(kernel = 'rbf', random_state = 0)
classifier.fit(X_train, y_train)

output_path = os.path.join(PROCESSED_FOLDER, 'c4_model.joblib')
joblib.dump(classifier, output_path)                
                """)

    return [output_path, output_path2]


# naive bayes
def func_naiveBayes(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    classifier = GaussianNB()
    classifier.fit(X_train, y_train)

    output_path = os.path.join(PROCESSED_FOLDER, 'c5_model.joblib')
    joblib.dump(classifier, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'c5.py')
    with open(output_path2, "w") as f:
        f.write("""
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
import os
import joblib
                
dataset = pd.read_csv(filepath)
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

classifier = GaussianNB()
classifier.fit(X_train, y_train)

output_path = os.path.join(PROCESSED_FOLDER, 'c5_model.joblib')
joblib.dump(classifier, output_path)
                """)

    return [output_path, output_path2]


# decision tree classification
# def func_decisionTreeClassifier(filepath, PROCESSED_FOLDER):
def func_decisionTreeClassifier(arr):
    filepath = arr[0]
    PROCESSED_FOLDER = arr[1]
    ind = arr[2]
    miss = arr[3]
    cat = arr[4]
    cat2 = arr[5]
    split = arr[6]
    scale = arr[7]
    crit = arr[8]
    rs = arr[9]

    s = '''
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
'''

    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, ind:-1].values
    y = dataset.iloc[:, -1].values

    s += f'''
dataset = pd.read_csv(filepath)
X = dataset.iloc[:, {ind}:-1].values
y = dataset.iloc[:, -1].values
'''
    if miss == 1:
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
    if cat2 == 1:
        le = LabelEncoder()
        y = le.fit_transform(y)
        s+= '''
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
y = le.fit_transform(y)
'''

    if split == 1:
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = rs)
        s+= f'''
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = {rs})
'''
    else:
        X_train = X
        X_test = X
        y_train = y
        y_test = y

    if scale == 1:
        sc = StandardScaler()
        X_train = sc.fit_transform(X_train)
        X_test = sc.transform(X_test)
        s += f'''
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)
'''

    classifier = DecisionTreeClassifier(criterion = crit, random_state = rs)
    classifier.fit(X_train, y_train)

    y_pred = classifier.predict(X_test)
    acc = 'Accuracy score = ' + str(round(accuracy_score(y_test, y_pred)*100,2)) + '%'
    

    output_path = os.path.join(PROCESSED_FOLDER, 'c6_model.joblib')
    joblib.dump(classifier, output_path)

    timestamp = int(time.time())
    plot_path = os.path.join(PROCESSED_FOLDER, f'c6_plot_{timestamp}.png')
    X_set, y_set = sc.inverse_transform(X_test), y_test
    X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 10, stop = X_set[:, 0].max() + 10, step = 0.25),
                        np.arange(start = X_set[:, 1].min() - 1000, stop = X_set[:, 1].max() + 1000, step = 0.25))
    plt.contourf(X1, X2, classifier.predict(sc.transform(np.array([X1.ravel(), X2.ravel()]).T)).reshape(X1.shape),
                alpha = 0.75, cmap = ListedColormap(('red', 'green')))
    plt.xlim(X1.min(), X1.max())
    plt.ylim(X2.min(), X2.max())
    for i, j in enumerate(np.unique(y_set)):
        plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1], c = ListedColormap(('red', 'green'))(i), label = j)
    plt.title('Decision Tree Classification (Test set)')
    plt.xlabel('Age')
    plt.ylabel('Estimated Salary')
    plt.legend()
    plt.savefig(plot_path)
    plt.close()

    s+= f'''
from sklearn.tree import DecisionTreeClassifier
classifier = DecisionTreeClassifier(criterion = '{crit}', random_state = {rs})
classifier.fit(X_train, y_train)

y_pred = classifier.predict(X_test)
from sklearn.metrics import accuracy_score
accuracy_score(y_test, y_pred)

import joblib
import os
output_path = os.path.join(PROCESSED_FOLDER, 'c6_model.joblib')
joblib.dump(classifier, output_path)

import time
from matplotlib.colors import ListedColormap
timestamp = int(time.time())
plot_path = os.path.join(PROCESSED_FOLDER, f'c6_plot_timestamp.png')
X_set, y_set = sc.inverse_transform(X_test), y_test
X1, X2 = np.meshgrid(np.arange(start = X_set[:, 0].min() - 10, stop = X_set[:, 0].max() + 10, step = 0.25),
                    np.arange(start = X_set[:, 1].min() - 1000, stop = X_set[:, 1].max() + 1000, step = 0.25))
plt.contourf(X1, X2, classifier.predict(sc.transform(np.array([X1.ravel(), X2.ravel()]).T)).reshape(X1.shape),
            alpha = 0.75, cmap = ListedColormap(('red', 'green')))
plt.xlim(X1.min(), X1.max())
plt.ylim(X2.min(), X2.max())
for i, j in enumerate(np.unique(y_set)):
    plt.scatter(X_set[y_set == j, 0], X_set[y_set == j, 1], c = ListedColormap(('red', 'green'))(i), label = j)
plt.title('Decision Tree Classification (Test set)')
plt.xlabel('Age')
plt.ylabel('Estimated Salary')
plt.legend()
plt.show()
'''

    output_path2 = os.path.join(PROCESSED_FOLDER, 'c6.py')
    with open(output_path2, "w") as f:
        f.write(s)

    # plot_path = os.path.join(PROCESSED_FOLDER, f'r3_plot.png')
    return [output_path, output_path2, acc, plot_path]

# random forest classification
def func_randomForestClassifier(filepath, PROCESSED_FOLDER):
    dataset = pd.read_csv(filepath)
    X = dataset.iloc[:, :-1].values
    y = dataset.iloc[:, -1].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    classifier = RandomForestClassifier(n_estimators = 10, criterion = 'entropy', random_state = 0)
    classifier.fit(X_train, y_train)

    output_path = os.path.join(PROCESSED_FOLDER, 'c7_model.joblib')
    joblib.dump(classifier, output_path)

    output_path2 = os.path.join(PROCESSED_FOLDER, 'c7.py')
    with open(output_path2, "w") as f:
        f.write("""
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import os
import joblib
                
dataset = pd.read_csv(filepath)
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

classifier = RandomForestClassifier(n_estimators = 10, criterion = 'entropy', random_state = 0)
classifier.fit(X_train, y_train)

output_path = os.path.join(PROCESSED_FOLDER, 'c7_model.joblib')
joblib.dump(classifier, output_path)
                """)

    return [output_path, output_path2]