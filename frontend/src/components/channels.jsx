import { useGetChannelsQuery } from "../api/channelApi.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../slices/channelSlice.jsx';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import routes from "../utils/routes.js";
import cn from 'classnames';

const Channel = (props) => {

  const { id, name } = props.data;
  const activeChannel = useSelector((state) => state.channel.activeChannel);
  const dispatch = useDispatch();

  const handleClick = ({ id, name }) => {
    dispatch(setActiveChannel({ id, name }));
  }

  const classNames = cn({
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
    'btn': true,
    'btn-secondary': activeChannel?.id === id,
  })

  return (
    <li key={id} className='nav-item w-100'>
      <div role='group' className='d-flex dropdown dnt-group'>
        <button type='button' className={classNames} onClick={() => handleClick({ id, name })}>
          <span className='me-1'>#</span>{name}
        </button>
      </div>
    </li>)
}

const Channels = () => {
  const { data, error, isLoading, refetch, status } = useGetChannelsQuery();
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
    return <div>Ожидание загрузки чата</div>;
  }

  return (
    <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <button type='button' className='p-0 text-primary btn btn-group-vertical'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='20' height='20' fill='currentColor'>
            <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z'></path>
            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4'></path>
          </svg>
          <span className='visually-hidden'>+</span>
        </button>
      </div>
      <ul id='channels-box' className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
        {data.map((channel) => <Channel data={channel} />)}
      </ul>
    </div>
  )
}

export default Channels;