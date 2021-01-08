import React, {Component} from 'react';
import {Container, ListGroup, ListGroupItem, Button} from'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { connect } from "react-redux";
import { getItems, deleteItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

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
            <Container>
                <h1>To Do List</h1>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {this.props.isAuthenticated ? <Button className="remove-btn" color="danger" size="small"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;</Button> : null}
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
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


