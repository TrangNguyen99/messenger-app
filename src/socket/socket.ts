import {io} from 'socket.io-client';
import {store} from '../app/store';
import {chatAction} from '../feature/chat/slice/chatSlice';

const URL = 'https://clone-messengerr.herokuapp.com';
const socket = io(URL, {autoConnect: false});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on('private message', ({from, to, message}) => {
  store.dispatch(chatAction.receiveMessage({from, to, message}));
});

export default socket;
