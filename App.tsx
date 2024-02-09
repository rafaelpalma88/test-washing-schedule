import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'react-native';
import { Routes } from './src/routes';
import { ScheduleProvider } from './src/contexts/ScheduleContext';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar
          barStyle="dark-content"
        />
        <ScheduleProvider>
          <Routes />
        </ScheduleProvider>
    </NativeBaseProvider>
  );
}
