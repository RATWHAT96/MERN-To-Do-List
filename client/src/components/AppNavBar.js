import React, { Fragment, Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
//import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
    state = {
        isOpen: false 
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
              <NavItem>
                <Logout/>
              </NavItem>
            </Fragment>)
         
        const guestLinks = (
            <Fragment>
              <NavItem>
                <LoginModal />
              </NavItem>
            </Fragment>
          );
       
/**         const guestLinks = (
            <Fragment>
            
              <NavItem>
                <RegisterModal />
              </NavItem>
              <NavItem>
                <LoginModal />
              </NavItem>
            </Fragment>
          );
          */ 

        return (
            <div>
            <Navbar style={{background: 'rgba(0,0,0,0.3)'}} dark expand ="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Dashboard</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);