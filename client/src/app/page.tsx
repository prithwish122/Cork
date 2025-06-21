"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { toast, Toaster } from "sonner"
import { Upload, File, Save, ClipboardCopy, Trash2 } from "lucide-react"

// Replace these with your own UI components or use shadcn/ui
function Button({ children, ...props }: any) {
  return (
    <button
      className="px-4 py-2 rounded bg-orange-600 hover:bg-orange-700 text-white font-semibold transition"
      {...props}
    >
      {children}
    </button>
  )
}
function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <button
      className={`w-10 h-6 rounded-full transition relative ${checked ? "bg-orange-500" : "bg-gray-700"}`}
      onClick={() => onCheckedChange(!checked)}
      type="button"
      aria-pressed={checked}
    >
      <span
        className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition ${checked ? "translate-x-4" : ""}`}
      />
    </button>
  )
}
function Select({ value, onChange, children }: any) {
  return (
    <select
      className="w-full px-3 py-2 rounded bg-black/40 text-orange-200 border border-orange-400 focus:outline-none"
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  )
}
const Textarea = React.forwardRef<HTMLTextAreaElement, any>(({ value, onChange, ...props }, ref) => (
  <textarea
    ref={ref}
    className="w-full h-full bg-black/70 text-orange-200 p-4 rounded font-mono resize-none focus:outline-none"
    value={value}
    onChange={onChange}
    {...props}
  />
))
Textarea.displayName = "Textarea"

const algorithmOptions = [
  { label: "Classification", value: "classification", category: "classification" },
  { label: "Regression", value: "regression", category: "regression" },
]

export default function Dashboard() {
  const [code, setCode] = useState("")
  const [options, setOptions] = useState({
    importLibraries: true,
    dropFirstColumn: true,
    handleMissingData: false,
    categoricalData: false,
    splitDataset: true,
    performScaling: true,
  })
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("")
  const [algorithmCategory, setAlgorithmCategory] = useState<"" | "classification" | "regression">("")
  const [isRunning, setIsRunning] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [datasetInfo, setDatasetInfo] = useState<{
    fileName: string
    rows: number
    columns: string[]
    preview: string[][]
  } | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const parseCSV = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim())
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
    const rows = lines.slice(1, 6).map((line) => line.split(",").map((cell) => cell.trim().replace(/"/g, "")))
    return { headers, rows, totalRows: lines.length - 1 }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast.error("Please upload a CSV file.")
      return
    }

    setIsUploading(true)
    try {
      const text = await file.text()
      const { headers, rows, totalRows } = parseCSV(text)

      setUploadedFile(file)
      setDatasetInfo({
        fileName: file.name,
        rows: totalRows,
        columns: headers,
        preview: rows,
      })

      toast.success(`Dataset uploaded: ${file.name} (${totalRows} rows, ${headers.length} columns)`)
    } catch (error) {
      toast.error("Could not parse the CSV file. Please check the format.")
    } finally {
      setIsUploading(false)
    }
  }

  const generateCode = () => {
    let generatedCode = ""

    // Add dataset loading code if file is uploaded
    if (datasetInfo) {
      generatedCode += `# Load dataset
dataset = pd.read_csv('${datasetInfo.fileName}')
print(f"Dataset shape: {dataset.shape}")
print(f"Dataset info:")
print(dataset.info())

`
    }

    if (options.importLibraries) {
      generatedCode += `from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import pandas as pd
import numpy as np

`
    }

    if (options.dropFirstColumn) {
      generatedCode += `# Drop first column
X = dataset.iloc[:, 1:-1].values
y = dataset.iloc[:, -1].values

`
    }

    if (options.handleMissingData) {
      generatedCode += `# Handle missing data
imputer = SimpleImputer(missing_values=np.nan, strategy='mean')
X = imputer.fit_transform(X)

`
    }

    if (options.categoricalData) {
      generatedCode += `# Encode categorical data
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder(), [0])], remainder='passthrough')
X = np.array(ct.fit_transform(X))

`
    }

    if (options.splitDataset) {
      generatedCode += `# Split dataset into training and test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

`
    }

    if (options.performScaling) {
      generatedCode += `# Feature scaling
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

`
    }

    if (selectedAlgorithm && algorithmCategory) {
      if (algorithmCategory === "classification") {
        switch (selectedAlgorithm) {
          case "logistic-regression":
            generatedCode += `# Logistic Regression
from sklearn.linear_model import LogisticRegression
classifier = LogisticRegression(random_state=0)
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)
`
            break
          case "svm":
            generatedCode += `# Support Vector Machine
