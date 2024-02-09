import { Box, Center, Heading, Input, Select, VStack, useToast } from "native-base"
import { Button, Platform, ScrollView, Text, View } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { TextInputMask } from 'react-native-masked-text';
import { validateMercosulPlate } from '../../lib/validateMercosulPlate'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from "react";
import { formatDate } from "../../lib/formatDate";
import { formatTime } from "../../lib/formatTime";
import { useSchedule } from '../../hooks/useSchedule'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { IAppointment } from "../../types/appointment";
import { AppNavigatorRoutesProps } from "../../routes";
import { useNavigation } from "@react-navigation/native";
import { checkEligibilitySchedule } from "../../lib/checkElegibilySchedule";
import { checkAlreadyExistentSchedule } from "../../lib/checkAlreadyExistentSchedule";

function ScheduleWash() {

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      plate: "",
      type: "SIMPLES",
      date: new Date(),
      time: new Date()
    },
  })
  const { onAddAppointment } = useSchedule();

  const toast = useToast()

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { appointments } = useSchedule();

  async function onSubmit(data: Omit<IAppointment, 'id'>) {
    const id = uuidv4();

    try {
      const appointment = { id, ...data}

      checkEligibilitySchedule(appointment.date, appointment.type)

      checkAlreadyExistentSchedule(appointments, appointment)

      await onAddAppointment(appointment)

      navigation.navigate('listWashed')

      toast.show({
        title: 'Agendamento adicionado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      reset()
    } catch (error) {
      toast.show({
        title: `Erro ao adicionar ${error}`,
        placement: 'top',
        bgColor: 'red.500'
      })
    }

  }

  const [date, setDate] = useState(new Date());
  const [showDateSelection, setShowDateSelection] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimeSelection, setShowTimeSelection] = useState(false);

  const showDatePicker = () => {
    setShowDateSelection(true);
  };

  const showTimePicker = () => {
    setShowTimeSelection(true);
  };

  return (
    <ScrollView
      // contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>

        <Center mt={10}>
          <Heading>Agendar uma lavagem</Heading>
        </Center>
        <Center mt={4} marginLeft={10} marginRight={10} flex={1} flexDirection="row">
          <Button onPress={() => navigation.navigate('listWashed')} title="Voltar para a lista" />
        </Center>
        <VStack>
          <Center mt={5} marginLeft={10} marginRight={10} flex={1} flexDirection="row">
            <Box flex={1}>
              <Text>Digite a placa no formato Mercosul</Text>
              <Controller
                control={control}
                rules={{
                  required: "A placa é obrigatória",
                  validate: validateMercosulPlate
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInputMask
                    style={{ height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 10 }}
                    placeholder="Placa"
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    type={'custom'}
                    autoCapitalize="characters"
                    options={{
                      mask: 'AAA9A99'
                    }}
                  />
                )}
                name="plate"
              />
              {errors.plate && <Text style={{ color: 'red', fontWeight: 'bold' }}>Há um erro com os dados digitados</Text>}
            </Box>
          </Center>
          <Center mt={10} marginLeft={10} marginRight={10} flex={1} flexDirection="row">
            <Box flex={1}>
              <Text>Selecione o tipo da Lavagem</Text>
              <Controller
                control={control}
                rules={{
                  required: "O tipo de seleção de lavagem é obrigatória",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    minWidth="200"
                    accessibilityLabel="Choose Service"
                    placeholder="Selecione o tipo de lavagem"
                    mt={1}
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                   >
                      <Select.Item label="Simples" value="SIMPLES" />
                      <Select.Item label="Completa" value="COMPLETA" />
                    </Select>
                )}
                name="type"
              />
              {errors.type && <Text style={{ color: 'red', fontWeight: 'bold' }}>Você precisa selecionar um tipo de lavagem</Text>}
            </Box>
          </Center>
          <Center mt={10} marginLeft={10} marginRight={10} flex={1} flexDirection="row">
            <Box flex={1}>
              <Text>Selecione a data</Text>

              <Controller
                control={control}
                name="date"
                rules={{
                  required: "A data é obrigatória",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      value={formatDate(date)}
                      isDisabled
                      mb={5}
                    />
                    {showDateSelection && (
                      <DateTimePicker
                        testID="datePicker"
                        value={date}
                        mode={"date"}
                        display="spinner"
                        onChange={(event, selectedDate) => {
                          setShowDateSelection(Platform.OS === 'ios');
                          setDate(selectedDate || date);
                          onChange(selectedDate || date);
                        }}
                      />
                    )}

                  </>
                )}

              />
              <Button onPress={showDatePicker} title="Selecionar Data" />
              {errors.date && <Text style={{ color: 'red', fontWeight: 'bold' }}>Você precisa selecionar uma data</Text>}
            </Box>
          </Center>
          <Center mt={10} marginLeft={10} marginRight={10} flex={1} flexDirection="row">
            <Box flex={1}>
              <Text>Selecione o horário</Text>

              <Controller
                control={control}
                name="date"
                rules={{
                  required: "O horário é obrigatório",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      value={formatTime(time)}
                      isDisabled
                      mb={5}
                    />
                    {showTimeSelection && (
                      <DateTimePicker
                        testID="hourTimePicker"
                        value={date}
                        mode="time"
                        display="spinner"
                        is24Hour={true}
                        onChange={(event, selectedDate) => {
                          setShowTimeSelection(Platform.OS === 'ios');
                          setTime(selectedDate || date);
                          onChange(selectedDate || date);
                        }}
                      />
                    )}
                  </>
                )}
              />
              <Button onPress={showTimePicker} title="Selecionar Horário" />
              {errors.time && <Text style={{ color: 'red', fontWeight: 'bold' }}>Você precisa selecionar um horário</Text>}
            </Box>
          </Center>
          <Center mt={10} marginLeft={10} marginRight={10} flex={1} flexDirection="row">
            <Button title="Agendar" onPress={handleSubmit(onSubmit)} />
          </Center>

        </VStack>
      </VStack>
    </ScrollView>
  )

}
export { ScheduleWash }
