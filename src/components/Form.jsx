import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

const FormInput = ({
  title = '',
  keyboardType = 'default',
  value = '',
  onChangeText = () => {},
  multiline = false,
}) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        keyboardType={keyboardType}
        placeholder={title}
        placeholderTextColor={'#666'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const Form = ({isVisible, savePatient, onClose}) => {
  const [patient, setPatient] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState('');

  const handleAppointment = () => {
    if ([patient, owner, email, date, symptoms].includes('')) {
      Alert.alert(
        'Validation error',
        'All fields are required',
        // [
        //   {text: 'OK', style: 'default'},
        //   {text: 'Cancel', style: 'cancel'},
        //   {text: 'Other text', style: 'destructive'},
        // ]
      );
      return;
    }

    const newPatient = {
      id: Date.now(),
      patient,
      owner,
      email,
      phone,
      date,
      symptoms,
    };

    savePatient(patients => [...patients, newPatient]);

    resetForm();
  };

  const resetForm = () => {
    setPatient('');
    setOwner('');
    setEmail('');
    setPhone('');
    setDate(new Date());
    setSymptoms('');
    onClose();
  };

  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
            New <Text style={styles.titleBold}>appointment</Text>
          </Text>

          <Pressable style={styles.btnCancel} onLongPress={resetForm}>
            <Text style={styles.btnCancelText}>x Cancel</Text>
          </Pressable>

          <FormInput
            title="Patient name"
            value={patient}
            onChangeText={setPatient}
          />
          <FormInput title="Owner name" value={owner} onChangeText={setOwner} />
          <FormInput
            title="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <FormInput
            title="Phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <View style={styles.field}>
            <Text style={styles.label}>Intake Date</Text>
            <View style={styles.datePicker}>
              <DatePicker date={date} onDateChange={setDate} />
            </View>
          </View>

          <FormInput
            title="Symptoms"
            value={symptoms}
            onChangeText={setSymptoms}
            multiline={true}
          />

          <Pressable
            style={styles.btnNewAppointment}
            onPress={handleAppointment}>
            <Text style={styles.btnNewAppointmentText}>Add patient</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6D28D9',
    flex: 1,
    marginBottom: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  titleBold: {
    fontWeight: '900',
  },
  btnCancel: {
    marginTop: 10,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  field: {
    marginTop: 10,
    marginHorizontal: 30,
    marginBottom: 10,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
  },
  inputMultiline: {
    height: 100,
  },
  datePicker: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  btnNewAppointment: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNewAppointmentText: {
    textAlign: 'center',
    color: '#5827A4',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 16,
  },
});
