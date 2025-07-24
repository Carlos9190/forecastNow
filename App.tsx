import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Form from './components/Form'
import { useEffect, useState } from 'react'
import { ConsultResult, Search } from './types'
import Weather from './components/Weather'

const initialSearch: Search = {
  city: '',
  country: ''
}

const initialConsult: ConsultResult = {
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0
  },
  name: '',
  weather: [
    {
      icon: ''
    }
  ]
}

export default function App() {

  const [search, setSearch] = useState(initialSearch)
  const [consult, setConsult] = useState(false)
  const [result, setResult] = useState<ConsultResult>(initialConsult)
  const [bgColor, setBgColor] = useState('rgb(71, 149, 212)')

  const { city, country } = search

  useEffect(() => {
    const consultWeather = async () => {
      if (consult) {
        try {
          const appId = '98e78e2a8ebc796875d2005b33ba4f07'
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`

          const response = await fetch(url)
          const result = await response.json()
          setResult(result)
          setConsult(false)

          const kelvin = 273.15
          const { main } = result
          const current = main.temp - kelvin

          if (current < 10) {
            setBgColor('rgb(105, 108, 149)')
          } else if (current >= 10 && current < 25) {
            setBgColor('rgb(71, 149, 212)')
          } else {
            setBgColor('rgb(178, 28, 61)')
          }
        } catch (error) {
          Alert.alert('Error', 'There is not result, try again')
        }
      }
    }

    consultWeather()
  }, [consult])

  const hideKeyboard = () => {
    Keyboard.dismiss()
  }

  const bgColorApp = {
    backgroundColor: bgColor
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => hideKeyboard()}
    >
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.content}>
          <Weather
            result={result}
          />
          <Form
            search={search}
            setSearch={setSearch}
            setConsult={setConsult}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  content: {
    marginHorizontal: '2.5%'
  }
})