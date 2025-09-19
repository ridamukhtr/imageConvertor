import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import RMText from '../Components/RMText'
import useThemeManager from '../CustomHooks/useThemeManager';
import RMSlide from '../Components/RMSlide';
import { Switch } from 'react-native-switch';

const Settings = () => {

  const { bgColor, fnToggleTheme } = useThemeManager();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    fnToggleTheme();
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor, padding: 10 }}>
      <View style={styles.body}>
        <RMText textStyle={styles.headerText}>Settings</RMText>
        <View style={styles.content}>
          <View style={{ width: '60%', alignItems: 'center', flexDirection: 'row' }}>
            <RMSlide children={'Change Theme'} />
          </View>
          <View style={{ width: '20%', alignItems: "center" }}>
            <Switch
              value={isEnabled}
              onValueChange={toggleSwitch}
              disabled={false}
              activeText={''}
              inActiveText={''}
              switchWidthMultiplier={1.5}
              backgroundActive={'#cccccc'}
              backgroundInactive={'#cccccc'}
              circleActiveColor={'#fff'}
              circleInActiveColor={'#fff'}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  body: { justifyContent: 'space-between', width: '95%', marginHorizontal: 10 },
  content: { width: '100%', backgroundColor: 'gray', borderRadius: 10, height: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerText: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, },
});

