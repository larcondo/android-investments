import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet } from 'react-native';

const Dropdown = ({ value, items, onValueChange }) => {
  return(
    <RNPickerSelect
      value={value}
      placeholder={{}}
      onValueChange={onValueChange}
      items={items}
      style={styles.dropDown}
    />
  );
};

const styles = StyleSheet.create({
  dropDown: {
    inputWeb: {
      padding: 10,
      fontSize: 16,
      margin: 10,
    },
    inputAndroid: {
      backgroundColor: '#fafafa',
      margin: 10,
    }
  },
});

export default Dropdown;