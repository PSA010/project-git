import './App.css'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import{useState} from 'react';
import axios from "axios";
import Navbar from './Components/Navbar';
import About from './Components/About';
import Users from './Components/User';
import Search from './Components/Search';
import UserDetails from './Components/UserDetail';

function App(){
  const[users,setUsers] = useState([]);
  
  //individual user
  const[user,setUser] = useState({});
 
  //repository
  const[repos,setRepos] = useState([]);

  const searchName= async(text) => {
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    console.log(res);
    setUsers(res.data.items)
  }

  const clearUser=()=>{
    setUsers([])
  }

//get details of the individual user

const getDetails = async(login) => {
const res = await axios.get(`https://api.github.com/users/${login}`); 
    setUser(res.data)
}

//repos

const getRepos=async(username)=>{
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=asc`)
    setRepos(res.data)
}

  return(

     <Router>   
    <Navbar/>
    <div className='container'>
    <Switch>
      <Route exact path="/" render = {
        (props) => (
        <>
        <Search searchName ={searchName} showClear={users.length>0 ?true:false} clearUser={clearUser}/>
         <Users users={users}/>
        </>
        )}/>
      
     <Route exact path="/About" component={About}/> 

     <Route exact path="/user/:anything" render={
       props=>(  
         <UserDetails getDetails={getDetails} user={user}{...props} getRepos={getRepos} repos={repos}/>
       )
     }
     />
     </Switch>
     </div> 
  </Router>
 
 )
}
export default App;