import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import Button from "../components/Button";
import ConditionsDialog from "../components/cases/ConditionsDialog";
import ConditionsSection from "../components/cases/ConditionsSection";
import EHRSection from "../components/cases/EHRSection";
import ProgressBar from "../components/cases/PorgressBar";
import ReadyDialog from "../components/cases/ReadyDialog";
import Container from "../components/Container";
import fetcher from "../lib/fetcher";
import { useUser } from "../lib/hooks";

export default function Cases() {
  const user = useUser({ redirectTo: "/" });
  const { data } = useSWR("/api/cases", fetcher);
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState<{
    condition: undefined | string;
    startTime: undefined | number;
  }>({ condition: undefined, startTime: undefined });
  const [caseIdx, setCaseIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (!data?.cases) {
    return <Container className="relative h-screen bg-gray-100" />;
  }

  function handleReady() {
    setForm((s) => ({ ...s, startTime: new Date().getTime() }));
    setReady(true);
  }

  if (!ready) {
    <Container className="relative h-screen bg-gray-100 filter blur-sm">
      <ReadyDialog
        isOpen={!ready}
        onClose={handleReady}
        onReady={handleReady}
        numberOfCases={data?.cases.length}
      />
    </Container>;
  }

  if (!data.cases.length || data.cases.length < caseIdx + 1) {
    return (
      <Container className="relative h-screen bg-gray-100">
        <div>
          <Image
            src="/static/success.png"
            layout="fixed"
            width="300"
            height="250"
          ></Image>
          <div>
            <span className="text-lg">
              No more cases for now. Please comeback later!
            </span>
          </div>
        </div>
      </Container>
    );
  }

  const currentCase = data.cases[caseIdx];

  function handleDiagnose() {
    if (form.condition) {
      setIsOpen(false);
    }
  }

  function handleSelect(condionOption: string) {
    setForm((s) => ({ ...s, condition: condionOption }));
  }

  function handleSubmit() {
    fetch("/api/diagnose", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        caseId: currentCase._id,
        label: form.condition,
        time: new Date().getTime() - (form.startTime as number),
      }),
    });
    setForm(() => ({ condition: undefined, startTime: undefined }));
    setCaseIdx((s) => s + 1);
  }

  return (
    <Container
      className={`relative h-screen bg-gray-100  ${
        !ready ? "filter blur-sm" : ""
      }`}
    >
      <ProgressBar
        className="fixed top-0 left-0 w-full"
        progress={(caseIdx * 100) / data.cases.length}
      />
      <ReadyDialog
        isOpen={!ready}
        onClose={handleReady}
        onReady={handleReady}
        numberOfCases={data?.cases.length}
      />

      <main className="page-main overflow-hidden">
        <div className="flex flex-row gap-5 text-left md:py-20">
          <EHRSection
            condition={form.condition}
            record={data.cases[caseIdx]?.ehr}
            recordNum={caseIdx + 1}
            totalRecords={data.cases.length}
          />
          <ConditionsSection
            condition={form.condition}
            onSelect={handleSelect}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
      <div
        className={`fixed grid grid-cols-3 gap-4 left-0 bottom-0 w-screen bg-white border-t border-gray-200 md:hidden ${
          !data.cases.length ? "hidden" : ""
        }`}
      >
        <ConditionsDialog
          condition={form.condition}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSelect={handleSelect}
          onSubmit={handleDiagnose}
        />
        <Button
          onClick={() => setIsOpen(true)}
          className="col-span-2"
          variant="primary"
        >
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
    </Container>
  );
}
