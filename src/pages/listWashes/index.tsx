import { useNavigation } from "@react-navigation/native";
import { Button, Center, Heading, VStack, View, useToast } from "native-base"
import { Alert, ScrollView, Text } from "react-native"
import { AppNavigatorRoutesProps } from "../../routes";
import { useSchedule } from "../../hooks/useSchedule";
import { formatDate } from "../../lib/formatDate";
import { formatTime } from "../../lib/formatTime";

function ListWashes() {

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { sortedAppointments, onRemoveAppointment, onFinishAppointment } = useSchedule();

  const toast = useToast()

  async function handleRemoveAppointment(id: string) {

    try {
      Alert.alert("Remover agendamento", 'Deseja remover esse agendamento?', [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: async () => {
          await onRemoveAppointment(id)

          toast.show({
            title: 'Agendamento cancelado com sucesso',
            placement: 'top',
            bgColor: 'green.500'
          })

        }}
      ])
    } catch(error) {
      toast.show({
        title: `Erro ao cancelar ${error}`,
        placement: 'top',
        bgColor: 'red.500'
      })
    }

  }

  async function handleFinishAppointment(id: string) {

    try {
      Alert.alert("Finalizar agendamento", 'Deseja finalizar esse agendamento?', [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: async () => {
          await onFinishAppointment(id)

          toast.show({
            title: 'Agendamento finalizado com sucesso',
            placement: 'top',
            bgColor: 'green.500'
          })

        }}
      ])
    } catch(error) {
      toast.show({
        title: `Erro ao finalizar ${error}`,
        placement: 'top',
        bgColor: 'red.500'
      })
    }

  }

  return (
    <ScrollView
      // contentContainerStyle={{ flexGrow: 1 }}
      // showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Center mt={10} mb={10}>
          <Heading>Listagem da agenda</Heading>

        </Center>

        <VStack flex={1} paddingX={10}>
          {sortedAppointments && sortedAppointments.length >= 1 && sortedAppointments.map(appointment => (
            <View key={appointment.id} mb={10}>
              <View><Text>Data: {formatDate(appointment.date)}</Text></View>
              <View><Text>Horário: {formatTime(appointment.date)}</Text></View>
              <View><Text>Placa: {appointment.plate}</Text></View>
              <View mb={3}><Text>Tipo: {appointment.type}</Text></View>
              <View>
                <Button onPress={() => handleRemoveAppointment(appointment.id)} mb={2}>Cancelar agendamento</Button>
                <Button onPress={() => handleFinishAppointment(appointment.id)}>Concluir agendamento</Button>
              </View>
            </View>
          ))}
        </VStack>

        <Center mb={10}>
          <Text style={{ color: 'white'}}>
            <Button onPress={() => navigation.navigate('scheduleWash')}>Fazer agendamento</Button>
          </Text>
        </Center>

      </VStack>
    </ScrollView>
  )
}
export { ListWashes }
