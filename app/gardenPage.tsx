import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useRouter } from 'expo-router'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import SwitchComponent from '@/components/app_components/SwitchComponent'
import TimePicker from '@/components/app_components/TimePicker'

interface gardenPageProps {
  gardenId: string
  targedGardenId: string
  valveId: string
}

const GardenPage: React.FC<gardenPageProps> = ({
  gardenId,
  targedGardenId,
}) => {
  const { itemId, itemTitle, spentWater, valveId } = useLocalSearchParams() // Obtiene los parámetros pasados

  const router = useRouter()
  const handlePress = () => {
    // Navega a la pantalla de detalles y pasa los parámetros como query string
    router.push({
      pathname: '/scheduleForm',
      params: { itemId: itemId, itemTitle: itemTitle },
    })
  }

  const handleGoBack = () => {
    router.back() // Vuelve a la pantalla anterior
  }

  // logic to comunicate with web sockets connection
  type MessageType = {
    id: number
    message: string
    startTime: string
  }

  const [userId, setUserId] = useState('yo')

  const [inputValue, setInputValue] = useState('')
  const [targetId, setTargetId] = useState('jesus3')
  const [messages, setMessages] = useState<MessageType[]>([])

  // const [time, setTime] = useState('')

  // Estado para la hora del time picker
  const [startTime, setStartTime] = useState(() => {
    const currentTime = new Date()
    currentTime.setHours(8) // Establece la hora (08:00 AM)
    currentTime.setMinutes(30) // Establece los minutos
    return currentTime
  })

  const [finishTime, setFinishTime] = useState(() => {
    const currentTime = new Date()
    currentTime.setHours(12) // Establece la hora (05:00 PM)
    currentTime.setMinutes(0) // Establece los minutos
    return currentTime
  })

  // Conectar al servidor WebSocket
  const ws = new WebSocket('ws://172.20.10.11:3001')

  // Guardar la conexión WebSocket en el estado
  // setSocket(ws)

  // Use effect para conectar con el socket
  useEffect(() => {
    ws.onopen = () => {
      console.log('Conectado al servidor WebSocket')
      // Enviar el ID del usuario al servidor WebSocket
      ws.send(JSON.stringify({ id: userId }))
    }

    ws.onmessage = (event) => {
      const message = event.data
      const parsedMessage = JSON.parse(message)
      console.log('Parsed message:', parsedMessage)
      setMessages((prevMessages) => [...prevMessages, parsedMessage])
    }

    // Limpiar el WebSocket al desmontar el componente
    return () => {
      console.log('Conexión cerrada')
      ws.close()
    }
  }, [userId, messages])

  const sendMessage = (valor: string) => {
    if (ws && targetId) {
      // Enviar el mensaje junto con el ID destino
      console.log('input value: ', inputValue)
      ws.send(
        JSON.stringify({
          id: userId,
          to: targetId,
          message: valor,
          valveId: valveId,
          startHour: startTime.toLocaleTimeString([], {
            hour: '2-digit',
            hour12: false,
          }),
          startMinute: startTime.toLocaleTimeString([], { minute: '2-digit' }),
          finishHour: finishTime.toLocaleTimeString([], {
            hour: '2-digit',
            hour12: false,
          }),
          finishMinute: finishTime.toLocaleTimeString([], {
            minute: '2-digit',
          }),
        })
      )
      setInputValue('')
    }
  }

  // estado para el switch component
  const [isOnOff, setIsOnOff] = useState(false)
  ws.onmessage = (event) => {
    const message = event.data
    const parsedMessage = JSON.parse(message)
    console.log('Parsed message:', parsedMessage)
    setMessages((prevMessages) => [...prevMessages, parsedMessage])
    console.log(parsedMessage.message)
    if (parsedMessage.message === '0') {
      setIsOnOff(false)
    } else {
      setIsOnOff(true)
    }
  }

  const handleToggle = (isOn: boolean) => {
    console.log()
    var numero
    console.log('Switch está:', isOn ? 'Encendido' : 'Apagado')
    if (isOn) {
      numero = '0'
    } else {
      numero = '180'
    }
    sendMessage(numero)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#6EC084', dark: '#588F68' }}
      headerComponent={
        <View style={styles.headerComponent}>
          <ThemedText style={styles.headerText}>Agua total gastada</ThemedText>
          <ThemedText style={styles.headerNumber}>{spentWater}lts</ThemedText>
        </View>
      }
    >
      {/* Tittle of the page */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>{itemTitle}</ThemedText>
      </ThemedView>
      {/* page content */}
      {/* switch button */}
      <ThemedView style={styles.switchContainer}>
        <View style={styles.switchTextComponent}>
          <ThemedText style={{ color: '#575757', fontSize: 21 }} type='title'>
            Estado de la valvula
          </ThemedText>
          <Text style={{ color: '#575757', fontSize: 13 }}>
            Puedes cambiar el estado de la válvula aunque haya un riego en
            proceso.
          </Text>
        </View>
        <View style={styles.switchSubcontainer}>
          <SwitchComponent sendDataToParend={handleToggle} onOff={isOnOff} />
        </View>
      </ThemedView>
      {/* time pickers */}
      <View>
        <ThemedView style={styles.timePickerContainer}>
          <TimePicker
            time={startTime}
            setTime={setStartTime}
            title='Inicio'
            color='#6FAF79'
          />
          <TimePicker
            time={finishTime}
            setTime={setFinishTime}
            title='Final'
            color='#5D9F73'
          />
        </ThemedView>
        <TouchableOpacity
          onPress={() => sendMessage('180')}
          style={styles.button}
        >
          <ThemedText style={styles.buttonText}>Establecer</ThemedText>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  // header styles
  headerComponent: {
    height: 210,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 32,
  },
  headerText: {
    bottom: -52,
    color: '#ffffff',
  },
  headerNumber: {
    lineHeight: 52,
    fontSize: 40,
    bottom: -48,
    fontWeight: '700',
    color: '#ffffff',
  },
  // tittle styles
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    color: '#575757',
  },
  // page and container styles
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#28a745', // Verde principal
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 62,
    left: 16,
    backgroundColor: '#28a745', // Fondo del botón
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#ffffff', // Texto blanco
    fontSize: 16,
  },
  // switch styles
  switchContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 52,
    paddingVertical: 16,
    borderRadius: 24,
    backgroundColor: '#6EC084',
    gap: 4,
  },
  switchTextComponent: {
    // width: '88%'
  },
  switchSubcontainer: {
    display: 'flex',
    justifyContent: 'center',
    height: 52,
    width: 68,
    backgroundColor: '#EFEFEF',
    borderRadius: 18,
  },
  // time picker styles
  timePickerContainer: {
    top: 12,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    marginTop: 22,
    alignItems: 'center',
    backgroundColor: '#82B584', // Color del botón primario
    paddingVertical: 22, // Espacio vertical
    paddingHorizontal: 20, // Espacio horizontal
    borderRadius: 30, // Bordes redondeados
    elevation: 3, // Sombra para dar profundidad
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20, // Tamaño de texto más grande
    fontWeight: 'bold', // Texto en negrita
  },
})

export default GardenPage
