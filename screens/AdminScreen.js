import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Button
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { setAllowance, disperseAllowance } from "../actions";
import PinCodeInput from "../components/PincodeInput";

const centsToPrettyString = cents =>
  (cents / parseFloat(100)).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
const uglyStringToCents = str =>
  Math.round(100 * parseFloat(str.replace(/[$,]/g, "")));
const dateToPrettyString = d => moment(d).format("L");

export default function AdminScreen() {
  const dispatch = useDispatch();
  const pinCode = useSelector(_ => _.pinCode);
  const allowanceCents = useSelector(_ => _.allowanceCents);
  const allowanceLastDistributed = useSelector(_ => _.allowanceLastDistributed);
  const accounts = useSelector(_ => _.accounts)

  const [locked, setLocked] = React.useState(true); // Typically you would never EVER implement security in this way but for our silly little app it should be okay
  const [allowanceStr, setAllowanceStr] = React.useState(
    centsToPrettyString(allowanceCents)
  );

  const weeksSinceLastDispersed = moment().diff(
    allowanceLastDistributed,
    "weeks"
  );

  const amountToDisperse =
    weeksSinceLastDispersed * uglyStringToCents(allowanceStr);

    const [selectedAccountId, setSelectedAccountId] = React.useState(null);
    const [textboxValue, onChangeTextboxValue] = React.useState("$");
  
    const selectedAccount = accounts.find(a => a.id == selectedAccountId) || {};
    React.useEffect(() => {
      if (selectedAccountId == null && accounts.length > 0)
        setSelectedAccountId(accounts[0].id);
    }, [selectedAccountId, accounts]);
  
    const currentBalance =
      selectedAccount && selectedAccount.balanceCents
        ? selectedAccount.balanceCents
        : 0;
    let newBalance =
      currentBalance - Math.max(uglyStringToCents(textboxValue) || 0, 0);
  
    const handleSave = () => {
      if (newBalance <= 0) {
        const wanted = centsToPrettyString(uglyStringToCents(textboxValue));
        alert(
          "You need " +
            centsToPrettyString(Math.abs(newBalance)) +
            " more to extract " +
            wanted +
            "!"
        );
      } else {
        const payload = setBalance({
          id: selectedAccountId,
          balanceCents: newBalance
        });
        dispatch(payload);
        onChangeTextboxValue("$");
      }
    };

  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {locked && (
        <View>
          <PinCodeInput
            pinCode={pinCode}
            onCorrect={() => {
              setLocked(false);
            }}
          />
        </View>
      )}
      {!locked && (
        <View style={styles.adminContainer}>
          <Text>Allowance amount: (per account)</Text>
          <View style={styles.allowanceAmount}>
            <TextInput
              style={styles.input}
              value={allowanceStr}
              onChangeText={setAllowanceStr}
            />
            <Button
              title="Save"
              onPress={() => {
                dispatch(
                  setAllowance({
                    allowanceCents: uglyStringToCents(allowanceStr)
                  })
                );
              }}
            />
          </View>
          <View style={{marginTop: '20px'}}>
              <View><Text style={{textAlign: 'center'}}>Edit amount of money</Text></View>

            <View style={styles.balanceEditor}>
              <TextInput
                style={styles.input}
                value={textboxValue}
                onChangeText={text => onChangeTextboxValue(text)}
              />
              {accounts && selectedAccount && (
                <Picker
                  selectedValue={selectedAccount.id}
                  style={styles.accountPicker}
                  onValueChange={id => setSelectedAccountId(id)}
                >
                  {accounts.map(a => (
                    <Picker.Item key={a.id} label={a.name} value={a.id} />
                  ))}
                </Picker>
              )}
            </View>

            <Text style={{ ...styles.text, fontSize: 24, textAlign: "center" }}>
              Current balance is: {centsToPrettyString(currentBalance)}
            </Text>
            <Text style={{ ...styles.text, fontSize: 24, textAlign: "center" }}>
              New balance will be: {centsToPrettyString(newBalance)}
            </Text>

            <View style={styles.buttonWrap}>
              <Button title="Save" onPress={() => handleSave()} />
            </View>
          </View>
          <View style={{ marginTop: "50px" }}>
            <Button
              title="Lock"
              onPress={() => {
                setLocked(true);
              }}
              color="#de4134"
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
    display: "flex",
    alignItems: "center",
    paddingTop: "20px"
  },
  text: {
    color: "black"
  },
  input: {
    height: "30px",
    flexGrow: 1,
    marginRight: "20px",
    backgroundColor: "#e3e8ee",
    padding: "5px"
  },
  allowanceAmount: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginBottom: "10px"
  },
  balanceEditor: {
    display: "flex",
    flexDirection: "row",
    margin: "10px"
  },
  accountPicker: {
    minWidth: "200px"
  },
  buttonWrap: {
    backgroundColor: "red",
    minWidth: "100px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "25px"
  }
});
