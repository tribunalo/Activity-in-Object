import { Button, FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
const userData = [
  { id: 1, firstname: 'John', lastname: 'Doe', nickname: 'JD', course: 'Computer Science', year: '3rd' },
  { id: 2, firstname: 'Jane', lastname: 'Smith', nickname: 'JS', course: 'Electrical Engineering', year: '2nd' },
  { id: 3, firstname: 'Mae', lastname: 'Epe', nickname: 'Mae', course: 'Criminal Justice', year: '2nd' },
  { id: 4, firstname: 'Mary Jane', lastname: 'Sanchez', nickname: 'MJ', course: 'Information Technology', year: '3rd' },
  { id: 5, firstname: 'Nikka Jane', lastname: 'Tribunalo', nickname: 'Niks', course: 'Information Technology', year: '3rd' },
  { id: 6, firstname: 'Deborah Jane', lastname: 'Antopina', nickname: 'Deb', course: 'Information Technology', year: '3rd' },
  { id: 7, firstname: 'Liezel', lastname: 'Budlong', nickname: 'Budz', course: 'Computer Science', year: '2nd' },
  { id: 8, firstname: 'Rica', lastname: 'Rapatan', nickname: 'Rica', course: 'Information Technology', year: '2nd' },
  { id: 9, firstname: 'John Carlo', lastname: 'Namor', nickname: 'Carlo', course: 'Information Technology', year: '3rd' },
  { id: 10, firstname: 'Karl', lastname: 'Loquias', nickname: 'Karl', course: 'Information Technology', year: '3nd' },
  { id: 11, firstname: 'Peter', lastname: 'Parker', nickname: 'Spiderman', course: 'Criminal Justice', year: '1st' },
  { id: 12, firstname: 'Iron', lastname: 'Man', nickname: 'MJ', course: 'Information Technology', year: '3rd' },
  { id: 13, firstname: 'John', lastname: 'Doe', nickname: 'JD', course: 'Computer Science', year: '3rd' },
  { id: 14, firstname: 'Jane', lastname: 'Smith', nickname: 'JS', course: 'Electrical Engineering', year: '2nd' },
  { id: 15, firstname: 'Mae', lastname: 'Epe', nickname: 'Mae', course: 'Criminal Justice', year: '2nd' },
  { id: 16, firstname: 'Mary Jane', lastname: 'Sanchez', nickname: 'MJ', course: 'Information Technology', year: '3rd' },

];

const Scrollview = ({ onBackPress, data, onSelectUser }) => (
  <View  style={{height:300}}>
    <ScrollView style={styles.userInfoContainer}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.userItem}
          onPress={() => onSelectUser(item)}
        >
          <Text style={styles.userName}>{`${item.firstname} ${item.lastname}`}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  </View>
);

const Flatlisting = ({ onBackPress, data, onSelectUser }) => (
  <View>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.userItem}
          onPress={() => onSelectUser(item)}
        >
          <Text style={styles.userName}>{`${item.firstname} ${item.lastname}`}</Text>
        </TouchableOpacity>
      )}
    />
    <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
  </View>
);

const UserDetailsModal = ({ visible, user, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    {user && (
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.userInfoText}>{`Name: ${user.firstname} ${user.lastname}`}</Text>
              <Text style={styles.userInfoText}>{`Nickname: ${user.nickname}`}</Text>
              <Text style={styles.userInfoText}>{`Course: ${user.course}`}</Text>
              <Text style={styles.userInfoText}>{`Year: ${user.year}`}</Text>
            </ScrollView>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )}
  </Modal>
);

export default function App() {
  const [scrollview, setScrollview] = useState(false);
  const [flatlisting, setFlatlisting] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleScrollview = () => {
    setScrollview(!scrollview);
    setFlatlisting(false);
  };

  const toggleFlatlisting = () => {
    setFlatlisting(!flatlisting);
    setScrollview(false);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignContent: 'center', alignSelf: 'center', justifyContent: 'space-between', columnGap: 100 }}>
        <View>
          <Button title="ScrollView" onPress={toggleScrollview} disabled={scrollview || flatlisting} />
        </View>
        <View></View>
        <Button title="Flatlist" onPress={toggleFlatlisting} disabled={scrollview || flatlisting} />
      </View>
      <View>
        {scrollview && <Scrollview onBackPress={toggleScrollview} data={userData} onSelectUser={openModal} />}
        {flatlisting && <Flatlisting onBackPress={toggleFlatlisting} data={userData} onSelectUser={openModal} />}
      </View>
      <UserDetailsModal visible={isModalVisible} user={selectedUser} onClose={closeModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    margin: 20
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%'
  },
  modalContent: {
    maxHeight: 200
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center'
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16
  },
  backButtonText:{
    marginTop:50,
    backgroundColor:'skyblue',
    borderWidth:1,
    borderRadius:20,
    textAlign:'center',

  }
});