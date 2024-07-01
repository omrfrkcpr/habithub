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

interface NewTask {
  name: string;
  description: string;
  cardColor: string;
  repeat: string;
  priority: string;
  dueDates: Date[];
  tag: string;
  isCompleted: false;
}

interface ChildNewTask {
  newTask: NewTask;
  setNewTask: React.Dispatch<React.SetStateAction<NewTask>>;
}

interface Repeat extends ChildNewTask {
  startDate: Date;
}

interface ExampleCustomInputProps {
  value?: string;
  onClick?: () => void;
}
