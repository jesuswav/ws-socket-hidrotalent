import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  Platform,
  View,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native'

import { HelloWave } from '@/components/HelloWave'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

// local components
import GardenItem from '@/components/app_components/GardenItem'
import NewGarden from '@/components/app_components/NewGarden'
import FormModal from '@/components/app_components/FormModal'

export default function HomeScreen() {
  // simulación de datos desde la api
  const [gardens, setGarden] = useState([
    { gardenName: 'Huerto Uno', color: '#5D9F73', valveId: 'valve1' },
    { gardenName: 'Huerto Dos', color: '#6FAF79', valveId: 'valve2' },
    { gardenName: 'Huerto Dos', color: '#82B584', valveId: 'valve3' },
  ])

  // control del modal
  const [modalVisible, setModalVisible] = useState(false)

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  // Función para manejar el envío del formulario
  const handleFormSubmit = (formData: { name: string; email: string }) => {
    console.log(
      'Formulario enviado',
      `Nombre: ${formData.name}, Email: ${formData.email}`
    )
    // Aquí puedes manejar los datos del formulario como guardarlos o enviarlos a una API
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#6EC084', dark: '#588F68' }}
      headerComponent={
        <View style={styles.headerComponent}>
          <ThemedText style={styles.headerText}>Agua total gastada</ThemedText>
          <ThemedText style={styles.headerNumber}>421,567lts</ThemedText>
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>
          Mis Huertos
        </ThemedText>
        <View>
          <NewGarden title='New garden' onPress={handleOpenModal} />
        </View>
      </ThemedView>

      {/* Items de los huertos */}
      <ThemedView style={{ gap: 16 }}>
        {gardens.map((item, index) => (
          <GardenItem
            key={index}
            gardenName={item.gardenName}
            background={item.color}
            valveId={item.valveId}
          />
        ))}
      </ThemedView>

      {/* Modal */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <FormModal
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
              />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    color: '#575757',
  },
  stepContainer: {
    marginBottom: 16,
  },
  reactLogo: {
    height: 400,
    width: 240,
    position: 'absolute',
    top: -8,
    bottom: 0,
    left: 0,
    transform: [{ rotate: '70deg' }],
  },
  input: {
    marginTop: 16,
    height: 50, // Altura del input
    borderColor: '#ccc', // Color del borde en modo claro
    borderWidth: 1, // Borde más delgado
    borderRadius: 30, // Bordes redondeados
    paddingHorizontal: 15,
    color: '#333', // Texto en color oscuro para mejor legibilidad
    backgroundColor: '#fff', // Fondo blanco
    fontSize: 16, // Tamaño de fuente
  },
  button: {
    marginTop: 22,
    alignItems: 'center',
    backgroundColor: '#4CA64C', // Color del botón primario
    paddingVertical: 15, // Espacio vertical
    paddingHorizontal: 20, // Espacio horizontal
    borderRadius: 30, // Bordes redondeados
    elevation: 3, // Sombra para dar profundidad
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18, // Tamaño de texto más grande
    fontWeight: 'bold', // Texto en negrita
  },
  switchButton: {
    // top: 18
  },
  timePickerContainer: {
    top: 12,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  // modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
})
