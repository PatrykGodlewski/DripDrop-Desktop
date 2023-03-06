import { useReducer } from 'react';
import Button from './Button';
import Input from './Input';

type TUserData = {
  email?: string;
  password?: string;
};
type TReducerUserData = (prev: TUserData, next: TUserData) => TUserData;

function Login() {
  const [userData, updateUserData] = useReducer<TReducerUserData>(
    (prev, next) => {
      return { ...prev, ...next };
    },
    { email: '', password: '' }
  );

  function onSubmit(formData: FormDataEvent) {
    console.log(formData.);

    formData.preventDefault();
  }
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col bg-slate-900 p-14 m-14 rounded-lg gap-4"
    >
      <h1 className="text-white text-3xl font-black">Login</h1>
      <Input
        value={userData.email}
        onChange={(e) => updateUserData({ email: e.target.value })}
        type="text"
        label="email"
      />
      <Input
        value={userData.password}
        onChange={(e) => updateUserData({ password: e.target.value })}
        type="password"
        label="password"
      />
      <Button submit onChange={() => console.log('xd')}>
        Login
      </Button>
    </form>
  );
}

export default Login;
