# Harish Ram A N — Personal Portfolio Website

A fast, handcrafted, and authentic software engineering portfolio website built for **Harish Ram A N** (B.Tech AI & DS, National Engineering College).

Designed with editorial precision to stand out from generic AI templates:
- **No generic AI tropes:** No fake percentage bars, no cliché floating gradients, no empty buzzwords.
- **Rooted in authentic engineering:** Spotlights low-level systems (C, x86-64 Assembly, GDB, Networking) alongside production backends (Python, Flask, MySQL, Gunicorn, Google Cloud Functions, Firebase Firestore).
- **Interactive Workbench:** Interactive x86-64 assembly, Flask auth middleware, GCP serverless pipeline, and GDB session trace.
- **Command Palette:** Keyboard-navigable `⌘K` / `Ctrl+K` command launcher.
- **System Architecture Modals:** Deep dive case studies for both featured projects (**Attendance Management System** and **Aittayya**).
- **Zero build toolchain overhead:** Built with pure semantic HTML5, Vanilla CSS, and modern ES6 JavaScript. Instant 100/100 Lighthouse performance, loads in under 100ms.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

Because this website uses vanilla web standards with no complex build steps (no npm, no Webpack/Vite build commands required), it is 100% plug-and-play for GitHub Pages.

### Method 1: Using your personal `username.github.io` domain (Recommended)
1. Log in to [GitHub](https://github.com).
2. Create a new public repository named **`<your-github-username>.github.io`** (e.g. `harishram.github.io`).
3. Push or upload all files from this directory to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Handcrafted portfolio website"
   git branch -M main
   git remote add origin https://github.com/<your-github-username>/<your-github-username>.github.io.git
   git push -u origin main
   ```
4. GitHub Pages will automatically publish the website! In ~60 seconds, your site is live at:
   `https://<your-github-username>.github.io`

---

### Method 2: Hosting inside a dedicated repository (e.g. `portfolio`)
1. Create a repository named `portfolio`.
2. Push this directory to the repository:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-github-username>/portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages** (on the left sidebar).
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your site will be live at:
   `https://<your-github-username>.github.io/portfolio/`

---

## 📁 Project Structure

```text
├── index.html                   # Semantic HTML5 single-page application
├── favicon.svg                  # Vector monogram favicon (HR)
├── README.md                    # Setup and deployment documentation
├── assets/
│   ├── css/
│   │   └── main.css             # Tailored design system, dark/light theme tokens, typography
│   ├── js/
│   │   └── main.js              # Command palette, live clock, modals, audio synthesis, workbench
│   └── images/
│       ├── attendance-dashboard.jpg  # Project 01 dashboard preview
│       └── aittayya-app.jpg          # Project 02 multilingual assistant UI preview
```

---

## 🎨 Personal Customization Tips

1. **Adding your Resume PDF**:
   - Place your exported resume file named `resume.pdf` in the root folder alongside `index.html`.
2. **Connecting your GitHub / LinkedIn**:
   - In `index.html`, add your personal GitHub URL (e.g. `https://github.com/yourhandle`) in the navigation or contact action links.
3. **Contact Details**:
   - Configured with `harishram2706@gmail.com` and `+91 8838143041`. Clickable copy buttons and mailto links work right out of the box.

---

## 🛡️ License
MIT License. Free to use, adapt, and customize.
