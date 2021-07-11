import Image from "next/image";
import { useState } from "react";
import Button from "../components/Button";
import ConditionsDialog from "../components/cases/ConditionsDialog";
import ConditionsSection from "../components/cases/ConditionsSection";
import EHRSection from "../components/cases/EHRSection";
import ProgressBar from "../components/cases/PorgressBar";
import ReadyDialog from "../components/cases/ReadyDialog";
import Container from "../components/Container";
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
  const [isOpen, setIsOpen] = useState(false);
  const [reviewedCases, setReviewedCases] = useState([]);

  const numberOfCases = cases?.length;
  const caseNumber = currentCase + 1;

  if (isLoading) {
    return <Container className="relative h-screen bg-gray-100" />;
  }

  if (
    (isEmpty && !reviewedCases.length) ||
    isError ||
    caseNumber > numberOfCases
  ) {
    return (
      <Container className="relative h-screen bg-gray-100">
        <main className="page-main">
          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </div>
            <p>There are no more cases. You may comeback later.</p>
            <p>There are no more cases. You may comeback later.</p>
          </div>
        </main>
      </Container>
    );
  }

  // if (caseNumber > numberOfCases) {
  //   return reviewedCases.map((e) => (
  //     <EHRSection
  //       condition={e.label}
  //       record={e.ehr}
  //       caseNumber={e.number}
  //       totalCases={e.numberOf}
  //     />
  //   ));
  // }

  // For some reason you cannot use `case`
  const _case = cases[currentCase];

  function handleReady() {
    setForm(() => ({ condition: undefined, startTime: new Date().getTime() }));
  }

  function handleSelect(condionOption: string) {
    setForm((s) => ({ ...s, condition: condionOption }));
    setIsOpen(false);
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

    // setReviewedCases((s) => [...s, { ..._case, label: condition, number:caseNumber, total:numberOfCases }]);

    handleReady();

    setCurrentCase((s) => s + 1);
  }

  function handleClear() {
    setForm((s) => ({ ...s, condition: undefined }));
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  const mobileFeatures = (
    <>
      <ConditionsDialog
        condition={form.condition}
        isOpen={isOpen}
        onClose={handleClose}
        onClear={handleClear}
        onSelect={handleSelect}
      />
      <div className="grid grid-cols-3 gap-4 left-0 bottom-0 w-screen bg-white border-t border-gray-200 md:hidden">
        <Button onClick={handleOpen} className="col-span-2" variant="primary">
          Diagnose
        </Button>
        <Button
          onClick={handleSubmit}
          disable={!form.condition}
          className="col-span-1 "
          variant="white"
        >
          Next
        </Button>
      </div>
    </>
  );

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

      <main className="page-main overflow-hidden">
        <div className="flex flex-row gap-5 text-left md:py-10">
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
            onClear={handleClear}
          />
        </div>
      </main>
      {mobileFeatures}
    </Container>
  );
}
