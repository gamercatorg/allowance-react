import * as React from "react";
import { StyleSheet, Text, View, TextInput, Picker } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import allowance from '../lib/allowance'
import useAllowance from '../lib/allowanceHook'

export default function EditScreen() {

  const { balances, isLoaded, isLoading, error, weeksSinceStart } = useAllowance();
  const [currentAccount, setCurrentAccount] = React.useState('savings');
  const [textboxValue, onChangeTextboxValue] = React.useState('');
  
  React.useEffect(() => {
    onChangeTextboxValue(balances[currentAccount])
  }, [balances, currentAccount])

  const handleTextboxChange = (text) => {
    onChangeTextboxValue(text)
  }

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.text}>Leo is the best!</Text>
      <Text style={styles.text}>&nbsp;</Text>
      <Text style={styles.text}>&nbsp;</Text>
      <Text style={styles.text}>&nbsp;</Text>
      <Text style={styles.text}>&nbsp;</Text>
      <Text style={styles.text}>&nbsp;</Text>
      <Text style={styles.text}>&nbsp;</Text>
      <View style={{width: '600px' }}>

        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} value={textboxValue} onChangeText={text => handleTextboxChange(text)} />
        <Text style={styles.text}>&nbsp;</Text>
        <Text style={styles.text}>&nbsp;</Text>
        <Picker
          selectedValue={currentAccount}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setCurrentAccount(itemValue)}
        >
        <Picker.Item label="Savings" value="savings" />
        <Picker.Item label="Instant Spending" value="instantSpending" />
        <Picker.Item label="Charity" value="charity" />
      </Picker>
        <Text style={styles.text}>&nbsp;</Text>
        <Text style={styles.text}>&nbsp;</Text>

        <TouchableOpacity
          onPress={() => {
            const val = Math.round(100 * parseFloat(textboxValue.replace(/[$,]/g, '')))
            allowance.setBalance(currentAccount, val)
          }}
          style={{ backgroundColor: 'blue', width: '200px' }}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Save</Text>
        </TouchableOpacity>

        <Text style={styles.text}>&nbsp;</Text>
        <Text style={styles.text}>&nbsp;</Text>

        <TouchableOpacity
          onPress={() => allowance.flush()}
          style={{ backgroundColor: 'red', width: '200px' }}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Flush data</Text>
        </TouchableOpacity>
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
  }
});
