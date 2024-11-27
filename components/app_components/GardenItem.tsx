import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

interface ItemProps {
  title: string
  id: string
}

interface gardenItemProps {
  gardenName: string
  background: string
  valveId: string
}

const GardenItem: React.FC<gardenItemProps> = ({
  gardenName,
  background,
  valveId,
}) => {
  const router = useRouter()

  const handlePress = () => {
    // Navega a la pantalla de detalles pasando el arreglo completo en JSON
    router.push({
      pathname: '/gardenPage',
      params: {
        itemId: 'hola',
        itemTitle: gardenName,
        spentWater: 123005,
        valveId: valveId,
      },
    })
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.item, { backgroundColor: `${background}` }]}>
        <View style={styles.itemPicture}></View>
        <Text style={styles.title}>{gardenName}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 18,
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 28,
    borderRadius: 18,
  },
  itemPicture: {
    display: 'flex',
    height: 46,
    width: 46,
    borderRadius: 12,
    backgroundColor: '#DADADA',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff', // Texto blanco
    textAlign: 'center',
  },
})

export default GardenItem
