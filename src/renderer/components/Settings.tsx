import Button from '@components/Button';
import Input from '@components/Input';
import { useContext, useRef } from 'react';
import { BsGearFill } from 'react-icons/bs';
import { SettingsContext } from 'renderer/App';
import { capitalizeFirstLetter } from 'renderer/utils/helpers';

type Props = {};

const Settings = (props: Props) => {
  const toggleSettings = () => {
    if (!settingsPanelRef.current) return;
    settingsPanelRef.current.classList.toggle('translate-x-full');
  };
  const settingsPanelRef = useRef<HTMLDivElement>(null);

  const { updateSettings, settings } = useContext(SettingsContext);

  return (
    <>
      <Button onClick={toggleSettings}>
        <BsGearFill className="dark:fill-slate-200 fill-slate-900" />
      </Button>
      <div
        ref={settingsPanelRef}
        className="bg-slate-900 absolute w-screen h-screen top-0 transition-all duration-500 left-0 translate-x-full  p-8 "
      >
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl text-white">
            Hello {capitalizeFirstLetter(electron.getUserName())}!
          </h1>
          <Button onClick={toggleSettings}>Close</Button>
        </div>
        <form>
          <Input
            label="Time between notifications"
            value={settings.notifyPeriod}
            onChange={(e) =>
              updateSettings({ notifyPeriod: e.currentTarget.value })
            }
          />
          <p className="text-white">{settings.notifyPeriod}</p>
        </form>
      </div>
    </>
  );
};

export default Settings;
