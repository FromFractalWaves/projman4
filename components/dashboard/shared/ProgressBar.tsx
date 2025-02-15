// components/dashboard/shared/ProgressBar.tsx
interface ProgressBarProps {
    progress: number;
    showLabel?: boolean;
  }
  
  export function ProgressBar({ progress, showLabel = true }: ProgressBarProps) {
    return (
      <div className="space-y-1">
        {showLabel && (
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
        )}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }