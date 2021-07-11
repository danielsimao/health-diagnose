import { Diagnoses } from "../../interfaces/condition.interface";
import EHRSection from "./EHRSection";

export default function DiagnosesList({
  diagnoses,
  totalCases,
}: {
  diagnoses: Diagnoses[];
  totalCases: number;
}) {
  if (!diagnoses.length) {
    return null;
  }

  return (
    <div>
      <div className="bg-white shadow rounded-lg p-4 text-lg font-semibold mb-4">
        Your latest diagnoses
      </div>
      <div className="flex flex-col gap-5 text-left ">
        {diagnoses.map((d) => (
          <EHRSection
            key={d.caseNumber}
            condition={d.condition}
            record={d.ehr}
            caseNumber={d.caseNumber}
            totalCases={totalCases}
          />
        ))}
      </div>
    </div>
  );
}
