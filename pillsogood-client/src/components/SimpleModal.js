import React, { useState } from "react";
import {
    StyleSheet,
    View, Text,
    TouchableOpacity, Dimensions
}   from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT_MODAL = 150;

const SimpleModal = (props) => {

    closeModal = (bool, data) => {
        props.changeModalVisible(bool);
        props.setData(data);
    }


    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >
            <View style={styles.modal}>
                <View style={styles.textView}>
                    <Text
                        style={[styles.text, { fontSize: 20 }]}>
                        modal Header
                    </Text>
                    <Text
                        style={styles.text}>
                        modal description
                    </Text>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.TouchableOpacity}
                        onPress={() => closeModal(false, 'Cancel')}
                    >
                        <Text
                            style={[styles.text, { color: 'red' }]}
                        >Cancel </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.TouchableOpacity}
                        onPress={() => closeModal(false, 'Ok')}
                    >
                        <Text
                            style={[styles.text, { color: 'black' }]}
                        >Ok </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alingItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: HEIGHT_MODAL,
        width: WIDTH - 80,
        paddingTop: 10,
        backgroundColor: 'white',
        opacity: 0.7,
        boderRadius: 10
    },
    textView: {
        flex: 1,
        alingItems: 'center'
    },
    text: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonView: {
        width: '100%',
        flexDirection: 'row',

    },
    TouchableOpacity: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center'
    }
})

export { SimpleModal }