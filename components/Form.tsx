import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Animated, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Search } from '../types'

type FormProps = {
    search: Search
    setSearch: React.Dispatch<React.SetStateAction<Search>>
    setConsult: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Form({ search, setSearch, setConsult }: FormProps) {

    const [animationBtn] = useState(new Animated.Value(1))

    const { city, country } = search

    const searchWeather = () => {
        if (!city || !country) {
            return Alert.alert('Error', 'Both fields are required')
        }

        setConsult(true)
    }

    const animationIn = () => {
        Animated.spring(animationBtn, {
            toValue: .9,
            useNativeDriver: false
        }).start()
    }

    const animationOut = () => {
        Animated.spring(animationBtn, {
            toValue: 1,
            friction: 4,
            tension: 30,
            useNativeDriver: false
        }).start()
    }

    const animationStyle = {
        transform: [{ scale: animationBtn }]
    }

    return (
        <View>
            <View>
                <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={city => setSearch({ ...search, city })}
                    placeholder='City'
                    placeholderTextColor='#666'
                />
            </View>
            <View>
                <Picker
                    itemStyle={{ height: 120, backgroundColor: '#FFF' }}
                    selectedValue={country}
                    onValueChange={country => setSearch({ ...search, country })}
                >
                    <Picker.Item label='-- Select a country --' value='' />
                    <Picker.Item label='United States' value='US' />
                    <Picker.Item label='Mexico' value='MX' />
                    <Picker.Item label='Argentina' value='AR' />
                    <Picker.Item label='Colombia' value='CO' />
                    <Picker.Item label='Costa Rica' value='CR' />
                    <Picker.Item label='Spain' value='ES' />
                    <Picker.Item label='Peru' value='PE' />
                </Picker>
            </View>

            <TouchableWithoutFeedback
                onPressIn={() => animationIn()}
                onPressOut={() => animationOut()}
                onPress={() => searchWeather()}
            >
                <Animated.View style={[styles.btnSearch, animationStyle]}>
                    <Text style={styles.btnSearchText}>Search weather</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnSearch: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    btnSearchText: {
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18
    }
})