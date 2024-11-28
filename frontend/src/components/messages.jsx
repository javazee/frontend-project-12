import { useGetMessagesQuery } from "../api/messagesApi.jsx";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import routes from "../utils/routes.js";

const Message = (props) => {
  const { id, body, username } = props.data;

  return (
    <div key={id} className='text-break mb-2'>
      <b>{username}</b>
      {`: ${body}`}
    </div>
  )
}

const Messages = () => {

  const { data, error, isLoading, refetch, status } = useGetMessagesQuery();
  const activeChannel = useSelector((state) => state.channel.activeChannel);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        navigate(routes.login);
      } else {
        console.error(error.message);
      }
    }
  }, []);

  if (isLoading) {
    return <div>Ожидание загрузки сообщений</div>;
  }

  console.log(data);

  const filteredMessages = data.filter((message) => message.channelId === activeChannel.id);

  return (
    <div className='col p-0 h-100'>
      <div className='d-flex flex-column h-100'>
        <div className='bg-light mb-4 p-3 shadow-sm small'>
          <p className='m-0'>
            <b>{`# ${activeChannel.name}`}</b>
          </p>
          <span className='text-muted'>{`${filteredMessages.length} сообщений`}</span>
        </div>
        <div id='messages-box' className='chat-messages overflow-auto px-5 '>
          {filteredMessages.map((message) => <Message data={message}/>)}
        </div>
        <div className='mt-auto px-5 py-3'><form novalidate='' className='py-1 border rounded-2'>
          <div className='input-group has-validation'>
            <input name='body' aria-label='Новое сообщение' placeholder='Введите сообщение...' className='border-0 p-0 ps-2 form-control' value='' />
            <button type='submit' disabled='' className='btn btn-group-vertical'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20' height='20' fill='currentColor'>
                <path fill-rule='evenodd' d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z'></path>
              </svg>
              <span className='visually-hidden'>Отправить</span>
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Messages;