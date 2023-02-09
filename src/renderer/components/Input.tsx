import { camelCase } from 'lodash';

type Props = {
  value: string;
  label: string;
} & React.HTMLAttributes<HTMLInputElement>;

function Input({ value, onChange, label }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-slate-900 dark:text-white select-none"
        htmlFor={camelCase(label)}
      >
        {label}
      </label>
      <input
        type="text"
        id={camelCase(label)}
        className="bg-slate-800 text-white rounded p-2 shadow-slate-800 shadow-md"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
