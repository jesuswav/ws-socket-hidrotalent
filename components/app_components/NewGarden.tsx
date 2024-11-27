import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Definimos los tipos de las props que recibirá el botón
interface NewGardenProps {
  title: string;
  onPress: () => void; // Función sin parámetros de retorno void
}

const NewGarden: React.FC<NewGardenProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A4DE9F',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NewGarden;
