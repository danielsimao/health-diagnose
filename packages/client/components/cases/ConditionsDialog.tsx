import { XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Condition } from "../../interfaces/condition.interface";
import Button from "../Button";
import Dialog from "../Dialog";
import ConditionsList from "./ConditionsList";

interface ConditionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (condition: string) => void;
  onSubmit: () => void;
  condition?: string;
}

export default function ConditionsDialog({
  isOpen,
  onClose,
  onSelect,
  onSubmit,
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
            <XIcon></XIcon>
          </button>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Choose a condition"
            className="appearance-none rounded w-full h-12 text-gray-700 leading-tight focus:outline-none"
          ></input>
        </div>
        <ConditionsList onSelect={handleSelect} filter={search} />
        <div
          style={{ flex: "0 0 auto" }}
          className="w-screen bg-white border-t border-gray-200 md:hidden px-4 py-3"
        >
          <Button
            onClick={onSubmit}
            variant="primary"
            disable={!condition}
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </div>
    </Dialog>
  );
}