import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppNavbar extends Component {
    state = {
        isOpen: false }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
            <Navbar style={{backgroundColor: '#004080'}} dark expand ="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">To Do List</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://stackoverflow.com/users/11450660/rahul-ratwatte">StackOverflow</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/RATWHAT96">RATWHAT96</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
}



export default AppNavbar;