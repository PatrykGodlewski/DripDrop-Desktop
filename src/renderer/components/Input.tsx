import { camelCase } from 'lodash';
import type React from 'react';
import { capitalizeFirstLetter } from 'renderer/utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-slate-900 dark:text-white select-none"
        htmlFor={camelCase(label)}
      >
        {capitalizeFirstLetter(label)}
      </label>
      <input
        type="text"
        id={camelCase(label)}
        className="bg-slate-800 text-white rounded p-2 shadow-slate-800 shadow-md"
        {...rest}
      />
    </div>
  );
}

export default Input;
