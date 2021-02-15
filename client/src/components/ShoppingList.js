import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { connect } from "react-redux";
import { getItems, deleteItems } from '../actions/itemActions';
import PropTypes from 'prop-types';
import { listItem, list } from './Style.jsx';

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onDeleteClick = (id) => {
        this.props.deleteItems(id);
    }

    render() {
        const { items } = this.props.item;
        return (
            <div className="outerList">
                <ListGroup style={list}>
                    <h1 style={{color:'white'}}>To Do List</h1>
                    <TransitionGroup className="toDoList">
                        {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem style={listItem}>
                                    {this.props.isAuthenticated ? <Button className="remove-btn" color="info" size="small" style={{marginRight: '2vw'}}
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;</Button> : null}
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})
 
export default connect(
    mapStateToProps,
     { getItems, deleteItems }
     )(ShoppingList);


