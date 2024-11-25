import { useFormik } from 'formik';
import { setUser, setToken } from '../slices/authSlice.jsx';
import axios from 'axios';
import { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../utils/routes';

const LoginPage = () => {

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token',token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token')
    }
  }, [token]);
  

  const handleSubmit = async (values, actions) => {

    await axios.post('/api/v1/login', values)
      .then(({ data }) => {
        if (data.token) {
          dispatch(setToken(data.token));
          dispatch(setUser(data.username));
          navigate(routes.main);
        } else {
          setError('authentication error');
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        actions.setSubmitting(false);
      })
  }
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                <img src='/assets/avatar-DIE1AEpS.jpg' className='rounded-circle' alt='Войти' />
              </div>
              <form className='col-12 col-md-6 mt-3 mt-md-0' onSubmit={formik.handleSubmit}>
                <h1 className='text-center mb-4'>Войти</h1>
                <div className='form-floating mb-3'>
                  <input name='username' autocomplete='username' required='' placeholder='Ваш ник' id='username' className={`form-control ${error ? 'is-invalid' : null}`} onChange={formik.handleChange} value={formik.values.username}/>
                  <label for='username'>Ваш ник</label>
                </div><div className='form-floating mb-4'>
                  <input name='password' autocomplete='current-password' required='' placeholder='Пароль' type='password' id='password' className={`form-control ${error ? 'is-invalid' : null}`} onChange={formik.handleChange} value={formik.values.password} />
                  <label className='form-label' htmlFor ='password'>Пароль</label>
                  {error ?? (<div className="invalid-tooltip">Authorization Error</div>)}
                </div>
                <button type='submit' className='w-100 mb-3 btn btn-outline-primary'>Войти</button>
              </form>
            </div>
            <div className='card-footer p-4'>
              <div className='text-center'>
                <span>Нет аккаунта?</span>
                <a href='/signup'>Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;