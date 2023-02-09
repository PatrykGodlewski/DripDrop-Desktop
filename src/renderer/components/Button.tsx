type Props = { submit?: boolean } & React.HTMLAttributes<HTMLButtonElement>;

const Button = ({ onClick, submit, children }: Props) => {
  return (
    <button
      onClick={onClick}
      type={submit ? 'submit' : 'button'}
      className={`dark:text-white dark:bg-slate-800 hover:bg-slate-700 transition-color rounded ${
        typeof children === 'string' ? 'p-2  px-4' : 'p-2'
      } `}
    >
      {children}
    </button>
  );
};

export default Button;
