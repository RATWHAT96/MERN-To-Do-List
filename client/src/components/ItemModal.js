import React, { Component } from 'react';
import {
    Button, 
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input,
} from 'reactstrap'
import { connect } from 'react-redux';
import { addItem } from "../actions/itemActions";
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }

        //Add item via addItem action
        this.props.addItem(newItem);

        //Close modal
        this.toggle();
    }

    render() {
        return (
            <div style={{'width': '60vw'}}>
            {this.props.isAuthenticated ? 
            <Button
              color="info"
              style={{ marginTop: '2rem' }}
              onClick={this.toggle}
            >
              Add Task
            </Button>
            : null}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add To Do"
                                    onChange={this.onChange}
                                />
                                <Button color="info" style={{marginTop: '2em', backgroundColor: '#17A2B8'}} block> 
                                    Add Task 
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);