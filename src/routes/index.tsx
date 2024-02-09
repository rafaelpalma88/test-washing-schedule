import { NavigationContainer } from '@react-navigation/native'

import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack'
import { ListWashes } from '../pages/listWashes'
import { ScheduleWash } from '../pages/scheduleWash'

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>()

type AppRoutes = {
  listWashed: undefined
  scheduleWash: undefined
}

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>

function Routes() {

  return (
    <NavigationContainer>
       <Navigator screenOptions={{ headerShown: false }} initialRouteName="listWashed">
        <Screen name="listWashed" component={ListWashes} />
        <Screen name="scheduleWash" component={ScheduleWash} />
      </Navigator>
    </NavigationContainer>
  )
}

export { Routes }