from sklearn.svm import SVC
classifier = SVC(kernel='rbf', random_state=0)
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)
`
            break
          case "decision-tree":
            generatedCode += `# Decision Tree Classification
from sklearn.tree import DecisionTreeClassifier
classifier = DecisionTreeClassifier(criterion='entropy', random_state=0)
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)
`
            break
          case "random-forest-classifier":
            generatedCode += `# Random Forest Classification
from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(n_estimators=10, criterion='entropy', random_state=0)
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)
`
            break
          case "naive-bayes":
            generatedCode += `# Naive Bayes
from sklearn.naive_bayes import GaussianNB
classifier = GaussianNB()
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)
`
            break
        }
      } else if (algorithmCategory === "regression") {
        switch (selectedAlgorithm) {
          case "linear-regression":
            generatedCode += `# Linear Regression
from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_train, y_train)
y_pred = regressor.predict(X_test)
`
            break
          case "polynomial-regression":
            generatedCode += `# Polynomial Regression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
poly_reg = PolynomialFeatures(degree=4)
X_poly = poly_reg.fit_transform(X_train)
regressor = LinearRegression()
regressor.fit(X_poly, y_train)
y_pred = regressor.predict(poly_reg.transform(X_test))
`
            break
          case "svr":
            generatedCode += `# Support Vector Regression
from sklearn.svm import SVR
regressor = SVR(kernel='rbf')
regressor.fit(X_train, y_train)
y_pred = regressor.predict(X_test)
`
            break
          case "decision-tree-regression":
            generatedCode += `# Decision Tree Regression
from sklearn.tree import DecisionTreeRegressor
regressor = DecisionTreeRegressor(random_state=0)
regressor.fit(X_train, y_train)
y_pred = regressor.predict(X_test)
`
            break
          case "random-forest-regression":
            generatedCode += `# Random Forest Regression
