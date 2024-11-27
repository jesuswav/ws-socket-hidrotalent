// FormModal.tsx
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'

interface FormModalProps {
  onClose: () => void
  onSubmit: (formData: { name: string; email: string }) => void
}

const FormModal: React.FC<FormModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '' })

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <ThemedView style={styles.modalContainer}>
      <ThemedView style={styles.modalContent}>
        <ThemedView style={{ paddingVertical: 12 }}>
          {/* <Ionicons name='remove-outline' size={100} color='white' /> */}
          <View
            style={{
              display: 'flex',
              height: 5,
              width: 62,
              borderRadius: 16,
              backgroundColor: 'gray',
            }}
          ></View>
        </ThemedView>
        <ThemedText style={styles.modalTitle}>
          Agrega un nuevo huerto
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder='Nombre'
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder='Correo electrónico'
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType='email-address'
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <ThemedText style={styles.submitButtonText}>Enviar</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <ThemedText style={styles.closeButtonText}>Cerrar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContent: {
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 52,
    borderTopRightRadius: 52,
    paddingVertical: 14,
    paddingHorizontal: 28,
    // paddingTop: 52,
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32', // Verde oscuro
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 54,
    padding: 12,
    borderColor: '#a5d6a7', // Verde más claro
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 15,
  },
  submitButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#66bb6a', // Verde intermedio
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    width: '100%',
    backgroundColor: '#388e3c', // Verde oscuro
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    height: 52,
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default FormModal
