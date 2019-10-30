import React, {Fragment, useContext, useEffect} from 'react';
import Spinner from '../layout/Spinner';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts, filtered, loading} = contactContext;
    
    useEffect(() => {
        contactContext.getContacts();
        // eslint-disable-next-line
    }, []);

    if (contacts !== null && contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }

    const contactsForHere =  filtered ? filtered : contacts;

    return (
        <Fragment>
        {
            contacts !== null && !loading ? (
                <TransitionGroup>
                {
                    contactsForHere.map(contact => (
                        <CSSTransition key={contact._id} timeout={500} classNames='item'>
                            <ContactItem contact={contact}/>
                        </CSSTransition>
                ))}
                </TransitionGroup>
            ) : <Spinner/>
        }
        </Fragment>
    );
}

export default Contacts;
