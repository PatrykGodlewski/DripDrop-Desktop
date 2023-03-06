interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  submit?: boolean;
}

function Button({ submit, children, ...rest }: ButtonProps) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`dark:text-white dark:bg-slate-800 hover:bg-slate-700 transition-color rounded ${
        typeof children === 'string' ? 'p-2  px-4' : 'p-2'
      } `}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  submit: false,
};

export default Button;
