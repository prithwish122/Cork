"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { toast, Toaster } from "sonner"
import { Upload, File, Save, ClipboardCopy, Trash2, Play } from "lucide-react"

// Replace these with your own UI components or use shadcn/ui
function Button({ children, ...props }: any) {
  return (
    <button
      className="px-4 py-2 rounded bg-orange-600 hover:bg-orange-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
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

const classificationAlgorithms = [
  { label: "Logistic Regression", value: "logistic-regression" },
  { label: "Support Vector Machine", value: "svm" },
  { label: "Decision Tree", value: "decision-tree" },
  { label: "Random Forest", value: "random-forest-classifier" },
  { label: "Naive Bayes", value: "naive-bayes" },
]

const regressionAlgorithms = [
  { label: "Linear Regression", value: "linear-regression" },
  { label: "Polynomial Regression", value: "polynomial-regression" },
  { label: "Support Vector Regression", value: "svr" },
  { label: "Decision Tree Regression", value: "decision-tree-regression" },
  { label: "Random Forest Regression", value: "random-forest-regression" },
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
  const [algorithmCategory, setAlgorithmCategory] = useState("")
  const [showAlgorithmOptions, setShowAlgorithmOptions] = useState(false)
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

  // Form data state to collect all selections
  const [formData, setFormData] = useState({
    dataset: null as File | null,
    options: {
      importLibraries: true,
      dropFirstColumn: false,
      handleMissingData: false,
      categoricalData: false,
      splitDataset: false,
      performScaling: false,
    },
    algorithmCategory: "",
    generatedCode: "",
  })

  const [categoricalInput, setCategoricalInput] = useState("")
  const [categoricalTargetPresent, setCategoricalTargetPresent] = useState(false)
  const [polynomialDegree, setPolynomialDegree] = useState("2")
  const [regressionRandomState, setRegressionRandomState] = useState("")
  const [decisionTreeCriterion, setDecisionTreeCriterion] = useState("gini")
  const [classificationRandomState, setClassificationRandomState] = useState("")
  const [backendOutput, setBackendOutput] = useState("")

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

      // Update form data
      setFormData((prev) => ({
        ...prev,
        dataset: file,
      }))

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
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import r2_score, accuracy_score
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
      const integerData = categoricalInput ? `, [${categoricalInput}]` : ", [0]"
      generatedCode += `# Encode categorical data
ct = ColumnTransformer(transformers=[('encoder', OneHotEncoder()${integerData})], remainder='passthrough')
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
classifier = LogisticRegression(random_state=0)
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")
`
            break
          case "decision-tree":
            const randomState = classificationRandomState || "0"
            generatedCode += `# Decision Tree Classification
classifier = DecisionTreeClassifier(criterion='${decisionTreeCriterion}', random_state=${randomState})
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")
`
            break
        }
      } else if (algorithmCategory === "regression") {
        switch (selectedAlgorithm) {
          case "linear-regression":
            generatedCode += `# Linear Regression
regressor = LinearRegression()
regressor.fit(X_train, y_train)
y_pred = regressor.predict(X_test)
r2 = r2_score(y_test, y_pred)
print(f"R² Score: {r2}")
`
            break
          case "polynomial-regression":
            const randomState = regressionRandomState || "0"
            generatedCode += `# Polynomial Regression
poly_reg = PolynomialFeatures(degree=${polynomialDegree})
X_poly = poly_reg.fit_transform(X_train)
regressor = LinearRegression()
regressor.fit(X_poly, y_train)
y_pred = regressor.predict(poly_reg.transform(X_test))
r2 = r2_score(y_test, y_pred)
print(f"R² Score: {r2}")
print(f"Polynomial Degree: ${polynomialDegree}")
print(f"Random State: ${randomState}")
`
            break
        }
      }
    }

    setCode(generatedCode)

    // Update form data with generated code
    setFormData((prev) => ({
      ...prev,
      generatedCode: generatedCode,
    }))
  }

  const toggleOption = (key: keyof typeof options) => {
    const newOptions = { ...options, [key]: !options[key] }
    setOptions(newOptions)

    // Update form data
    setFormData((prev) => ({
      ...prev,
      options: newOptions,
    }))
  }

  const handleRunCode = async () => {
    if (!formData.dataset) {
      toast.error("Please upload a dataset first.")
      return
    }

    setIsRunning(true)

    try {
      // Create FormData object for file upload
      const apiFormData = new FormData()

      // Add the dataset file
      if (formData.dataset) {
        apiFormData.append("dataset", formData.dataset)
      }

      // Add other form data as JSON
      apiFormData.append("options", JSON.stringify(formData.options))
      apiFormData.append("algorithmCategory", formData.algorithmCategory)
      apiFormData.append("selectedAlgorithm", selectedAlgorithm)
      apiFormData.append("generatedCode", formData.generatedCode)
      apiFormData.append("categoricalInput", categoricalInput)
      apiFormData.append("categoricalTargetPresent", categoricalTargetPresent.toString())
      apiFormData.append("polynomialDegree", polynomialDegree)
      apiFormData.append("regressionRandomState", regressionRandomState)
      apiFormData.append("decisionTreeCriterion", decisionTreeCriterion)
      apiFormData.append("classificationRandomState", classificationRandomState)

      // Make API call to Flask backend
      const response = await fetch("/api/process-ml", {
        method: "POST",
        body: apiFormData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setBackendOutput(JSON.stringify(result, null, 2))
      toast.success("Machine learning pipeline processed successfully!")
      console.log("Backend response:", result)
    } catch (error) {
      console.error("Error processing ML pipeline:", error)
      setBackendOutput(`Error: ${error.message}`)
      toast.error("Failed to process machine learning pipeline. Please check your Flask backend.")
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
    setFormData((prev) => ({
      ...prev,
      generatedCode: "",
    }))
    toast("Editor cleared", { description: "Code editor has been reset." })
  }

  const handleAlgorithmCategorySelect = (category: "classification" | "regression") => {
    setAlgorithmCategory(category)
    setSelectedAlgorithm("")
    setShowAlgorithmOptions(false)

    // Update form data
    setFormData((prev) => ({
      ...prev,
      algorithmCategory: category,
      selectedAlgorithm: "",
    }))
  }

  const handleAlgorithmSelect = (algorithm: string) => {
    setSelectedAlgorithm(algorithm)

    // Update form data
    setFormData((prev) => ({
      ...prev,
      selectedAlgorithm: algorithm,
    }))
  }

  const handleChooseAlgorithmClick = () => {
    setShowAlgorithmOptions(true)
  }

  return (
    <div className="h-[130vh] relative font-sans">
      <Toaster richColors position="top-right" />
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      />
      {/* Blur overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 backdrop-blur-[0.5px]" />

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
            <Button disabled={isUploading}>
              <Upload className="inline mr-2 w-5 h-5" />
              {isUploading ? "Uploading..." : "Upload Dataset"}
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
              <span className="text-xs text-orange-400">{isRunning ? "Processing..." : ""}</span>
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
            <div className="p-4 border-t border-orange-400/30 flex justify-end">
              <Button onClick={handleRunCode} disabled={isRunning}>
                <Play className="inline mr-2 w-4 h-4" />
                {isRunning ? "Processing..." : "Run"}
              </Button>
            </div>
          </motion.div>

          {/* Backend Output */}
          {backendOutput && (
            <motion.div
              className="w-80 bg-black/30 backdrop-blur-sm rounded-lg p-4 flex flex-col gap-4 border-2 border-orange-500/40"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="text-orange-300 font-semibold mb-2">Backend Output</div>
              <div className="flex-1">
                <textarea
                  className="w-full h-64 bg-black/70 text-orange-200 p-3 rounded font-mono resize-none focus:outline-none text-sm"
                  value={backendOutput}
                  readOnly
                  placeholder="Backend output will appear here..."
                />
              </div>
            </motion.div>
          )}

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
            className="w-[520px] bg-black/30 backdrop-blur-sm rounded-lg p-6 flex flex-col gap-6 border-2 border-orange-500/40"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="text-orange-300 font-semibold mb-2">Select your Options:</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-orange-400">Import the main libraries</span>
                <Switch checked={options.importLibraries} onCheckedChange={() => toggleOption("importLibraries")} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-400">Drop first column</span>
                <Switch checked={options.dropFirstColumn} onCheckedChange={() => toggleOption("dropFirstColumn")} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-400">Take care of missing data</span>
                <Switch checked={options.handleMissingData} onCheckedChange={() => toggleOption("handleMissingData")} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-400">Categorical feature present</span>
                <Switch checked={options.categoricalData} onCheckedChange={() => toggleOption("categoricalData")} />
              </div>
              {options.categoricalData && (
                <div className="ml-4 mt-2">
                  <label className="block text-orange-400 text-sm mb-1">Enter integer data:</label>
                  <input
                    type="number"
                    value={categoricalInput}
                    onChange={(e) => setCategoricalInput(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-black/40 text-orange-200 border border-orange-400 focus:outline-none"
                    placeholder="Enter integer value"
                  />
                </div>
              )}
              <div className="flex items-center justify-between ">
                <span className="text-orange-400">Categorical target present</span>
                <Switch checked={categoricalTargetPresent} onCheckedChange={setCategoricalTargetPresent} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-400">Split dataset into train & test</span>
                <Switch checked={options.splitDataset} onCheckedChange={() => toggleOption("splitDataset")} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-400">Perform scaling</span>
                <Switch checked={options.performScaling} onCheckedChange={() => toggleOption("performScaling")} />
              </div>
            </div>

            {/* Algorithm Selection */}
            <div className="">
              

              <div className="mb-3 text-orange-300 font-semibold">Choose Algorithm</div>
              <Select
                value={algorithmCategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const value = e.target.value
                  setAlgorithmCategory(value)
                  setSelectedAlgorithm("")
                  setFormData((prev) => ({
                    ...prev,
                    algorithmCategory: value,
                  }))
                }}
              >
                <option value="">-- Select Algorithm Type --</option>
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
              </Select>

              {/* Regression Options */}
              {algorithmCategory === "regression" && (
                <div className="mt-4 space-y-3">
                  <div className="text-orange-300 font-semibold text-sm">Regression Options:</div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="linear-reg"
                      name="regression-type"
                      value="linear"
                      checked={selectedAlgorithm === "linear-regression"}
                      onChange={() => handleAlgorithmSelect("linear-regression")}
                      className="text-orange-500"
                    />
                    <label htmlFor="linear-reg" className="text-orange-400">
                      Linear Regression
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="poly-reg"
                      name="regression-type"
                      value="polynomial"
                      checked={selectedAlgorithm === "polynomial-regression"}
                      onChange={() => handleAlgorithmSelect("polynomial-regression")}
                      className="text-orange-500"
                    />
                    <label htmlFor="poly-reg" className="text-orange-400">
                      Polynomial Regression
                    </label>
                  </div>

                  {selectedAlgorithm === "polynomial-regression" && (
                    <div className="ml-6 space-y-3">
                      <div>
                        <label className="block text-orange-400 text-sm mb-1">Degree:</label>
                        <Select value={polynomialDegree} onChange={(e: { target: { value: React.SetStateAction<string> } }) => setPolynomialDegree(e.target.value)}>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-orange-400 text-sm mb-1">Random State:</label>
                        <input
                          type="text"
                          value={regressionRandomState}
                          onChange={(e) => setRegressionRandomState(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-black/40 text-orange-200 border border-orange-400 focus:outline-none"
                          placeholder="Enter random state"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Classification Options */}
              {algorithmCategory === "classification" && (
                <div className="mt-4 space-y-3">
                  <div className="text-orange-300 font-semibold text-sm">Classification Options:</div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="logistic-reg"
                      name="classification-type"
                      value="logistic"
                      checked={selectedAlgorithm === "logistic-regression"}
                      onChange={() => handleAlgorithmSelect("logistic-regression")}
                      className="text-orange-500"
                    />
                    <label htmlFor="logistic-reg" className="text-orange-400">
                      Logistic Regression
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="decision-tree"
                      name="classification-type"
                      value="decision-tree"
                      checked={selectedAlgorithm === "decision-tree"}
                      onChange={() => handleAlgorithmSelect("decision-tree")}
                      className="text-orange-500"
                    />
                    <label htmlFor="decision-tree" className="text-orange-400">
                      Decision Tree Classifier
                    </label>
                  </div>

                  {selectedAlgorithm === "decision-tree" && (
                    <div className="ml-6 space-y-3">
                      <div>
                        <label className="block text-orange-400 text-sm mb-1">Criterion:</label>
                        <Select
                          value={decisionTreeCriterion}
                          onChange={(e: { target: { value: React.SetStateAction<string> } }) => setDecisionTreeCriterion(e.target.value)}
                        >
                          <option value="gini">gini</option>
                          <option value="entropy">entropy</option>
                          <option value="log_loss">log_loss</option>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-orange-400 text-sm mb-1">Random State:</label>
                        <input
                          type="text"
                          value={classificationRandomState}
                          onChange={(e) => setClassificationRandomState(e.target.value)}
                          className="w-full px-3 py-2 rounded bg-black/40 text-orange-200 border border-orange-400 focus:outline-none"
                          placeholder="Enter random state"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Form Data Summary */}
            <div className="mt-4 p-3 bg-black/40 rounded border border-orange-500/30">
              <div className="text-orange-300 font-semibold text-sm mb-2">Current Selection:</div>
              <div className="text-xs text-orange-200 space-y-1">
                <div>Dataset: {formData.dataset ? formData.dataset.name : "None"}</div>
                <div>Algorithm Type: {formData.algorithmCategory || "None selected"}</div>
                <div>Options: {Object.entries(formData.options).filter(([_, value]) => value).length} enabled</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
