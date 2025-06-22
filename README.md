# Cork : A No-Code ML Model Building Platform
<img width="103" alt="corkLogo" src="https://github.com/user-attachments/assets/32deba3b-6fff-4c39-94a7-f43cc1a630c7"/>

Cork is a lightweight, no-code platform built to streamline machine learning model creation. It removes the need for writing boilerplate code—letting users focus on building and training models using intuitive configuration steps rather than typing scripts.

## 🎯Key Use Cases
- Interactive Learning & Experimentation : 
Newcomers can explore ML fundamentals by selecting datasets, choosing algorithms, and adjusting hyperparameters—all through guided, interactive steps. Cork provides real-time feedback on how changes impact model performance without exposing users to complex code.

- Rapid Prototype Building : 
Whether you're a business analyst, domain expert, or ML novice, Cork allows you to build functional models quickly—helping validate ideas in minutes without hiring data scientists or writing code.

## 🌍Why Cork Matters
- Democratizes ML: Opens the door for non-experts—business analysts, domain specialists—to build models without deep programming skills.

- Speeds Up Prototyping: Simplifies repetitive steps in data prep, model choice, and tuning, enabling you to go from idea to results quickly.

- Balances Simplicity & Control: Focuses on streamlined workflows—not full visual IDEs—so you stay closer to the code while still saving time.

---

## Here are some of the Glimpses of Cork

- Here is the Landing page of Cork

  ![WhatsApp Image 2025-06-22 at 7 35 19 AM (3)](https://github.com/user-attachments/assets/5fa76040-6117-44c9-9888-a0aca44d4ff1)

- Authorization

  ![WhatsApp Image 2025-06-22 at 7 35 19 AM (1)](https://github.com/user-attachments/assets/720625d3-15f7-42ed-b660-0828d2df8493)

- After authorization, on clicking the `Get Started` button, we move to the Home Screen which includes User Details, Community Projects, New Project creation, etc.

  <img width="1920" alt="ForYou_pg_wireframe_draft2" src="https://github.com/user-attachments/assets/faeba8d7-6487-40f8-a5b5-e89fba24536c" />

- On creating a New Project

  ![WhatsApp Image 2025-06-22 at 7 35 19 AM](https://github.com/user-attachments/assets/80333c56-b5ac-499e-8e2e-069a3dfe0c31)

- On uploading a Dataset

  ![WhatsApp Image 2025-06-22 at 7 35 19 AM (2)](https://github.com/user-attachments/assets/4b90566e-ff42-401b-9d00-b4e4597977b1)

- After selecting the required options, we run the model to generate downloadable `.py` file, the model (`.joblib`) & the plot png

  ![WhatsApp Image 2025-06-22 at 7 35 43 AM](https://github.com/user-attachments/assets/5af71358-941f-4e27-a7a3-4cd4625b3f93)




## ⚙️Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Git**: For cloning the repository.
* **Node.js & npm**: Required for the client-side development. You can download it from [nodejs.org](https://nodejs.org/).
* **Python & pip**: Required for the backend development. You can download it from [python.org](https://www.python.org/).

---

## 📁Project Structure

```
Cork/
├── client/                  # Contains the client-side (frontend) application files
│   ├── public/              # Contains all the UI elements required for the design
|   └── src/                 # Contains files for the main frontend functionality
|
├── env/                     # Environment-related configurations or a wrapper for the backend
│   └── server/              # Contains the backend application files
│       ├── algos/           # Python scripts implementing ML
│       ├── app.py           # The main backend application script
│       ├── requirements.txt # Python dependencies for the backend
│       └── routes/          # Modular routes
|
├── .gitignore               # Specifies intentionally untracked files to ignore
|
└── README.md                # This README file
```

---

## 🛠️Setup Instructions

Follow these steps to get Cork up and running on your local machine. The setup involves two main parts: the client-side (frontend) and the backend (server).

### 1. Clone the Repository

First, clone the Cork repository to your local machine using Git:

```bash
git clone [https://github.com/skwasimrazzak/Cork](https://github.com/skwasimrazzak/Cork)
```

### 2. Setup Client👨‍💻

Navigate into the client directory and install the necessary dependencies.

```bash
cd Cork
cd client
npm i --force
```

### 3. Client Hosting

To start the client-side development server:

```bash
npm run dev
```

Note: You will need to split your terminal or open a new one to simultaneously host the backend.

### 4. Setup Backend🖥️

In a new terminal window, navigate to the backend directory and install the Python dependencies:

```bash
cd Cork
cd server
pip install -r requirements.txt
```

### 5. Backend Hosting

Finally, start the backend server:

```bash
py app.py
```

---

We hope you find Cork a valuable tool in your development workflow. Happy building!
