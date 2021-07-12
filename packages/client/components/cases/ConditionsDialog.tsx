import { ArrowLeftIcon } from "@heroicons/react/solid";
import { ChangeEvent } from "react";
import Dialog from "../Dialog";
import ConditionInput from "./ConditionInput";
import ConditionsList from "./ConditionsList";

interface ConditionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (condition: string) => void;
  onClear: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

export default function ConditionsDialog({
  onClose,
  onSelect,
  onClear,
  search,
  onChange,
  isOpen,
}: ConditionsDialogProps) {
  return (
    <Dialog fullscreen isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-shrink-0 flex-start items-center p-2 gap-4 border-b border-gray-200">
          <button
            onClick={onClose}
            type="button"
            className="w-12 h-12 p-2 flex-shrink-0"
          >
            <ArrowLeftIcon />
          </button>
          <ConditionInput
            onChange={onChange}
            value={search}
            onClear={onClear}
          />
        </div>
        <ConditionsList onSelect={onSelect} filter={search} />
      </div>
    </Dialog>
  );
}
