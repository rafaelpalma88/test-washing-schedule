import { ReactNode, createContext, useEffect, useState } from "react";
import { IAppointment } from "../types/appointment";
import AsyncStorage from '@react-native-async-storage/async-storage';

type ScheduleContextProviderProps = {
  children: ReactNode
}

type ScheduleContextDataProps = {
  appointments: IAppointment[]
  sortedAppointments: IAppointment[]
  onAddAppointment: (appointment: IAppointment) => void;
  onRemoveAppointment: (id: string) => void
  onFinishAppointment: (id: string) => void
}

export const ScheduleContext = createContext<ScheduleContextDataProps>({} as ScheduleContextDataProps);

export function ScheduleProvider({ children }: ScheduleContextProviderProps) {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [sortedAppointments, setSortedAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    setSortedAppointments(appointments)
  }, [appointments])

  useEffect(() => {
    // getAsyncScheduleList()
    // corrigir bug na obtenção dos dados do AsyncStorage
  }, [])

  async function getAsyncScheduleList() {
    const list = await AsyncStorage.getItem('@washing-schedule');

    if (list !== null) {
      const parsedList = JSON.parse(list);
      await setAppointments(parsedList);
    }
  }

  async function onAddAppointment(appointment: IAppointment) {

    try {

      await setAppointments(state => [...state, appointment ])

      const storage = JSON.stringify([...appointments, appointment]);

      await AsyncStorage.setItem('@washing-schedule', storage);

    } catch(error) {
      console.error(error)
    }
  }

  async function onRemoveAppointment(id: string) {

    const newAppointments = appointments.filter(item => item.id !== id)
    await setAppointments(newAppointments)

    await AsyncStorage.setItem(
      '@washing-schedule',
      JSON.stringify(newAppointments),
    );
  }

  async function onFinishAppointment(id: string) {


    const newAppointments = appointments.filter(item => item.id !== id)
    await setAppointments(newAppointments)

    await AsyncStorage.setItem(
      '@washing-schedule',
      JSON.stringify(newAppointments),
    );
  }

  return (
    <ScheduleContext.Provider
      value={{
        appointments,
        sortedAppointments,
        onAddAppointment,
        onRemoveAppointment,
        onFinishAppointment
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );

}

