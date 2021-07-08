import { Dialog as LDialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  fullscreen?: boolean;
}

export default function Dialog({
  isOpen,
  onClose,
  children,
  className = "",
  fullscreen = false,
}: DialogProps) {
  const contentWrapperClassName = fullscreen ? "p-0" : "px-4";
  const contentClassName = fullscreen
    ? "w-screen h-screen p-0"
    : "w-full rounded-2xl max-w-md  my-8";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <LDialog
        as="div"
        className={`fixed inset-0 z-10 overflow-y-auto`}
        onClose={onClose}
      >
        <LDialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className={`min-h-screen text-center ${contentWrapperClassName}`}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`inline-block p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl ${contentClassName} ${className}`}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </LDialog>
    </Transition>
  );
}
