import {
  HiCheckCircle,
  HiExclamationCircle,
  HiExclamationTriangle,
  HiInformationCircle,
} from "react-icons/hi2";

import { toast } from "sonner";

export const showToast = (type, message) => {
  const icons = {
    success: (
      <HiCheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />
    ),
    warning: (
      <HiExclamationTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
    ),
    error: (
      <HiExclamationCircle className="text-destructive h-6 w-6 dark:text-red-500" />
    ),
    info: (
      <HiInformationCircle className="text-primary h-6 w-6 dark:text-purple-500" />
    ),
  };

  const textColors = {
    success: "text-green-600 dark:text-green-500",
    warning: "text-amber-600 dark:text-amber-500",
    error: "text-destructive dark:text-red-500",
    info: "text-primary dark:text-purple-500",
  };

  toast.custom(() => (
    <div
      className={`bg-background border-muted shadow-light dark:shadow-dark dark:shadow-muted flex w-auto items-center gap-4 rounded-xl border p-4 sm:min-w-80`}
    >
      {icons[type] || icons.info}
      <div>
        <p
          className={`font-primary text-sm font-semibold ${textColors[type] || textColors.info}`}
        >
          {message}
        </p>
      </div>
    </div>
  ));
};
