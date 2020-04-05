import * as React from "react";
import { StyleSheet, Text, View, TextInput, Picker, Button } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setBalance, adjustBalance } from '../actions'

const centsToPrettyString = (cents) => (cents / parseFloat(100)).toLocaleString("en-US", { style: "currency", currency: "USD" })
const uglyStringToCents = (str) => Math.round(100 * parseFloat(str.replace(/[$,]/g, '')))

export default function EditScreen() {
  const accounts = useSelector(_ => _.accounts);
  const dispatch = useDispatch();

  const [selectedAccountId, setSelectedAccountId] = React.useState(null);
  const [textboxValue, onChangeTextboxValue] = React.useState('$');

  const selectedAccount = accounts.find(a => a.id == selectedAccountId) || {}
  React.useEffect(() => {
    if (selectedAccountId == null && accounts.length > 0) setSelectedAccountId(accounts[0].id)
  }, [selectedAccountId, accounts])


  const currentBalance = selectedAccount && selectedAccount.balanceCents ? selectedAccount.balanceCents : 0
  const newBalance = currentBalance - Math.max(uglyStringToCents(textboxValue) || 0, 0)

  const handleSave = () => {
    const payload = setBalance({ id: selectedAccountId, balanceCents: newBalance });
    dispatch(payload)
    onChangeTextboxValue('$')
  }

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.root}>

      <Text style={{ ...styles.text, fontSize: 32, textAlign: 'center' }}>Withdraw Money</Text>

        <View style={styles.balanceEditor}>
          <TextInput style={styles.input} value={textboxValue} onChangeText={text => onChangeTextboxValue(text)} />
          {accounts && selectedAccount && (
            <Picker
              selectedValue={selectedAccount.id}
              style={styles.accountPicker}
              onValueChange={(id) => setSelectedAccountId(id)}
            >
              {(accounts).map(a => (<Picker.Item key={a.id} label={a.name} value={a.id} />))}
            </Picker>
          )}
        </View>

        <Text style={{ ...styles.text, fontSize: 24, textAlign: 'center' }}>Current balance is: {centsToPrettyString(currentBalance)}</Text>
        <Text style={{ ...styles.text, fontSize: 24, textAlign: 'center' }}>New balance will be: {centsToPrettyString(newBalance)}</Text>

        <View style={styles.buttonWrap}>
          <Button
            title="Save"
            onPress={() => handleSave()}
          />
        </View>

        <Text style={styles.text}>&nbsp;</Text>
        <Text style={styles.text}>&nbsp;</Text>
      </View>
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
  text: {
    color: 'black'
  },
  root: {
    width: 600,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  balanceEditor: {
    display: 'flex',
    flexDirection: 'row',
    margin: '10px'
  },
  input: {
    height: '40px',
    flexGrow: 1,
    marginRight: '20px',
    backgroundColor: '#e3e8ee',
    padding: '5px'
  },
  accountPicker: {
    minWidth: '200px'
  },
  buttonWrap: {
    backgroundColor: 'red',
    minWidth: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '25px'
  }
});
