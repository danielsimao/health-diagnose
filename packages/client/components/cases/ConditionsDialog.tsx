import { ArrowLeftIcon, XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Condition } from "../../interfaces/condition.interface";
import Button from "../Button";
import Dialog from "../Dialog";
import ConditionInput from "./ConditionInput";
import ConditionsList from "./ConditionsList";

interface ConditionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (condition: string) => void;
  onClear: () => void;
  condition?: string;
}

export default function ConditionsDialog({
  isOpen,
  onClose,
  onSelect,
  onClear,
  condition,
}: ConditionsDialogProps) {
  const [search, setSearch] = useState(condition || "");

  useEffect(() => {
    setSearch(condition || "");
  }, [condition]);

  function handleSelect(option: string) {
    onSelect(option);
    setSearch(option);
  }

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
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onClear={onClear}
          />
        </div>
        <ConditionsList onSelect={handleSelect} filter={search} />
      </div>
    </Dialog>
  );
}
