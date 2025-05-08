import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { Octicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  size?: number;
}) {
  return <FontAwesome size={props.size || 28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <>
      <StatusBar style='light' />
      <Tabs
        screenOptions={{
          headerShown: true,
          headerBackgroundContainerStyle: {
            backgroundColor: Colors.dark.card,
          },
          headerStyle: {
            backgroundColor: Colors.dark.card,
            borderBottomWidth: 0,
          },
          tabBarStyle: {
            backgroundColor: Colors.dark.card,
            borderTopWidth: 0,
            height: hp('8%'),
          },
          headerTitleStyle: {
            color: Colors.dark.primary,
            fontFamily: 'OrbitronBold',
            fontSize: hp('3.0%'),
          },
          tabBarLabelStyle: {
            fontSize: hp('1.4%'),
            fontFamily: 'OrbitronBold',
          },
          tabBarActiveTintColor: Colors.dark.primary,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Converter',
            headerTitle: 'Bin2Dec',
            tabBarIcon: ({ color }) => <Octicons name="file-binary" color={color} size={20} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color }) => <TabBarIcon name="clipboard" color={color} size={20} />,
          }}
        />
      </Tabs>
    </>
  );
}
