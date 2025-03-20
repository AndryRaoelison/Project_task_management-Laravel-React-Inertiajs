export const PROJECT_STATUS_CLASS_MAP = {
  pending: "bg-orange-500",
  in_progress: "bg-blue-500 ",
  finished: "bg-green-500",
};
export const PROJECT_STATUS_TEXT_MAP = {
  pending: "En attente",
  in_progress: "En cours",
  finished: "Terminé",
};
export const TASK_STATUS_CLASS_MAP = {
  pending: "bg-orange-500",
  in_progress: "bg-blue-500",
  finished: "bg-green-500",
};
export const TASK_STATUS_TEXT_MAP = {
  pending: "En attente",
  in_progress: "En cours",
  finished: "Terminé",
};
export const TASK_PRIORITY_CLASS_MAP = {
  low: "bg-gray-600",
  medium: "bg-amber-600",
  high: "bg-red-600",
};
export const TASK_PRIORITY_TEXT_MAP = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const chevron_up = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 15.75 7.5-7.5 7.5 7.5"
    />
  </svg>
);
