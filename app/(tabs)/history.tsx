import { StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native';

import { useConversionStore } from '@/store/useConversionStore';
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function HistoryScreen() {
  const conversions = useConversionStore((state) => state.conversions);
  const deleteConversion = useConversionStore((state) => state.deleteConversion);

  return (
    <View style={[{ backgroundColor: Colors.dark.background }, styles.container]}>
      <Text style={[{ color: Colors.dark.foreground, alignSelf: 'center' }, styles.title]}>Saved Conversions</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={conversions}
        renderItem={({ item }) => (
          <View style={[{ backgroundColor: Colors.dark.card }, styles.historyItem]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'transparent' }}>
                <Text style={{ fontFamily: 'JetbrainsMono', fontSize: hp('2.4%'), color: Colors.dark.primary }}>{item.binary}</Text>
                <Text style={{ fontFamily: 'JetbrainsMono', fontSize: hp('1.9%'), color: Colors.dark.foreground }}>= {item.decimal}</Text>
              </View>
              {/* Delete Button */}
              <TouchableOpacity
                onPress={() => {
                  deleteConversion(item.id ?? '');
                }}
                style={{ backgroundColor: 'transparent' }}
              >
                <FontAwesome name="trash-o" size={28} color={Colors.dark.danger} />
              </TouchableOpacity>
            </View>
            <Text style={{ fontFamily: 'JetbrainsMono', fontSize: hp('1.6%'), color: Colors.dark.mutedForeground, marginTop: 24 }}>Note:</Text>
            <Text style={{ fontFamily: 'JetbrainsMono', fontSize: hp('2.0%'), color: Colors.dark.foreground }}>{item.note}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id ?? ''}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: hp('3.4%'),
    fontFamily: 'OrbitronBold',
    marginBottom: 16,
    alignSelf: 'flex-start'
  },
  list: {
    width: '100%',
    gap: 8,
  },
  historyItem: {
    padding: 16,
    borderRadius: 8,
  },
});
