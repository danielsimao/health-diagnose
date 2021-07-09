import { LinearProgress } from "@material-ui/core";

export default function ProgressBar({
  progress,
  className = "",
}: {
  progress: number;
  className?: string;
}) {
  return (
    <div style={{ padding: 0 }} className={className}>
      <LinearProgress
        style={{
          padding: 0,
          height: 4,
          backgroundColor: "rgba(229, 231, 235, 1)",
        }}
        className="progress-bar"
        variant="determinate"
        value={progress}
      />
    </div>
  );
}
