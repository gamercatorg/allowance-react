import * as React from "react";
import { StyleSheet, Text, View, TextInput, Picker, Button } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { setBalance } from '../actions'

const centsToPrettyString = (cents) => (cents / parseFloat(100)).toLocaleString("en-US", { style: "currency", currency: "USD" })
const uglyStringToCents = (str) => Math.round(100 * parseFloat(str.replace(/[$,]/g, '')))

export default function EditScreen() {
  const accounts = useSelector(_ => _.accounts);
  const dispatch = useDispatch();

  const [selectedAccountId, setSelectedAccountId] = React.useState(null);
  const [textboxValue, onChangeTextboxValue] = React.useState('');

  const selectAccount = (id) => {
    setSelectedAccountId(id)
    const { balanceCents } = accounts.find(a => a.id == id)
    const pretty = centsToPrettyString(balanceCents)
    onChangeTextboxValue(pretty)
  }

  const selectedAccount = accounts.find(a => a.id == selectedAccountId) || {}

  const handleSave = () => {
    const newBalance = uglyStringToCents(textboxValue);
    const payload = setBalance({ id: selectedAccountId, balanceCents: newBalance });
    dispatch(payload)
    const pretty = centsToPrettyString(newBalance);
    onChangeTextboxValue(pretty)
  }

  React.useEffect(() => {
    if (textboxValue == '' && accounts.length > 0) selectAccount(accounts[0].id)
  }, [textboxValue, accounts])

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.root}>
        <View style={styles.balanceEditor}>
          <TextInput style={styles.input} value={textboxValue} onChangeText={text => onChangeTextboxValue(text)} />
          {accounts && selectedAccount && (
            <Picker
              selectedValue={selectedAccount.id}
              style={styles.picker}
              onValueChange={(id) => selectAccount(id)}
            >
              {(accounts).map(a => (<Picker.Item key={a.id} label={a.name} value={a.id} />))}
            </Picker>
          )}
        </View>

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
  picker: {
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
