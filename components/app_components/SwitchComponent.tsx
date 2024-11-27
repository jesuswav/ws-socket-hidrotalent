import React, { useState } from 'react'
import { View, Switch, StyleSheet, Text } from 'react-native'

interface SwitchComponentProps {
  sendDataToParend: (data: boolean) => void
  onOff: boolean
}

const SwitchComponent: React.FC<SwitchComponentProps> = ({
  sendDataToParend,
  onOff,
}) => {
  const [isEnabled, setIsEnabled] = useState(onOff)

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev)
    sendDataToParend(isEnabled)
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{isEnabled ? 'Encendido' : 'Apagado'}</Text> */}
      <Switch
        trackColor={{ false: '#ccc', true: '#A4DE97' }}
        thumbColor={isEnabled ? '#4CA64C' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
})

export default SwitchComponent
