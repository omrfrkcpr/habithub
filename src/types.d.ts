/// <reference types="react-scripts" />

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: string;
  isAdmin: string;
  createdAt: string;
  updatedAt: string;
  username?: string;
  avatar?: string;
  googleId?: string;
  twitterId?: string;
  githubId?: string;
}

interface InitialAuthState {
  currentUser: null | User;
  loading: boolean;
  error: boolean;
  accessToken: null | string;
  refreshToken: null | string;
  remainingTime: number;
}

interface SignInFormValues {
  email: string;
  password: string;
}

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface SignUpInputFields {
  id: number;
  type: string;
  name: string;
  placeholder: string;
  showToggle: boolean;
  showPassword?: boolean;
  onToggleShowPassword?: () => void;
  password?: string; // for confirmPassword
}

interface SignUpInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  touched?: boolean;
  showToggle?: boolean;
  showPassword?: boolean;
  onToggleShowPassword?: () => void;
  onFocus?: () => void;
  password?: string; // for confirmPassword
}

interface ResetValues {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ResetInputFields {
  id: number;
  name: string;
  type: string;
  toggleIcon?: React.ReactNode;
  onToggleClick?: () => void; // for toggling password visibility
  placeholder: string;
}

type showChecklist = boolean;
interface PasswordCheckListProps {
  password: string;
  confirmPassword: string;
  setShowChecklist: React.Dispatch<React.SetStateAction<showChecklist>>;
}

interface Rule {
  id: number;
  emoji: string;
  content: string;
}

interface ThemeState {
  darkMode: boolean;
}

interface BaseTask {
  name: string;
  description: string;
  cardColor: string;
  repeat: string;
  priority: number;
  dueDates: string[];

  isCompleted: false;
}

interface NewTask extends BaseTask {
  tagName: string;
}

interface Task extends BaseTask {
  id: string;
  tagId: {
    id: string;
    name: string;
  };
}

interface Priorities {
  value: number;
  label: string;
}

interface PriorityBtn {
  priority: Priorities;
}

interface ExampleCustomInputProps {
  value?: string;
  onClick?: () => void;
}

type checked = boolean;
interface Repeat {
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

interface ActionBtnsComp {
  setChecked: React.Dispatch<React.SetStateAction<checked>>;
}

interface ActionBtnProps {
  onClick?: () => void;
  loading: boolean;
  icon: React.ReactNode;
  label: string;
  color: string;
  disabled?: boolean;
  edit: boolean;
}

interface TagValues {
  id: string;
  name: string;
}

interface TaskSliceStateValues {
  tasks: Task[];
  tasksDetails: Array;
  editTaskId: string;
  tags: TagValues[];
  tagsDetails: Array;
  todayTasks: Task[];
  todayTaskDetails: Array;
  tagTasks: Task[];
  loading: boolean;
  error: boolean;
}

interface ListValues {
  tagId: string;
  name: string;
  count: number;
}

interface TodayTaskDetails {
  lists: ListValues[];
  total: number;
}

type showDesc = string;
interface TaskCardProps {
  task: Task;
  showDesc: showDesc;
  setShowDesc: React.Dispatch<React.SetStateAction<showDesc>>;
}

interface ProfileInputProps {
  label: string;
  type: string;
  value: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
