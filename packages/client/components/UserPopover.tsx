import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { Fragment } from "react";
import { useUser } from "../lib/hooks";

export default function UserPopover() {
  const user = useUser();
  const userInitialChar: string = user.name[0];

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
                    ${open ? "" : "text-opacity-90"}
                    group	border bg-white border-gray-300 shadow-sm px-2 py-1 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <ChevronDownIcon
              className={`${open ? "" : "text-opacity-70"}
                      h-5 w-5 text-gray-600 group-hover:text-opacity-80 transition ease-in-out duration-150`}
              aria-hidden="true"
            />
            <span className="ml-2 inline-flex justify-center items-center rounded-full bg-blue-400 text-lg text-white bg-white w-8 h-8">
              {userInitialChar.toUpperCase()}
            </span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 mt-3 right-0 top-full">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-white">
                  <div className="flex flex-row gap-2 p-4">
                    <div className="flex items-center justify-center flex-shrink-0 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                    </div>
                  </div>
                  <Link passHref href="/api/logout">
                    <div className="flex flex-row gap-2 p-4 cursor-pointer">
                      <div className="flex items-center justify-center flex-shrink-0 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <div className="flex items-center transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                        <p className="text-sm font-medium text-gray-900">
                          Logout
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
