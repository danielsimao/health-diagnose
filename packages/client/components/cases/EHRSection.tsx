export default function EHRSection({
  condition = "UNKNOWN",
  record,
  caseNumber,
  totalCases,
}: {
  caseNumber: number;
  record: string;
  totalCases: number;
  condition?: string;
}) {
  return (
    <div
      id="ehr"
      className="flex-1 flex flex-col bg-white shadow overflow-hidden rounded-lg md:h-full"
    >
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-bold text-gray-900">
          Health Record No. {caseNumber} / {totalCases}
        </h2>
      </div>
      <div className="flex-auto border-t border-gray-200 bg-gray-50 p-5">
        {record}
      </div>
      <div className="flex-grow-0 border-t border-gray-200 h-20 p-5 text-sm">
        <strong>Condition:</strong> {condition}
      </div>
    </div>
  );
}
