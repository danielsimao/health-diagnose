import Conditions from "../../data/conditions";

interface ConditionsListProps {
  filter: string;
  onSelect: (option: string) => void;
}

export default function ConditionsList({
  filter,
  onSelect,
}: ConditionsListProps) {
  return (
    <div className="overflow-auto flex-auto bg-gray-50">
      {Conditions.filter((condition) =>
        `${condition.ICD_10} ${condition.ICD_10_Description}`
          .toLowerCase()
          .includes(filter.toLowerCase())
      ).map((condition) => (
        <div
          key={condition.ICD_10}
          className="flex gap-3 items-center p-4 border-b border-gray-200"
          onClick={() =>
            onSelect(`${condition.ICD_10} ${condition.ICD_10_Description}`)
          }
        >
          <div className="w-1/4 font-bold">{condition.ICD_10}</div>
          <div className="w-3/4">{condition.ICD_10_Description}</div>
        </div>
      ))}
    </div>
  );
}
