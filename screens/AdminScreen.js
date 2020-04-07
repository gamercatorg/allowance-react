import * as React from "react";
import { StyleSheet, Text, View, TextInput, Picker, Button } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import { setAllowance, disperseAllowance } from '../actions'
import PinCodeInput from '../components/PincodeInput'

const centsToPrettyString = (cents) => (cents / parseFloat(100)).toLocaleString("en-US", { style: "currency", currency: "USD" })
const uglyStringToCents = (str) => Math.round(100 * parseFloat(str.replace(/[$,]/g, '')))
const dateToPrettyString = (d) => moment(d).format('L')

export default function AdminScreen() {
  const dispatch = useDispatch();
  const pinCode = useSelector(_ => _.pinCode);
  const allowanceCents = useSelector(_ => _.allowanceCents);
  const allowanceLastDistributed = useSelector(_ => _.allowanceLastDistributed);

  const [locked, setLocked] = React.useState(true); // Typically you would never EVER implement security in this way but for our silly little app it should be okay
  const [allowanceStr, setAllowanceStr] = React.useState(centsToPrettyString(allowanceCents));

  const weeksSinceLastDispersed = moment().diff(allowanceLastDistributed, 'weeks')

  const amountToDisperse = weeksSinceLastDispersed * uglyStringToCents(allowanceStr)

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {locked && (
        <View>
          <PinCodeInput pinCode={pinCode} onCorrect={() => { setLocked(false) }} />
        </View>
      )}
      {!locked && (
        <View style={styles.adminContainer}>
          <Text>Allowance amount: (per account)</Text>
          <View style={styles.allowanceAmount}>
            <TextInput style={styles.input} value={allowanceStr} onChangeText={setAllowanceStr} />
            <Button
              title="Save"
              onPress={() => { dispatch(setAllowance({ allowanceCents: uglyStringToCents(allowanceStr) })) }}
            />
          </View>
          <View>
            <Text style={{ marginBottom: '20px' }}>Allowance was last distributed {dateToPrettyString(allowanceLastDistributed)}</Text>
            <Button
              title={`Disperse ${centsToPrettyString(amountToDisperse)}`}
              onPress={() => { dispatch(disperseAllowance({ pinCode, disperseCents: amountToDisperse })) }}
            />
          </View>
          <View style={{marginTop: '50px'}}>
            <Button
              title="Lock"
              onPress={() => { setLocked(true) }}
              color='#de4134'
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 15
  },
  adminContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '20px'
  },
  text: {
    color: 'black'
  },
  input: {
    height: '30px',
    flexGrow: 1,
    marginRight: '20px',
    backgroundColor: '#e3e8ee',
    padding: '5px'
  },
  allowanceAmount: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px',
    marginBottom: '10px'
  },
});
