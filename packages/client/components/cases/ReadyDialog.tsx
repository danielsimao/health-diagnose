import Dialog from "../Dialog";
interface ReadyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReady: () => void;
  numberOfCases: number;
}

export default function ReadyDialog({
  isOpen,
  onClose,
  onReady,
  numberOfCases,
}: ReadyDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col justify-center items-center gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
          />
        </svg>
        <span className="text-lg leading-6 font-bold text-gray-900">
          You have <span className="text-blue-500">{numberOfCases}</span> cases
          to diagnose
        </span>
        <button
          onClick={onReady}
          type="button"
          className={`w-full bg-blue-500 px-4 py-3 rounded text-gray-200 font-semibold hover:bg-blue-600 transition duration-200 each-in-out`}
        >
          Start
        </button>
      </div>
    </Dialog>
  );
}
