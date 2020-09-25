import React, { useRef } from 'react'
import {  
  Text, 
  View,  
  StyleSheet, 
  PanResponder } from 'react-native'

const MouseInput = () => {

  const socket = new WebSocket('ws://192.168.0.4:8080')

  const sendMovement = (gestureState) => {
    socket.send(`X: ${Math.floor(gestureState.dx)} - Y: ${Math.floor(gestureState.dy)}`)
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        sendMovement(gestureState)
      }
    })
  ).current

  return(
    <View {...panResponder.panHandlers} style={[styles.input, styles.blackBorder]}>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '5%',
    backgroundColor: 'grey'
  },
  blackBorder: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 7
  }
})

export default MouseInput