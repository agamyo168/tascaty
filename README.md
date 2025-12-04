<h1 align="center">Tascaty</h1>
<h3 align="center">Simple, fast and styled task manager.</h3>

---

<div align="center">
<img alt="Logo Banner" src="assets/readme/banner.png"/>
</div>

---

# Tascaty - Task Management App

Tascaty is a modern, cross-platform mobile application built with React Native and Expo, designed to help you manage your tasks efficiently. With a clean and intuitive interface, Tascaty makes it easy to organize your daily activities, track progress, and stay productive.

## Tech Stack

- **Frontend**: React Native with TypeScript
- **Navigation**: Expo Router
- **State Management**: React Hooks
- **UI Components**: React Native Paper, @gorhom/bottom-sheet
- **Database**: SQLite with Drizzle ORM
- **Styling**: React Native Unistyles
- **Build Tool**: Expo

## Themes

- **Current**: Catpuccini theme (light/dark variants integrated across the app UI).
- **Future**: Supports adding more themes in the future.

### Splash screen

<div style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px;">
   <div style="flex: 1; min-width: 300px; text-align: center;">
      <img
      src="./assets/images/splash_light.png" 
      alt="Splash Light Screenshot"
      style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
      />
      <p>
    Splash Light
      </p>
   </div>
   <div style="flex: 1; min-width: 300px; text-align: center;">
      <img 
      src="./assets/images/splash_dark.png"
      alt="Splash Dark Screenshot"
      style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
      />
      <p>
         Splash Dark
      </p>
   </div>
</div>

### Home screen

<div style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px;">
   <div style="flex: 1; min-width: 300px; text-align: center;">
      <img
      src="./assets/images/home_light.png" 
      alt="Home Screen Light"
      style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
      />
      <p>
    Home Screen Light
      </p>
   </div>
   <div style="flex: 1; min-width: 300px; text-align: center;">
      <img 
      src="./assets/images/home_dark.png"
      alt="Home Screen Dark"
      style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
      />
      <p>
         Home Screen Dark
      </p>
   </div>
</div>

### Settings screen

<div style="display: flex; flex-wrap: wrap; justify-content: space-around; gap: 20px;">
   <div style="flex: 1; min-width: 300px; text-align: center;">
      <img
      src="./assets/images/settings_light.png" 
      alt="Settings Screen Light"
      style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
      />
      <p>
         Settings Screen Light
      </p>
   </div>
   <div style="flex: 1; min-width: 300px; text-align: center;">
      <img 
      src="./assets/images/settings_dark.png"
      alt="Settings Screen Dark"
      style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
      />
      <p>
         Settings Screen Dark
      </p>
   </div>
</div>

## Preview:

### **Adding a task**:

<details>
<summary>Click to view video preview</summary>
<img src="assets/readme/gifs/add_task.gif" alt="Adding a task video preview" width="320" />
</details>

### **Marking a task as completed**:

<details>
<summary>Click to view video preview</summary>
<img src="assets/readme/gifs/mark_task.gif" alt="Marking a task as completed video preview" width="320" />
</details>

### **Deleting a task**:

<details>
<summary>Click to view video preview</summary>
<img src="assets/readme/gifs/delete_task.gif" alt="Deleting a task video preview" width="320" />
</details>

### **Search a task**:

<details>
<summary>Click to view video preview</summary>
<img src="assets/readme/gifs/search_task.gif" alt="Search a task video preview" width="320" />
</details>

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/agamyo168/tascaty.git
   cd tascaty
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the app:

   ```bash
   npx expo run:android
   ```

## Project Structure

```
src/
├── app/                 # Main app screens and navigation
├── components/          # Reusable UI components
│   ├── common/          # Common components
│   └── tasks/           # Task-related components
├── db/                  # Database configuration and models
├── hooks/               # Custom React hooks
└── style/               # Global styles and themes
```

## Third-party Libraries

- **@gorhom/bottom-sheet**: Interactive bottom sheets for task details
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **react-native-paper**: Material Design components
- **react-native-reanimated**: Smooth animations
- **expo-sqlite**: SQLite database integration
- **react-native-gesture-handler**: Native gestures
- **react-native-safe-area-context**: Safe area handling
- **react-native-splash-screen**: Splash screen

## Download:

- [Android](https://drive.google.com/file/d/1sOW5GjUsfOjxiB5BvD69BdM_lj6M1vxA/view?usp=drivesdk)

## Acknowledgments

- Black-cat icon created by [BZZRINCANTATION](https://www.flaticon.com/free-icons/black-cat)
