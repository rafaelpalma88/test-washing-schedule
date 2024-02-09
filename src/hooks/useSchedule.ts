import { useContext } from 'react';

import { ScheduleContext } from '../contexts/ScheduleContext';

export function useSchedule() {
  const context = useContext(ScheduleContext);

  return context;
}
