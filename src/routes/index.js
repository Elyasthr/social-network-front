import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import About from '../pages/About';
import Admin from '../pages/Admin';
import Authentication from '../pages/Authentication';
import Home from '../pages/Home';
import Profil from '../pages/Profil';
import NavBar from '../components/Navbar';
import MoreFriend from '../pages/MoreFriend'
import FriendProfil from '../pages/FriendProfil'


const index = () => {
  return (
    <Router>
      <NavBar/>
      <Switch>
          <Route path="/" exact component={Authentication} />
          <Route path="/home" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/about" exact component={About}/>
          <Route path="/morefriend" exact component={MoreFriend}/>
          <Route path="/friendprofil" exact component={FriendProfil}/>
          <Redirect to ="/"/>
      </Switch>
    </Router>
  )
}

export default index;