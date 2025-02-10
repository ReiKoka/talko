import {
  HiCheckCircle,
  HiExclamationCircle,
  HiExclamationTriangle,
  HiInformationCircle,
} from "react-icons/hi2";

import { toast } from "sonner";

export const showToast = (type, message) => {
  const icons = {
    success: <HiCheckCircle className="h-6 w-6 text-green-500" />,
    warning: <HiExclamationTriangle className="h-6 w-6 text-amber-600" />,
    error: <HiExclamationCircle className="text-destructive h-6 w-6" />,
    info: <HiInformationCircle className="text-foreground h-6 w-6" />,
  };

  const textColors = {
    success: "text-green-500",
    warning: "text-amber-600",
    error: "text-destructive",
    info: "text-foreground",
  };

  toast.custom(() => (
    <div className="bg-background border-muted shadow-toast flex min-w-80 items-center gap-4 rounded-xl p-4">
      {icons[type] || icons.info}
      <div>
        <p
          className={`font-primary text-sm font-medium ${textColors[type] || textColors.info}`}
        >
          {message}
        </p>
      </div>
    </div>
  ));
};
