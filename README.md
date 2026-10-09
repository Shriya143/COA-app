# 💻 Shriya — COA (25CST-238) Academic Portfolio & Learning Platform

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

An interactive, responsive, and colorful academic web portal and Computer Organization & Architecture (COA) learning tool suite built for **Computer Organization and Architecture (25CST-238)** at **Chandigarh University**.

---

## 👩‍🎓 Student Profile
- **Name:** Shriya
- **Roll Number:** `25BAI10016`
- **Course:** Bachelor of Technology (B.Tech) in Computer Science Engineering — Artificial Intelligence (2025–2029)
- **Institution:** Chandigarh University, Mohali
- **Subject:** Computer Organization and Architecture (`25CST-238`)
- **First-Year CGPA:** 7.9

---

## 🌟 Key Sections of the Website

### 1. 🏠 Home Page (Hero Section)
- Personalized hero banner displaying student identification: Name (`Shriya`), Roll No (`25BAI10016`), Course (`BE CSE AI`), and Course Code (`25CST-238`).
- Formal academic portrait card in Chandigarh University blazer.
- Interactive metric counters and quick navigation shortcuts.

### 2. 👤 About Me & Full Curriculum Vitae (CV)
- **Introduction:** Academic and personal journey at Chandigarh University.
- **Academic Interests:** Passions in AI, Machine Learning, DSA, and Computer Architecture.
- **Future Goals:** Roadmap toward becoming an AI Software Engineer.
- **Interactive CV:**
  - Complete Education timeline (Chandigarh University, DAV Centenary Public School Una).
  - Categorized Technical Skills (Programming, Core Concepts, AI/Data, Tools, Soft Skills).
  - Projects: *Curriculum Gap Analyzer* (Hackathon), *CyberBasics* (Cybersecurity learning), *AI Second Brain / NoteMind*.
  - Certifications & Honors (LinkedIn Learning Generative AI, Microsoft Azure AI Fundamentals AI-900).
  - One-click **Print / Save CV as PDF** button.

### 3. ⚙️ COA Learning Tools
Interactive hardware and architecture calculators:
- **Tool 1: Multi-Base Number System Converter**
  - Converts dynamically between **Decimal (10)**, **Binary (2)**, **Hexadecimal (16)**, and **Octal (8)**.
  - Interactive input and output boxes with base selector on both sides and instant swap button.
  - Live **All Bases at a Glance** matrix (Decimal, 4-bit grouped Binary, Hexadecimal with `0x`, Octal).
  - Step-by-step mathematical breakdown (positional expansion & successive division steps).
  - Copy to clipboard with toast notification.
- **Tool 2: Multi-Address Instruction Formator**
  - Formats any algebraic expression (e.g., `X = (A + B) * (C - D)`, `X = A + B * C`) into standard COA instruction architectures:
    - **0-Address Instructions** (Stack Architecture / Reverse Polish Notation: `PUSH`, `ADD`, `POP`)
    - **1-Address Instructions** (Accumulator Architecture: `LOAD`, `ADD`, `STORE`, `AC`)
    - **2-Address Instructions** (General Register / Memory: `MOV`, `ADD`, `SUB`)
    - **3-Address Instructions** (Three-Operand Register / RISC: `ADD R1, A, B`)
  - Bit-field architectural diagrams (Opcode, Destination, Source 1, Source 2).
  - Infix-to-Postfix compiler trace and register allocation breakdown.

### 4. 🏆 Gallery & Achievements
- Interactive gallery showcasing certificates and university events:
  - **HERIZON 2026 Certificate:** Awarded to Shriya (Team KSK Coders) by UIE, Chandigarh University & IEEE India Council (March 27–28, 2026).
  - **byteXL AI Workshop Certificate:** "AI & Automation using Python" hands-on workshop with Microsoft Industry Expert (Feb 27, 2026).
  - **HERIZON 2026 Event Photo:** Keynote session at Chandigarh University Main Auditorium.
  - **Academic Portrait:** Student ID profile in university formal attire.
- Full-screen **Lightbox Modal** with zoom view and direct image download.

### 5. 📚 Assignment 1 — Computer Organisation and Architecture
Complete answers for all 11 questions from the course curriculum:
1. What is Raspberry Pi?
2. AI – Submit 10 Takeaways
3. What is Yotta?
4. What is NPTEL?
5. How do you decide which programming language to use?
6. Parameters used while designing an application
7. Why is a GPU faster than a CPU?
8. Define CPU, GPU and TPU
9. Last year's Turing Award (2025 ACM A.M. Turing Award — Andrew G. Barto & Richard S. Sutton)
10. Founders of Intel and AMD
11. Which company made your laptop's CPU?
- Features: Real-time search filter, expand/collapse accordions, direct download for original `assignment1.pdf`, and copy-answer buttons.

---

## 🚀 How to Run Locally

Since this application uses pure modern web standards (HTML5, CSS3, ES6 JavaScript), you do not need any build tools or complex runtimes:

### Option 1: Direct File Open
Double click `index.html` in your file explorer to open it in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Python Local Server
```bash
# In the project root directory
python -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

---

## 🌐 How to Push to GitHub & Deploy on GitHub Pages

Follow these simple steps in PowerShell or your terminal:

### Step 1: Initialize Git and Commit
```powershell
# Open terminal in c:\Users\PC\Downloads\coa
git init
git add .
git commit -m "Initial commit: Shriya COA Portfolio and Learning Tools"
```

### Step 2: Create a New Repository on GitHub
1. Go to [GitHub](https://github.com) and log in to your account.
2. Click the **+** (plus icon) in the top right and select **New repository**.
3. Name your repository (e.g., `coa-portfolio` or `coa`).
4. Keep it **Public** (required for free GitHub Pages).
5. Leave "Initialize this repository with a README" **unchecked** (we already have a complete README).
6. Click **Create repository**.

### Step 3: Link and Push to GitHub
Copy the commands shown on GitHub or run:
```powershell
# Set main branch
git branch -M main

# Add your GitHub repository remote (replace <YOUR_USERNAME> with your GitHub username)
git remote add origin https://github.com/<YOUR_USERNAME>/coa.git

# Push your code
git push -u origin main
```

### Step 4: Enable Free Live Website (GitHub Pages)
1. On your GitHub repository page, click **Settings** (top tab).
2. On the left sidebar, click **Pages**.
3. Under **Branch**, select `main` and keep the folder as `/ (root)`.
4. Click **Save**.
5. Wait ~1 minute, and GitHub will provide your live URL:
   `https://<YOUR_USERNAME>.github.io/coa/`

---

## 🎨 Technologies Used
- **Semantic HTML5**
- **Modern CSS3** (Custom Properties, Flexbox, Grid, Glassmorphism, Print Styles)
- **Vanilla JavaScript (ES6+)** (Zero external JavaScript libraries for maximum performance and instant load times)
- **Google Fonts** (*Plus Jakarta Sans*, *Fira Code*, *Space Grotesk*)
- **Font Awesome 6** (Icons)

---

&copy; 2026 Shriya. Department of Computer Science & Engineering, Chandigarh University.
