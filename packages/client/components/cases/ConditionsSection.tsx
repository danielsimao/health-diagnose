import { ChangeEvent, useEffect, useState } from "react";
import Button from "../Button";
import ConditionInput from "./ConditionInput";
import ConditionsDialog from "./ConditionsDialog";
import ConditionsList from "./ConditionsList";

interface ConditionsSectionProps {
  onSelect: (condition?: string) => void;
  onSubmit: () => void;
  condition?: string;
}

export default function ConditionsSection({
  condition,
  onSelect,
  onSubmit,
}: ConditionsSectionProps) {
  const [search, setSearch] = useState(condition || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSearch(condition || "");
  }, [condition]);

  function handleSelect(option: string) {
    onSelect(option);
    setSearch(option);
    setIsOpen(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleClear() {
    setSearch("");
    onSelect(undefined);
  }

  return (
    <>
      <div className="hidden md:flex flex-col md:flex-1 overflow-hidden bg-white shadow rounded-lg case-record">
        <div className="flex items-center py-2 pl-4 border-b border-gray-200">
          <ConditionInput
            value={search}
            onChange={handleChange}
            onClear={handleClear}
          />
        </div>
        <ConditionsList onSelect={handleSelect} filter={search} />
        <div className="flex flex-grow-0 items-center p-4 border-t border-gray-200">
          <Button
            disable={!condition}
            onClick={onSubmit}
            className="w-full"
            variant="primary"
          >
            Submit & Next
          </Button>
        </div>
      </div>
      <div className="md:flex-1 md:hidden">
        <ConditionsDialog
          search={search}
          isOpen={isOpen}
          onClear={handleClear}
          onSelect={handleSelect}
          onChange={handleChange}
          onClose={() => setIsOpen(false)}
        />
        <div className="grid grid-cols-3 gap-4 p-4 w-screen bg-white border-t border-gray-200 md:hidden -ml-4">
          <Button
            onClick={() => setIsOpen(true)}
            className="col-span-2"
            variant="primary"
          >
            Diagnose
          </Button>
          <Button
            onClick={onSubmit}
            disable={!condition}
            className="col-span-1 "
            variant="white"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
