import React, {Fragment, useState} from 'react';
import axios from 'axios';



  function App() {

    const [data, saveData] = useState({
      user: '',
      password:''
    });
    const [message, userMessage] = useState('');
    const [alert, showAlert] = useState(false);
    const [error, showError] = useState(false);
    

    const {user, password} = data;

    const handleChange = (e) => {
      saveData({
        ...data,
        [e.target.name] : e.target.value
      })
    }

    const onSubmit = (e) => {

      e.preventDefault();

      if(user.trim() === '' || password.trim() === ''){
        showError(true);
        return;
      }
      showError(false);

      const getUser = async () => {

        const logIn = new FormData();
        logIn.set("username", user);
        logIn.set("password", password);
        const result  = await axios.post (`https://marco.inorlandodigitalmarketing.com/cargas/public/api/login`, logIn);
        
        if(result.status === 200){
          userMessage(result.data.message);
          showAlert(true);
        }
        
      }

      getUser();
      saveData({
        user: '',
        password:''
      });
    }

    const onClick = () => {
      showAlert(false);
    }

    return (
      <Fragment>
        {!alert 
        ? 
        (<div className="form-container">
          {error ? <p className="error">Todos los campos son requeridos.</p> : null}
          <h1>Iniciar Sesión</h1>
            <form  onSubmit={onSubmit}>
              <input type="text" className="input-login" name="user" value={user} placeholder="Usuario" onChange={handleChange}/>
              <input type="password" name="password" placeholder="Contraseña" value={password} onChange={handleChange}/>
              <button type="submit">Iniciar</button>
            </form>
        </div>
        )
        : 
        (
          <div className="alert">
            <button className="btn-alert" onClick={onClick}>Ok</button>
            <p>{message}</p>
          </div>
        )
        }
      </Fragment>
    );
  }

export default App;
