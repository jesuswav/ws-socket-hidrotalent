import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'

const DetailsScreen: React.FC = () => {
  const { itemId, itemTitle } = useLocalSearchParams() // Obtiene los parámetros pasados
  const router = useRouter() // Hook para la navegación

  const handleGoBack = () => {
    router.back() // Vuelve a la pantalla anterior
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>
      <Text style={styles.text}>ID del Itemmmmmmmmmm: {itemId}</Text>
      <Text style={styles.text}>Título del Item: {itemTitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
  text: {
    fontSize: 24,
    color: '#28a745', // Verde principal
    fontWeight: 'bold',
    marginVertical: 10,
  },
})

export default DetailsScreen
