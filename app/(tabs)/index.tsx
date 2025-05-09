import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import AnimatedRollingNumber from 'react-native-animated-rolling-numbers';
import { Easing } from 'react-native-reanimated';
import { useConversionStore } from '@/store/useConversionStore';
import Colors from '@/constants/Colors';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { isValidBinary } from '@/utils/validation';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default function HomeScreen() {
  const [binaryInput, setBinaryInput] = useState("");
  const [number, setNumber] = useState(0);
  const [errorText, setErrorText] = useState("");
  const addConversion = useConversionStore((state) => state.addConversion);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [note, setNote] = useState("");

  const handleInputChange = (text: string) => {
    if (isValidBinary(text)) {
      setBinaryInput(text);
      setNumber(parseInt(text, 2));
    } else {
      console.log("Invalid binary input");
    }
  };

  const confirmSave = () => {
    if (binaryInput && !errorText) {
      addConversion({
        binary: binaryInput,
        decimal: number,
        note: note.trim() || "",
      });
      setBinaryInput("");
      setNumber(0);
      setErrorText("");
      setNote("");
    }
    setIsModalVisible(false);
  };

  const handleSavePress = () => {
    if (binaryInput) {
      setIsModalVisible(true);
    } else if (!binaryInput) {
      setErrorText("Please enter a binary number to save.");
    } else {
      // If there's an errorText but binaryInput is not empty,
      // it means the input is invalid. The error is already shown.
    }
  };

  const cancelSave = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.dark.background }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <View>
          <Text style={[{ color: Colors.dark.primary }, styles.title]}>Binary to Decimal Converter</Text>
          <Text style={[{ color: Colors.dark.foreground }, styles.subTitle]}>Transform binary numbers into their decimal equivalents instantly. Enter up to 8 binary digits and see the conversion magic happen.</Text>
        </View>

        {/* CARD */}
        <View style={[{ backgroundColor: Colors.dark.card }, styles.card]}>
          <Text style={{ color: Colors.dark.foreground, fontFamily: 'JetbrainsMonoBold' }}>Enter Binary Number (0s and 1s only)</Text>

          {/* INPUT */}
          <View style={{ flexDirection: 'row', backgroundColor: 'transparent', marginTop: 7, overflow: 'hidden' }}>
            <TextInput
              value={binaryInput}
              onChangeText={handleInputChange}
              maxLength={8}
              style={{
                backgroundColor: Colors.dark.muted,
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                height: 45,
                paddingHorizontal: 10,
                fontFamily: 'JetbrainsMono',
                color: Colors.dark.foreground,
                width: '87%',
              }}
              keyboardType='numeric'
              placeholder='e.g. 10101010'
              placeholderTextColor={Colors.dark.placeholder}
            />
            <TextInput
              style={{
                backgroundColor: Colors.dark.muted,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                paddingHorizontal: 10,
                fontFamily: 'JetbrainsMono',
                color: Colors.dark.foreground,
              }}
              readOnly
              keyboardType='numeric'
              placeholder={
                // show the number of digits in the input out of 8
                binaryInput.length > 0 ? `${binaryInput.length}/8` : "0/8"
              }
              placeholderTextColor={Colors.dark.placeholder}
            />
          </View>

          {/* RESULT */}
          <View style={{ backgroundColor: Colors.dark.muted, marginTop: 23, padding: 23, borderRadius: 8 }}>
            <Text style={{ color: Colors.dark.foreground, fontFamily: 'JetbrainsMono' }}>Decimal Result</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 16, borderRadius: 6, overflow: 'hidden', backgroundColor: Colors.dark.card }}>
              <AnimatedRollingNumber
                value={number}
                textStyle={{
                  fontSize: hp('2.5%'),
                  color: Colors.dark.primary,
                  fontFamily: 'OrbitronBold',
                  paddingVertical: 6,
                }}
                spinningAnimationConfig={{ duration: 500, easing: Easing.bezier(0.4, 0, 0.2, 1) }}
              />
            </View>
          </View>

          {/* BUTTONS */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 23, backgroundColor: 'transparent' }}>
            {/* CLEAR */}
            <TouchableOpacity
              onPress={() => {
                setBinaryInput("");
                setNumber(0);
                setErrorText("");
              }}
              style={{
                backgroundColor: Colors.dark.muted,
                paddingVertical: 10,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                borderRadius: 6,
              }}
            >
              <Feather name="trash-2" size={14} color={Colors.dark.foreground} style={{ marginRight: 5 }} />
              <Text style={{
                color: Colors.dark.foreground, fontFamily: 'JetbrainsMono'
              }}>Clear</Text>
            </TouchableOpacity>

            {/* SAVE */}
            <TouchableOpacity
              onPress={handleSavePress}
              style={{
                backgroundColor: Colors.dark.primary,
                paddingVertical: 10,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                borderRadius: 6,
              }}
            >
              <FontAwesome6 name="floppy-disk" size={14} color={Colors.dark.foreground} style={{ marginRight: 5 }} />
              <Text style={{
                color: Colors.dark.foreground, fontFamily: 'JetbrainsMono'
              }}>Save Conversion</Text>
            </TouchableOpacity>
          </View>


        </View>

        {/* INFO CARD */}
        <View style={[{ backgroundColor: Colors.dark.card }, styles.card]}>
          <Text style={{ color: Colors.dark.foreground, fontFamily: "OrbitronBold", fontSize: hp('2.4%') }}>How Binary to Decimal Conversion Works</Text>

          {/* 1 */}
          <Text style={{
            color: Colors.dark.foreground,
            backgroundColor: Colors.dark.primary,
            borderRadius: 100,
            paddingHorizontal: 8,
            paddingVertical: 2,
            alignSelf: 'flex-start',
            marginTop: 10,
          }}>1</Text>
          <Text style={{ color: Colors.dark.foreground, fontFamily: "JetbrainsMono", fontSize: hp('1.4%'), marginTop: 5 }}>Each position in a binary number represents a power of 2, starting from 2^0 (1) at the rightmost position.</Text>

          {/* 2 */}
          <Text style={{
            color: Colors.dark.foreground,
            backgroundColor: Colors.dark.primary,
            borderRadius: 100,
            paddingHorizontal: 8,
            paddingVertical: 2,
            alignSelf: 'flex-start',
            marginTop: 10,
          }}>2</Text>
          <Text style={{ color: Colors.dark.foreground, fontFamily: "JetbrainsMono", fontSize: hp('1.4%'), marginTop: 5 }}>For example, the binary number 1011 represents: (12^3) + (0×2^2) + (1×2^1) + (1×2^0) = 8 + 0 + 2 + 1 = 11 in decimal.</Text>

          {/* 3 */}
          <Text style={{
            color: Colors.dark.foreground,
            backgroundColor: Colors.dark.primary,
            borderRadius: 100,
            paddingHorizontal: 8,
            paddingVertical: 2,
            alignSelf: 'flex-start',
            marginTop: 10,
          }}>3</Text>
          <Text style={{ color: Colors.dark.foreground, fontFamily: "JetbrainsMono", fontSize: hp('1.4%'), marginTop: 5 }}>Our converter instantly calculates this conversion for you as you type, supporting binary numbers up to 8 digits (maximum decimal value: 255).</Text>
        </View>
      </View >

      {/* CONFIRMATION MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={cancelSave}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: Colors.dark.card }]}>
            <Text style={[{ color: Colors.dark.primary, fontSize: hp('3%'), fontFamily: 'OrbitronBold' }]}>Save Conversion</Text>

            {/* Conversion Info */}
            <View style={{ marginTop: 16, backgroundColor: Colors.dark.muted, padding: 16, borderRadius: 6, gap: 8, width: '100%' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
                <Text style={{ color: Colors.dark.mutedForeground, fontFamily: 'JetbrainsMono', fontSize: hp('1.8%') }}>Binary: </Text>
                <Text style={{ color: Colors.dark.foreground, fontFamily: 'JetbrainsMonoBold', fontSize: hp('1.8%') }}>{binaryInput}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
                <Text style={{ color: Colors.dark.mutedForeground, fontFamily: 'JetbrainsMono', fontSize: hp('1.8%') }}>Decimal: </Text>
                <Text style={{ color: Colors.dark.foreground, fontFamily: 'JetbrainsMonoBold', fontSize: hp('1.8%') }}>{number}</Text>
              </View>
            </View>

            {/* Notes Input (Optional) */}
            <View style={{ marginTop: 16, backgroundColor: 'transparent', width: '100%', gap: 8 }}>
              <Text style={[{ color: Colors.dark.foreground, fontSize: hp('1.6%'), fontFamily: 'JetbrainsMono' }]}>Add a Note (Optional)</Text>
              <TextInput
                multiline
                value={note}
                onChangeText={setNote}
                numberOfLines={4}
                textAlignVertical='top'
                style={{
                  backgroundColor: Colors.dark.muted,
                  borderRadius: 6,
                  height: 96,
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  fontFamily: 'JetbrainsMono',
                  color: Colors.dark.foreground,
                  width: '100%',
                }}
                placeholder='Why are you saving this conversion?'
                placeholderTextColor={Colors.dark.placeholder}
              />
            </View>

            {/* Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, backgroundColor: 'transparent', width: '100%' }}>
              <Pressable
                style={[styles.button, { backgroundColor: Colors.dark.muted }]}
                onPress={cancelSave}>
                <Text style={[styles.textStyle, { color: Colors.dark.foreground }]}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, { backgroundColor: Colors.dark.secondary }]}
                onPress={confirmSave}>
                <Text style={[styles.textStyle, { color: Colors.dark.muted }]}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 48,
    padding: 24,
    borderRadius: 8,
  },
  title: {
    fontSize: hp('2.5%'),
    textAlign: "center",
    fontFamily: "OrbitronBold",
  },
  subTitle: {
    textAlign: "center",
    marginTop: 16,
    fontSize: hp('1.5%'),
    fontFamily: "JetbrainsMonoBold",
  },
  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    margin: 20,
    borderRadius: 6,
    padding: 24,
    alignItems: 'flex-start',
  },
  button: {
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: 'JetbrainsMonoBold',
    fontSize: hp('1.5%'),
  },
});
