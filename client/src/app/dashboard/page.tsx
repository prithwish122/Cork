"use client"

import React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { toast, Toaster } from "sonner"
import { Upload, File, ClipboardCopy, Trash2, Play, Download, Brain } from "lucide-react"
import { UserButton } from "@civic/auth/react"

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

export default function Dashboard() {
  const [code, setCode] = useState("")
  const [pythonFile, setPythonFile] = useState("")
  const [plotPath, setPlotPath] = useState<string | null>(null)
  const [modelPath, setModelPath] = useState<string | null>(null)
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
    algorithmCategory: "classification",
  })

  const [categoricalInput, setCategoricalInput] = useState("")
  const [categoricalTargetPresent, setCategoricalTargetPresent] = useState(false)
  const [polynomialDegree, setPolynomialDegree] = useState("2")
  const [regressionRandomState, setRegressionRandomState] = useState("")
  const [decisionTreeCriterion, setDecisionTreeCriterion] = useState("gini")
  const [classificationRandomState, setClassificationRandomState] = useState("")

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
    // Clear any existing code when generating fresh
    setCode("")
    setPythonFile("")
    setPlotPath(null)
    setModelPath(null)
    toast.info("Use 'Run & Fetch' to get Python code from backend")
  }

  const toggleOption = (key: keyof typeof options) => {
    const newOptions = { ...options, [key]: !options[key] }
    setOptions(newOptions)

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
      const apiFormData = new FormData()

      if (formData.dataset) {
        apiFormData.append("dataset", formData.dataset)
      }

      apiFormData.append("options", JSON.stringify(formData.options))
      apiFormData.append("selectedAlgorithm", selectedAlgorithm)
      apiFormData.append("categoricalInput", categoricalInput)
      apiFormData.append("categoricalTargetPresent", categoricalTargetPresent.toString())
      apiFormData.append("polynomialDegree", polynomialDegree)
      apiFormData.append("regressionRandomState", regressionRandomState)
      apiFormData.append("decisionTreeCriterion", decisionTreeCriterion)
      apiFormData.append("classificationRandomState", classificationRandomState)

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: apiFormData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      // Handle rawPyStr from backend response
      if (result.rawPyStr) {
        const pythonCodeString =
          typeof result.rawPyStr === "string" ? result.rawPyStr : JSON.stringify(result.rawPyStr, null, 2)
        setPythonFile(pythonCodeString)
        setCode(pythonCodeString)
      } else if (result.python_code) {
        const pythonCodeString =
          typeof result.python_code === "string" ? result.python_code : JSON.stringify(result.python_code, null, 2)
        setPythonFile(pythonCodeString)
        setCode(pythonCodeString)
      } else if (result.code) {
        const codeString = typeof result.code === "string" ? result.code : JSON.stringify(result.code, null, 2)
        setPythonFile(codeString)
        setCode(codeString)
      } else {
        // If no specific code field, show the entire response
        const responseString = JSON.stringify(result, null, 2)
        setPythonFile(responseString)
        setCode(responseString)
      }

      // Handle plot path from backend response
      if (result.plot_path) {
        setPlotPath(result.plot_path)
      } else if (result.plotPath) {
        setPlotPath(result.plotPath)
      }

      // Handle model path from backend response
      if (result.modelPath) {
        setModelPath(result.modelPath)
      } else if (result.model_path) {
        setModelPath(result.model_path)
      }

      toast.success("Machine learning pipeline processed successfully!")
      console.log("Backend response:", result)
    } catch (error) {
      console.error("Error processing ML pipeline:", error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      toast.error("Failed to process machine learning pipeline. Please check your Flask backend.")
    } finally {
      setIsRunning(false)
    }
  }

  const handleSaveCode = () => {
    if (!pythonFile && !code) {
      toast.error("No Python code to save. Please generate or run code first.")
      return
    }

    const codeToSave = pythonFile || code
    const blob = new Blob([codeToSave], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "ml_pipeline.py"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Python file has been downloaded as ml_pipeline.py")
  }

  const handleCopyCode = async () => {
    const codeToSave = pythonFile || code
    if (!codeToSave) {
      toast.error("No code to copy.")
      return
    }

    try {
      await navigator.clipboard.writeText(codeToSave)
      toast.success("Code has been copied to clipboard.")
    } catch (err) {
      toast.error("Could not copy code to clipboard.")
    }
  }

  const clearEditor = () => {
    setCode("")
    setPythonFile("")
    setPlotPath(null)
    setModelPath(null)
    setFormData((prev) => ({
      ...prev,
      generatedCode: "",
    }))
    toast("Editor cleared", { description: "Code editor has been reset." })
  }

  const handleAlgorithmSelect = (algorithm: string) => {
    setSelectedAlgorithm(algorithm)

    setFormData((prev) => ({
      ...prev,
      selectedAlgorithm: algorithm,
    }))
  }

  const handleDownloadPlot = () => {
    if (!plotPath) {
      toast.error("No plot image to download.")
      return
    }

    try {
      window.location.href = `http://127.0.0.1:5000${plotPath}`
      toast.success("Plot download started!")
    } catch (error) {
      toast.error("Failed to download plot. Please check the plot path.")
    }
  }

  const handleDownloadModel = () => {
    if (!modelPath) {
      toast.error("No model available to download.")
      return
    }

    try {
      window.location.href = `http://127.0.0.1:5000${modelPath}`
      toast.success("Model download started!")
    } catch (error) {
      toast.error("Failed to download model. Please check the model path.")
    }
  }

  return (
    <div className="h-[100vh] relative font-sans">
      <Toaster richColors position="top-right" />
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Background.png')",
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
              <Download className="inline mr-2 w-5 h-5" />
              Download .py
            </Button>
            {plotPath && (
              <Button onClick={handleDownloadPlot}>
                <Download className="inline mr-2 w-5 h-5" />
                Download Plot
              </Button>
            )}
            {modelPath && (
              <Button onClick={handleDownloadModel}>
                <Brain className="inline mr-2 w-5 h-5" />
                Download Model
              </Button>
            )}
            <Button onClick={handleCopyCode}>
              <ClipboardCopy className="inline mr-2 w-5 h-5" />
              Copy
            </Button>
            <Button onClick={clearEditor}>
              <Trash2 className="inline mr-2 w-5 h-5" />
              Clear
            </Button>
          </div>
          <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block flex-shrink-0 ml-auto flex items-center gap-4"
            >
              {/* <Button > */}
                <UserButton className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-black font-semibold px-6 py-2 rounded-full shadow-lg shadow-orange-500/30 border-0" />
              {/* </Button> */}
            </motion.div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex gap-6 relative">
          {/* Gemini Icon */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-7 z-20">
            <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center shadow-lg border-2 border-orange-900">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 4C16.8 10.6667 21.3333 15.2 28 16C21.3333 16.8 16.8 21.3333 16 28C15.2 21.3333 10.6667 16.8 4 16C10.6667 15.2 15.2 10.6667 16 4Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          {/* Python Code Editor - Extended */}
          <motion.div
            className="flex-1 border-2 border-orange-500/50 rounded-lg bg-black/20 backdrop-blur-sm flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-orange-400/30 over">
              <span className="text-orange-300 font-semibold">Python Code (rawPyStr)</span>
              <div className="flex items-center gap-2">
                {pythonFile && (
                  <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded">Ready for download</span>
                )}
                {modelPath && (
                  <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded">Model ready</span>
                )}
                <span className="text-xs text-orange-400">{isRunning ? "Processing..." : ""}</span>
              </div>
            </div>
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={pythonFile || code}
                onChange={(e: { target: { value: any } }) => {
                  const newValue = e.target.value
                  setCode(newValue)
                  setPythonFile(newValue)
                }}
                className="w-full h-full bg-black/70 text-orange-200 p-4 rounded font-mono resize-none focus:outline-none border-0"
                spellCheck={false}
                placeholder="# rawPyStr from backend will appear here
# Upload a dataset and click 'Run & Fetch' to get the generated code"
              />
            </div>
            <div className="p-4 border-t border-orange-400/30 flex justify-between items-center">
              <div className="text-xs text-orange-400 flex items-center gap-4">
                <span>{pythonFile ? `${pythonFile.split("\n").length} lines` : "No code generated"}</span>
                {modelPath && <span className="text-blue-400">Model: {modelPath.split("/").pop()}</span>}
              </div>
              <Button onClick={handleRunCode} disabled={isRunning}>
                <Play className="inline mr-2 w-4 h-4" />
                {isRunning ? "Processing..." : "Run & Fetch"}
              </Button>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <div className="flex flex-col gap-6">
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

            {/* Plot Image Display */}
            {plotPath && (
              <motion.div
                className="w-80 bg-black/30 backdrop-blur-sm rounded-lg p-4 flex flex-col gap-4 border-2 border-orange-500/40"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <div className="text-orange-300 font-semibold mb-2">Matplotlib Plot</div>
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={`http://127.0.0.1:5000${plotPath}`}
                    alt="ML Plot"
                    className="max-w-full max-h-full object-contain rounded border border-orange-400/30"
                    style={{ maxHeight: "300px" }}
                    onError={(e) => {
                      console.error("Failed to load plot image:", plotPath)
                      toast.error("Failed to load plot image")
                    }}
                  />
                </div>
                <div className="flex justify-center">
                  <Button onClick={handleDownloadPlot} className="text-sm">
                    <Download className="inline mr-2 w-4 h-4" />
                    Download Plot
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Options Panel */}
          <motion.div
            className="w-[520px] bg-black/30 backdrop-blur-sm rounded-lg p-6 flex flex-col gap-6 border-2 border-orange-500/40"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="text-orange-300 font-semibold mb-2 overflow-hidden
" >Select your Options:</div>
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
              <div className="flex items-center justify-between">
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
                        <Select
                          value={polynomialDegree}
                          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                            setPolynomialDegree(e.target.value)
                          }
                        >
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
                          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                            setDecisionTreeCriterion(e.target.value)
                          }
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
                <div>Algorithm: {selectedAlgorithm || "None selected"}</div>
                <div>Options: {Object.entries(formData.options).filter(([_, value]) => value).length} enabled</div>
                {modelPath && <div className="text-blue-400">Model: Available for download</div>}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
