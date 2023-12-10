import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';

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

const FlatListNames = ({ data, onSelectUser }) => (
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
);

const ScrollViewNames = ({ data, onSelectUser }) => (
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatListNames data={userData} onSelectUser={openModal} />
      <ScrollViewNames data={userData} onSelectUser={openModal} />
      <UserDetailsModal visible={isModalVisible} user={selectedUser} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
  },
  userInfoContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flex: 1,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    width: '80%',
    borderRadius: 8,
  },
  modalContent: {
    maxHeight: 200,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});