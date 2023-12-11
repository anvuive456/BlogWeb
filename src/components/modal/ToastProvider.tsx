'use client'

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //add this line

const contextClass = {
  success: "text-blue-800 dark:text-blue-400 bg-blue-50",
  error: "text-red-800 dark:text-red-400 bg-red-50",
  info: "text-green-800 dark:text-green-400 bg-green-50",
  warning: "text-yellow-800 dark:text-yellow-400 bg-yellow-400",
  default: "text-gray-800 dark:text-gray-400 bg-gray-600",
  dark: "bg-white-600 font-gray-300",
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({children}: ToastProviderProps) {
  return (
      <>
        {children}
        <ToastContainer
            bodyClassName='ms-3 text-sm font-medium'
            hideProgressBar={true}
            toastClassName={(context) => contextClass[context?.type || 'default'] + ' flex items-center p-4 mb-4 rounded-lg'}
            position='top-right' draggable={false}/>
      </>
  );
}
