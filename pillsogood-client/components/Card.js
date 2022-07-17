import React from "react";
import { View, Text, Button } from "react-native"


const Card = () => {

    return (
        <View style={styles.box}>
            <Text>약 복용하셨나요?</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    box: {
        width: 240,
        height: 120,
        backgroundColor: '#DDECCA',
        borderRadius: 16,
    }
})
export default Card;


