import React, { Fragment } from 'react';
import './App.css';
import Aside from './components/Layout/Aside'
import Header from './components/Layout/Header'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn'
import Products from './pages/Products'
import Companies from './pages/Companies'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ResetPassword from './pages/ResetPassword';
import { Layout } from 'antd'
import { SessionContext, SessionProvider } from './context/SessionContext'
import Users from './pages/Users';
function App() {
  const [session, setSession] = React.useContext(SessionContext)
  return (
    <Router>
      <SessionProvider value={[session, setSession]}>
        <Fragment>
          <Switch>
            {/* <Route path='*' exact={true} component={SignIn} /> */}
            <Route exact path='/' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/reset' component={ResetPassword} />

            <Layout className='cl-layout'>
              <Aside />
              <Layout>
                <Header />
                {JSON.parse(localStorage.getItem('companyId')) !== null ? <Route path='/products' component={Products} /> : <Redirect from='/products' to='/companies' />}
                <Route path='/companies' component={Companies} />
                <Route path='/users' component={Users} />
              </Layout>
            </Layout>
          </Switch>
        </Fragment>
      </SessionProvider>
    </Router>
  );
}

export default App;
