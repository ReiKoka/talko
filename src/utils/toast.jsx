import {
  HiCheckCircle,
  HiExclamationCircle,
  HiExclamationTriangle,
  HiInformationCircle,
} from "react-icons/hi2";

import { toast } from "sonner";

export const showToast = (type, message) => {
  const icons = {
    success: <HiCheckCircle className="text-green-500 h-6 w-6" />,
    warning: <HiExclamationTriangle className="h-6 w-6 text-amber-600" />,
    error: <HiExclamationCircle className="h-6 w-6 text-destructive" />,
    info: <HiInformationCircle className="h-6 w-6 text-foreground" />,
  };

  const bgColors = {
    success: "bg-green/50"
  }

  const textColors = {
    success: "text-green-500",
    warning: "text-amber-600",
    error: "text-destructive",
    info: "text-foreground",
  };

  toast.custom(() => (
    <div className="flex bg-background items-center gap-4 rounded-xl p-4 border-muted shadow-toast min-w-80">
      {icons[type] || icons.info}
      <div>
        <p className={`text-sm font-medium font-primary ${textColors[type] || textColors.info}`}>{message}</p>
      </div>
    </div>
  ));
};
