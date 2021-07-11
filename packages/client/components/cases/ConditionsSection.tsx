import { HTMLAttributes, useEffect, useState } from "react";
import Button from "../Button";
import ConditionInput from "./ConditionInput";
import ConditionsList from "./ConditionsList";

interface ConditionsSectionProps {
  onSelect: (condition: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  condition?: string;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export default function ConditionsSection({
  condition,
  onSelect,
  onSubmit,
  onClear,
  style,
}: ConditionsSectionProps) {
  const [search, setSearch] = useState(condition || "");

  useEffect(() => {
    setSearch(condition || "");
  }, [condition]);

  function handleSelect(option: string) {
    onSelect(option);
    setSearch(option);
  }

  return (
    <div
      style={style}
      className="hidden md:flex flex-col flex-1 overflow-hidden bg-white shadow rounded-lg case-record"
    >
      <div className="flex items-center py-2 pl-4 border-b border-gray-200">
        <ConditionInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={onClear}
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
  );
}
