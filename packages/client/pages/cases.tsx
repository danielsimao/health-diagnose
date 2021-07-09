import { useRef, useState } from "react";
import Button from "../components/Button";
import ConditionsDialog from "../components/cases/ConditionsDialog";
import ConditionsSection from "../components/cases/ConditionsSection";
import ReadyDialog from "../components/cases/ReadyDialog";
import Container from "../components/Container";

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
export default function Cases() {
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(people[0]);
  const [form, setForm] = useState<{
    condition: null | string;
    time: null | number;
  }>({ condition: null, time: null });
  const [step, setStep] = useState(0);
  const [search, setSearch] = useState(form.condition || "");
  const ref = useRef<HTMLDivElement>(null);

  function handleDiagnose() {
    if (form.condition) {
      setStep(0);
    }
  }

  function handleSelect(condionOption: string) {
    setForm({ condition: condionOption, time: null });
  }

  return (
    <Container
      className={`relative h-screen ${!ready ? "filter blur-sm" : ""}`}
    >
      <ReadyDialog
        isOpen={!ready}
        onClose={() => setReady(true)}
        onReady={() => setReady(true)}
      />
      <ConditionsDialog
        form={form}
        isOpen={step === 1}
        onClose={() => setStep(0)}
        onSelect={handleSelect}
        onSubmit={handleDiagnose}
      />
      <div className="page-header">
        <a href="#">
          <span className="sr-only">Workflow</span>
          <img
            className="h-8 w-auto sm:h-10"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
          />
        </a>
      </div>
      <main className="page-main bg-gray-100 overflow-hidden">
        <div className="flex flex-row gap-5 text-left md:py-20">
          <div className="flex-1">
            <div
              id="ehr"
              className="bg-white shadow overflow-hidden rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-bold text-gray-900">
                  Health Record #11
                </h2>
              </div>
              <div className="border-t border-gray-200">
                <div className="bg-gray-50 p-5">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </div>
              <div className="border-t border-gray-200 p-5">
                Condition: UKNOWN
              </div>
            </div>
          </div>
          <ConditionsSection
            form={form}
            isOpen={step === 1}
            onClose={() => setStep(0)}
            onSelect={handleSelect}
            onSubmit={handleDiagnose}
          ></ConditionsSection>
        </div>
      </main>
      <div className="fixed grid grid-cols-3 gap-4 left-0 bottom-0 w-screen bg-white border-t border-gray-200 md:hidden">
        <Button
          onClick={() => setStep(1)}
          className="col-span-2"
          variant="primary"
        >
          Diagnose
        </Button>
        <Button
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
