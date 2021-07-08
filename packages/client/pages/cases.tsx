import { Fragment, useState } from "react";
import Container from "../components/Container";
import { Listbox, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from "../components/Dialog";

const people = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
];
export default function Cases() {
  const [selected, setSelected] = useState(people[0]);
  const [search, setSearch] = useState("");
  const [step, setStep] = useState(0);

  return (
    <Container className="relative">
      <div className="page-header">
        <a href="#">
          <span className="sr-only">Workflow</span>
          <img
            className="h-8 w-auto sm:h-10"
            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
          />
        </a>
      </div>
      <main className="page-main bg-gray-100">
        <div className="gap-5 md:p-12 text-left">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-bold text-gray-900">
                Health Record #11
              </h2>
            </div>

            <div className="border-t border-gray-200">
              <div className="bg-gray-50 p-5">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Autocomplete
              id="custom-input-demo"
              options={people}
              open
              renderInput={(params: any) => (
                <div ref={params.InputProps.ref}>
                  <input
                    type="text"
                    {...params.inputProps}
                    className={`${params.inputProps.className} w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm`}
                  />
                </div>
              )}
            />
          </div>
          <Dialog fullscreen isOpen={step === 1} onClose={() => setStep(0)}>
            <div className="flex flex-start items-center p-2 gap-4 border-b border-gray-200">
              <button
                onClick={() => setStep(0)}
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
            <div className="flex flex-col overflow-auto ">
              {people
                .filter((p) => p.toLowerCase().includes(search.toLowerCase()))
                .map((p) => (
                  <div
                    key={p}
                    className="flex items-center p-4 border-b border-gray-200"
                    onClick={() => setSearch(p)}
                  >
                    <span>{p}</span>
                  </div>
                ))}
            </div>
            <div className="fixed left-0 bottom-0 w-screen bg-white border-t border-gray-200 md:hidden px-4 py-3">
              <button
                type="button"
                className={`w-full bg-blue-500 px-4 py-3 rounded text-gray-200 font-semibold hover:bg-blue-600 transition duration-200 each-in-out`}
              >
                Submit
              </button>
            </div>
          </Dialog>
        </div>
      </main>
      <div className="fixed left-0 bottom-0 w-screen bg-white border-t border-gray-200 md:hidden">
        <button
          onClick={() => setStep(1)}
          type="button"
          className="w-full bg-blue-500 px-4 py-3 rounded text-gray-200 font-semibold hover:bg-blue-600 transition duration-200 each-in-out"
        >
          Diagnose
        </button>
      </div>
    </Container>
  );
}
