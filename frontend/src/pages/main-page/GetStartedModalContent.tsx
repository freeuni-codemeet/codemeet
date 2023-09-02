import { Link } from "react-router-dom";
import React from "react";

interface GetStartedModalContentProps {
  closeModal: () => void;
}

const GetStartedModalContent = ({
  closeModal,
}: GetStartedModalContentProps) => {
  return (
    <div className="relative w-full max-w-md max-h-full">
      <div className="relative rounded-lg shadow-lg bg-slate-800">
        <button
          type="button"
          onClick={closeModal}
          className="absolute top-3 right-2.5 text-slate-600 bg-transparent rounded-lg text-lg w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-slate-700 hover:text-white"
        >
          <svg
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        <div className="px-6 py-6 lg:px-8">
          <p className="mb-4 text-3xl font-medium text-white">
            Sign in to our platform
          </p>
          <form className="space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-slate-700 border-slate-700 placeholder-gray-400 text-white"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="text-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 bg-slate-700 border-gslate-700 placeholder-gray-400 text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-xl px-5 py-2.5 text-center bg-sky-600 hover:bg-sky-700"
            >
              Login to your account
            </button>
            <div className="text font-medium text-gray-300">
              Not registered?
              <Link to="/register" className="hover:underline text-sky-500">
                {" "}
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetStartedModalContent;
