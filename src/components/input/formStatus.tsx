import React from 'react';
import { useController, Control, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setStatusState } from 'store/events/statusSlice';
import { EventsFormDataI } from '_interfaces/events.interface';
import useUpsertEvents from 'hooks/events/useUpsertEvents';

interface EventStatusSelectorProps {
  control: Control<EventsFormDataI>;
  name: 'event_status';
  isStatusEvent: string;
  setValue: (name: keyof EventsFormDataI, value: string) => void;
}

const EventStatusSelector: React.FC<EventStatusSelectorProps> = ({ setValue, control, name, isStatusEvent }) => {
  const { field } = useController({ name, control });
  const dispatch = useDispatch();

  const handleStatusChange = (status: string) => {
    field.onChange(status);
    dispatch(setStatusState(status));
    setValue('location_name', '');
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="border-b-2 border-[#BDBDBD] flex justify-center cursor-pointer">
        <div
          onClick={() => handleStatusChange('OFFLINE')}
          className={`px-4 py-2 mx-2 font-semibold ${isStatusEvent === 'OFFLINE' ? 'border-b-4 border-[#27A590] text-[#27A590]' : 'text-[#7C7C7C]'}`}
        >
          Offline Event
        </div>
      </div>
      <div className="border-b-2 border-[#BDBDBD] flex justify-center cursor-pointer">
        <div
          onClick={() => handleStatusChange('ONLINE')}
          className={`px-4 py-2 mx-2 font-semibold ${isStatusEvent === 'ONLINE' ? 'border-b-4 border-[#27A590] text-[#27A590]' : 'text-[#7C7C7C]'}`}
        >
          Online Event
        </div>
      </div>
    </div>
  );
};

export default EventStatusSelector;