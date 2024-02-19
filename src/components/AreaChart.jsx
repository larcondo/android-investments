import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

const AreaChart = ({ data }) => {

  if (!data) return null;
  if (data.length < 3) return null;

  return(
    <View style={{
      alignSelf: 'center',
      // backgroundColor: 'orange',
      width: screenWidth - 80,
      // maxWidth: screenWidth - 50,
    }}>
      <LineChart
        data={data}
        dataPointsRadius={3}
        thickness={5}
        color='#6CB4EE'
        dataPointsColor='darkgreen'
        // hideRules
        // hideYAxisText
        hideDataPoints
        initialSpacing={0}
        endSpacing={0}
        areaChart
        startFillColor='#6CB4EE'
        // endFillColor='blue'
        // backgroundColor={'red'}
        // hideOrigin
        xAxisColor={'lightgray'}
        xAxisThickness={2}
        yAxisColor={'black'}
        yAxisThickness={0}
        yAxisLabelSuffix={' %'}
        // width={screenWidth - 100}
        spacing={(screenWidth - 50) / data.length}
        // adjustToWidth
      />
    </View>
  );
};

export default AreaChart;