from sklearn.ensemble import RandomForestRegressor
regressor = RandomForestRegressor(n_estimators=10, random_state=0)
regressor.fit(X_train, y_train)
y_pred = regressor.predict(X_test)
`
            break
        }
      }
    }

    setCode(generatedCode)
  }

  const toggleOption = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleRunCode = async () => {
    setIsRunning(true)

    try {
      // Collect form data
      const formData = new FormData()

      // Add options
      Object.entries(options).forEach(([key, value]) => {
        formData.append(key, value.toString())
      })

      // Add algorithm selection
      if (selectedAlgorithm) {
        formData.append("selectedAlgorithm", selectedAlgorithm)
      }
      if (algorithmCategory) {
        formData.append("algorithmCategory", algorithmCategory)
      }

      // Add dataset file if uploaded
      if (uploadedFile) {
        formData.append("dataset", uploadedFile)
      }

      // Add generated code
      // formData.append("code", code)

      // Send to Flask backend
      const response = await fetch("http://localhost:5000/api/run-ml-pipeline", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        toast.success(result.message || "Machine learning pipeline executed successfully!")

        // If the Flask backend returns updated code or results, you can handle them here
        if (result.output) {
          console.log("Pipeline output:", result.output)
        }
      } else {
        toast.error(result.error || "Failed to execute pipeline")
      }
    } catch (error) {
      console.error("Error running ML pipeline:", error)
      toast.error("Failed to connect to the server. Please make sure your Flask backend is running.")
    } finally {
      setIsRunning(false)
    }
  }

  const handleSaveCode = () => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ml_code.py"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Your code has been downloaded as ml_code.py")
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success("Code has been copied to clipboard.")
    } catch (err) {
      toast.error("Could not copy code to clipboard.")
    }
  }

  const clearEditor = () => {
    setCode("")
    toast("Editor cleared", { description: "Code editor has been reset." })
  }

  // Handle algorithm selection and set category
  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedAlgorithm(value)
    const found = algorithmOptions.find((a) => a.value === value)
    setAlgorithmCategory(found ? (found.category as "classification" | "regression") : "")
  }

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      <Toaster richColors position="top-right" />
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://blobs.vusercontent.net/blob/dashboard-3BhNmjyox7QHJBLeSKZvEtMOm6TCMR.tsx')",
        }}
      />
      {/* Enhanced blur overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      {/* Main content */}
      <div className="relative z-10 p-6 h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="flex items-center gap-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <Button>
              <Upload className="inline mr-2 w-5 h-5" />
              Upload Dataset
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={generateCode}>
              <File className="inline mr-2 w-5 h-5" />
              Generate
            </Button>
            <Button onClick={handleSaveCode}>
              <Save className="inline mr-2 w-5 h-5" />
              Save
            </Button>
            <Button onClick={handleCopyCode}>
              <ClipboardCopy className="inline mr-2 w-5 h-5" />
              Copy
            </Button>
            <Button onClick={clearEditor}>
              <Trash2 className="inline mr-2 w-5 h-5" />
              Clear
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-orange-900 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              U
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex gap-6 relative">
          {/* Gemini Icon */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-7 z-20">
            <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center shadow-lg border-2 border-orange-900">
              {/* Gemini/star SVG */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 4C16.8 10.6667 21.3333 15.2 28 16C21.3333 16.8 16.8 21.3333 16 28C15.2 21.3333 10.6667 16.8 4 16C10.6667 15.2 15.2 10.6667 16 4Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          {/* Code Editor */}
          <motion.div
            className="flex-1 border-2 border-orange-500/50 rounded-lg bg-black/20 backdrop-blur-sm flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-orange-400/30">
              <span className="text-orange-300 font-semibold">Python Code</span>
              <span className="text-xs text-orange-400">{isRunning ? "Running..." : ""}</span>
            </div>
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={code}
                onChange={(e: any) => setCode(e.target.value)}
                spellCheck={false}
                placeholder="# Your generated code will appear here"
              />
            </div>
          </motion.div>

          {/* Dataset Info */}
          {datasetInfo && (
            <motion.div
              className="w-80 bg-black/30 backdrop-blur-sm rounded-lg p-6 flex flex-col gap-4 border-2 border-orange-500/40"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="text-orange-300 font-semibold mb-2">Dataset Info</div>
              <div className="text-orange-200 text-sm">
                <div>
                  <span className="font-bold">File:</span> {datasetInfo.fileName}
                </div>
                <div>
                  <span className="font-bold">Rows:</span> {datasetInfo.rows}
                </div>
                <div>
                  <span className="font-bold">Columns:</span> {datasetInfo.columns.length}
                </div>
              </div>
              <div className="mt-2">
                <div className="font-bold text-orange-400 text-xs mb-1">Preview:</div>
                <div className="overflow-x-auto">
                  <table className="text-xs text-orange-200 border-collapse w-full">
                    <thead>
                      <tr>
                        {datasetInfo.columns.map((col, i) => (
                          <th key={i} className="border-b border-orange-700 px-1 py-0.5 text-left">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {datasetInfo.preview.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} className="px-1 py-0.5">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* Options Panel */}
          <motion.div
            className="w-[520px] bg-black/50 backdrop-blur-sm rounded-lg p-6 flex flex-col gap-6 border-2 border-orange-500/40"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="text-orange-200 font-bold text-lg mb-4">Select your Options:</div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-orange-100 text-sm font-medium">
                  Import the main <span className="text-orange-400 font-semibold">libraries</span>
                </span>
                <Switch checked={options.importLibraries} onCheckedChange={() => toggleOption("importLibraries")} />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-orange-100 text-sm font-medium">
                  Drop <span className="text-orange-400 font-semibold">first column</span>
                </span>
                <Switch checked={options.dropFirstColumn} onCheckedChange={() => toggleOption("dropFirstColumn")} />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-orange-100 text-sm font-medium">
                  Take care of <span className="text-orange-400 font-semibold">missing</span> data
                </span>
                <Switch checked={options.handleMissingData} onCheckedChange={() => toggleOption("handleMissingData")} />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-orange-100 text-sm font-medium">
                  <span className="text-orange-400 font-semibold">Categorical data</span> present
                </span>
                <Switch checked={options.categoricalData} onCheckedChange={() => toggleOption("categoricalData")} />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-orange-100 text-sm font-medium">
                  Split dataset into <span className="text-orange-400 font-semibold">train & test</span>
                </span>
                <Switch checked={options.splitDataset} onCheckedChange={() => toggleOption("splitDataset")} />
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-orange-100 text-sm font-medium">
                  Perform <span className="text-orange-400 font-semibold">scaling</span>
                </span>
                <Switch checked={options.performScaling} onCheckedChange={() => toggleOption("performScaling")} />
              </div>
            </div>
            <div className="mt-6 p-4 bg-black/30 rounded-lg border border-orange-500/30">
              <div className="mb-3 text-orange-200 font-bold text-base">Choose Algorithm</div>
              <Select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
                <option value="">-- Select Algorithm --</option>
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
              </Select>
            </div>

            {/* Add Run button here */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleRunCode}
                disabled={isRunning}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition hover:scale-105"
              >
                {isRunning ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "🚀 Run Pipeline"
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
