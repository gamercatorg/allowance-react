import * as React from "react";
import { StyleSheet, View } from "react-native";
import ReactCodeInput from 'react-code-input'

export default function PincodeInput({ pinCode, onCorrect = () => {} }) {

    if (!pinCode) {
        throw new Error('Must pass pincode')
    }

    const handleChange = (input) => {
        if (input == pinCode) onCorrect()
    }

    return (
        <View style={styles.container}>
            <ReactCodeInput type="number" fields={pinCode.length} inputMode="number" onChange={handleChange} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '30px'
    }
});
