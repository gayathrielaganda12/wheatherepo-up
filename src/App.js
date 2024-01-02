// App.js
import { useSelector } from 'react-redux';
import LoginPage from './LoginPage';
import DashboardPage from './Pages/DashboardPage';


function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("hello")
  console.log(isAuthenticated)




  return (
    <div  >
     <div>
       {isAuthenticated ? (
        <DashboardPage />
      ) : (
        <LoginPage />
      )} 
   
  
     
      
    </div>
    </div>
  );
}

export default App;
