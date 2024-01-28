import { View, Text } from 'react-native';

const Items = ({ items }) => {
  if (items === null || items.length === 0) return null;

  return(
    <View>
      { items.map( i => (
        <Text key={i.id}>{ i.name } ({ i.password })</Text>
      ))}
    </View>
  );
};

export default Items;