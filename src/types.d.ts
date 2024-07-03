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

interface NewTodo {
  name: string;
  description: string;
  cardColor: string;
  repeat: string;
  priority: string;
  dueDates: Date[];
  tag: string;
  isCompleted: false;
}

interface ChildNewTodo {
  newTodo: NewTodo;
  setNewTodo: React.Dispatch<React.SetStateAction<NewTodo>>;
}

interface PriorityBtn extends ChildNewTodo {
  priority: string;
}

interface ExampleCustomInputProps {
  value?: string;
  onClick?: () => void;
}

type checked = boolean;
interface Repeat extends ChildNewTodo {
  startDate: Date;
  checked: checked;
  setChecked: React.Dispatch<React.SetStateAction<checked>>;
}
interface RepeatSectionProps {
  options: { value: string; label: string; isDisabled?: boolean }[];
  selectedValue: string | string[];
  onClick: (value: string) => void;
}

interface RepeatValueBtnProps {
  value: string;
  label: string;
  selectedValue: string | string[];
  onClick: (value: string) => void;
  isDisabled?: boolean;
}

interface ActionBtnsComp extends ChildNewTodo {
  initialNewTodo: NewTodo;
  setChecked: React.Dispatch<React.SetStateAction<checked>>;
}

interface ActionBtnProps {
  onClick: () => void;
  loading: boolean;
  icon: React.ReactNode;
  label: string;
  color: string;
  hoverColor: string;
}
