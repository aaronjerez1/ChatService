import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import Chat from './components/Chat';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const[users, setUsers] = useState([]);


  const joinRoom = async (user,room) => {
    try {
      const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:3000")
      .configureLogging(LogLevel.Information)
      .build();

      connection.on("UsesInRoom", (users) => {
        setUsers(users);
      });

      connection.on("ReceivedMessage", (user, message) => {
        setMessages(messages = [...message, { user, message}]);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
  } catch(e) {
     console.log(e);
   }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }

  const SendMessage= async(message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }




  return <div className="app">
    <h2>Chat</h2>
    <hr className='line'/>
    {!connection 
    ? <Lobby joinRoom={joinRoom}/>
    : <Chat messages={messages} sendMessage={sendMessage} 
    closeConnection= {closeConnection} users={users}/> }
  </div>
}


export default App;
