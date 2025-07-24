import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ConsultResult } from '../types'

type WeatherProps = {
    result: ConsultResult
}

export default function Weather({ result }: WeatherProps) {
    console.log(result)
    const { name, main } = result

    if (!name) return null

    const kelvin = 273.15

    return (
        <View style={styles.weather}>
            <Text style={[styles.text, styles.current]}>
                {parseInt((main.temp - kelvin).toString())} {''}
                <Text style={styles.temp}>
                    &#x2103;
                </Text>
                <Image
                    style={{ width: 66, height: 58 }}
                    source={{ uri: `http://openweathermap.com/img/w/${result.weather[0].icon}.png` }}
                />
            </Text>

            <View style={styles.temps}>
                <Text style={styles.text}>
                    <Text style={styles.temp}> Max: {''}
                        {parseInt((main.temp_max - kelvin).toString())} &#x2103;
                    </Text>
                </Text>

                <Text style={styles.text}>
                    <Text style={styles.temp}> Min: {''}
                        {parseInt((main.temp_min - kelvin).toString())} &#x2103;
                    </Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weather: {
        marginBottom: 20
    },
    text: {
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginRight: 20
    },
    current: {
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temp: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    temps: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})