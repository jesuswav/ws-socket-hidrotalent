import React, { useState } from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

interface TimePickerProps {
  time?: Date // El prop 'time' es opcional ahora
  setTime: (newTime: Date) => void
  title: string
  color: string
}

const TimePicker: React.FC<TimePickerProps> = ({
  time,
  setTime,
  title,
  color,
}) => {
  const [showPicker, setShowPicker] = useState(true)

  // Si no se pasa 'time', utiliza la hora actual como valor por defecto
  const defaultTime = time || new Date()

  // Función para actualizar la hora seleccionada
  const onChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    const currentTime = selectedTime || defaultTime
    setShowPicker(Platform.OS === 'ios')
    setTime(currentTime)
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text style={styles.button}>{title}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={defaultTime || new Date()} // Utiliza la hora pasada o la hora actual como valor por defecto
          mode='time'
          display='default'
          onChange={onChange}
          style={styles.timePicker}
          accentColor='#ffffff'
          textColor='#4CA64C'
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    padding: 24,
  },
  timePicker: {
    // Puedes agregar estilos adicionales aquí si lo deseas
  },
  button: {
    fontSize: 18,
    fontWeight: '600',
    color: '#575757',
    left: -28,
    marginBottom: 12,
  },
})

export default TimePicker
