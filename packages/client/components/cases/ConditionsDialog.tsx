import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Button from "../Button";
import Dialog from "../Dialog";

interface ConditionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (condition: string) => void;
  onSubmit: () => void;
  form: any;
}

const people = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
];
export default function ConditionsDialog({
  isOpen,
  onClose,
  onSelect,
  onSubmit,
  form,
}: ConditionsDialogProps) {
  const [search, setSearch] = useState(form.condition || "");

  function handleSelect(option: string) {
    onSelect(option);
    setSearch(option);
  }

  const options = people
    .filter((option) => option.toLowerCase().includes(search.toLowerCase()))
    .map((option) => (
      <div
        key={option}
        className="flex items-center p-4 border-b border-gray-200"
        onClick={() => handleSelect(option)}
      >
        <span>{option}</span>
      </div>
    ));

  return (
    <Dialog fullscreen isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-start items-center p-2 gap-4 border-b border-gray-200">
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
      <div className="flex flex-col overflow-auto ">{options}</div>
      <div className="fixed left-0 bottom-0 w-screen bg-white border-t border-gray-200 md:hidden px-4 py-3">
        <Button
          onClick={onSubmit}
          variant="primary"
          disable={!form.condition}
          className="w-full"
        >
          Submit
        </Button>
      </div>
    </Dialog>
  );
}
