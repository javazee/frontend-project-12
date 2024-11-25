import Channels from "./channels.jsx";
import Messages from "./messages.jsx";

const ChatPage = () => {
  console.log('render chat page');
  return (
    <div className='row h-100 bg-white flex-md-row'>
      <Channels />
      <Messages />
    </div>
  )
}

export default ChatPage;