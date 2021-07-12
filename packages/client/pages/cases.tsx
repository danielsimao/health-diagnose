import { useState } from "react";
import ConditionsSection from "../components/cases/ConditionsSection";
import DiagnosesList from "../components/cases/DiagnosesList";
import EHRSection from "../components/cases/EHRSection";
import Notice from "../components/cases/Notice";
import ProgressBar from "../components/cases/PorgressBar";
import ReadyDialog from "../components/cases/ReadyDialog";
import Container from "../components/Container";
import { Diagnoses } from "../interfaces/condition.interface";
import { useCases, useUser } from "../lib/hooks";

interface DiagnoseForm {
  condition?: string;
  startTime?: number;
}

export default function Cases() {
  const user = useUser({ redirectTo: "/" });
  const { cases, isEmpty, isError, isLoading } = useCases();

  const [form, setForm] = useState<DiagnoseForm>({
    condition: undefined,
    startTime: undefined,
  });

  const [currentCase, setCurrentCase] = useState(0);
  const [diagnoses, setDiagnoses] = useState<Diagnoses[]>([]);

  const numberOfCases = cases?.length;
  const caseNumber = currentCase + 1;

  if (isLoading) {
    return <Container className="relative h-screen bg-gray-100" />;
  }

  if (isEmpty || isError || caseNumber > numberOfCases) {
    return (
      <Container className={"relative bg-gray-100 min-h-screen"}>
        <main className="page-main overflow-hidden">
          <div className="py-10">
            <Notice type={isError ? "error" : "empty"} />
            <DiagnosesList diagnoses={diagnoses} totalCases={numberOfCases} />
          </div>
        </main>
      </Container>
    );
  }

  // For some reason you cannot use `case`
  const _case = cases[currentCase];

  function handleReady() {
    setForm(() => ({ condition: undefined, startTime: new Date().getTime() }));
  }

  function handleSelect(condionOption?: string) {
    setForm((s) => ({ ...s, condition: condionOption }));
  }

  function handleSubmit() {
    if (!form.condition || !form.startTime) return;

    const { condition, startTime } = form;
    const finishTime = new Date().getTime();

    const body = {
      userId: user._id,
      caseId: _case._id,
      label: condition,
      duration: finishTime - startTime,
    };

    fetch("/api/diagnose", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    setDiagnoses((s) => [...s, { condition, caseNumber, ehr: _case.ehr }]);

    handleReady();

    setCurrentCase((s) => s + 1);
  }

  return (
    <Container
      className={`relative bg-gray-100 min-h-screen ${
        !form.startTime ? "filter blur-sm" : ""
      }`}
    >
      <ProgressBar
        className="fixed top-0 left-0 w-full"
        progress={(currentCase * 100) / numberOfCases}
      />
      <ReadyDialog
        isOpen={!form.startTime}
        onClose={handleReady}
        onReady={handleReady}
        numberOfCases={numberOfCases}
      />

      <main style={{ paddingBottom: 0 }} className="page-main overflow-hidden">
        <div className="flex flex-col md:flex-row gap-5 text-left md:py-10">
          <EHRSection
            condition={form.condition}
            record={_case.ehr}
            caseNumber={caseNumber}
            totalCases={numberOfCases}
          />
          <ConditionsSection
            condition={form.condition}
            onSelect={handleSelect}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </Container>
  );
}
