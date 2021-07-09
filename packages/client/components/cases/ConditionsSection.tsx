import { HTMLAttributes, useEffect, useRef, useState } from "react";
import Button from "../Button";

interface ConditionsSectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (condition: string) => void;
  onSubmit: () => void;
  form: any;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

const people = [
  "Wadeqwer Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanqwerya Fox",
  "Helqqwerlen Schmidt",
  "Wade Cooper",
  "Arlewqqwererwne Mccoy",
  "Devonqwer qwerWebb",
  "Tom rqwerCook",
  "Tanywerqwera Fox",
  "Hellenqwer Schmidt",
  "Wade Crqwerooper",
  "Arleneqwerqwe Mccoy",
  "Devoweqrqwern Webb",
  "Tom Cqwerook",
  "Tanyqwqwerera Fox",
  "Helleqwerqwn Schmidt",
];

export default function ConditionsSection({
  form,
  onSelect,
  onSubmit,
  style,
}: ConditionsSectionProps) {
  const [search, setSearch] = useState(form.condition || "");
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const condition = document.querySelector("#ehr");
    if (ref.current && ref2.current && condition) {
      const height = condition.scrollHeight;

      ref.current.style.height = `${height}px`;
      ref2.current.style.height = `${height - 65 - 64}px`;
    }
  }, []);

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
    <div
      ref={ref}
      style={style}
      className="hidden md:block md:flex-1 md:overflow-hidden bg-white shadow rounded-lg"
    >
      <div className="">
        <div className="flex items-center py-2 px-4 border-b border-gray-200">
          <input
            placeholder="Choose a condition"
            className="appearance-none rounded w-full h-12 text-gray-700 leading-tight focus:outline-none"
          ></input>
        </div>
        <div ref={ref2} className="flex flex-col overflow-y-auto">
          {options}
        </div>
        <div className="p-2 border-t border-gray-200">
          <Button onClick={onSubmit} className="w-full" variant="primary">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
