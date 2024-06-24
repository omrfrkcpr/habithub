/// <reference types="react-scripts" />

interface Rule {
  id: number;
  emoji: string;
  content: string;
}

interface SetupProps {
  showSetup: boolean;
  setShowSetup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ThemeState {
  darkMode: boolean;
}
