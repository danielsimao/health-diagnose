import Dialog from "../Dialog";
interface ReadyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReady: () => void;
}

export default function ReadyDialog({
  isOpen,
  onClose,
  onReady,
}: ReadyDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <span className="text-lg leading-6 font-bold text-gray-900">
          You have 5 cases to diagnose.
        </span>

        <button
          onClick={onReady}
          type="button"
          className={`w-full bg-blue-500 px-4 py-3 rounded text-gray-200 font-semibold hover:bg-blue-600 transition duration-200 each-in-out`}
        >
          Ready
        </button>
      </div>
    </Dialog>
  );
}
