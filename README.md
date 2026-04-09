# 🗓️ Physical Interactive Wall Calendar

A premium, high-fidelity React wall calendar designed to mimic the tactile feel of a physical spiral-bound calendar. Features an advanced range-based task system and custom date tagging.

## ✨ Features
- **Range Selection**: Select a start and end date to schedule tasks across multiple days.
- **Visual Day Tags**: Double-tap any date to mark it as a **Holiday** (Red) or **Custom** (Blue).
- **Smooth Animations**: Integrated `MorphingText` for fluid title and date transitions.
- **Persistent Data**: No database needed—all your tasks and tags are saved locally in your browser.
- **Responsive Design**: Adapts beautifully from desktop two-column layouts to compact mobile stacks.
- **Dynamic Themes**: Wavy hero images that change with the calendar months.

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd physical-callender
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run in development mode:**
   ```bash
   npm run dev
   ```

## 📖 How to Use

### 1. Adding a Task (Date Range)
- **Click the start date** you want to begin with.
- **Click the end date**. A modal will immediately appear.
- Enter your task description and click **Save**.
- Your task will now appear as an indicator dot on those dates and in your sidebar list.

### 2. Marking a Holiday or Tag
- **Double-click (or double-tap)** any individual date.
- Choose **Holiday** (Red) or **Custom Tag** (Blue) from the menu.
- The date bubble will instantly change color to reflect your tag.

### 3. Managing Tasks
- Use the **Task List** in the sidebar to view all active items.
- Click the **Dustbin icon** on a task to delete it.
- Click the **Checkmark** to toggle completion status.

## 🛠️ Tech Stack
- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Framer Motion** (Animations)
- **Date-fns** (Date Logic)
- **Lucide-React** (Icons)
