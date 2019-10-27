import React, {Fragment, useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {contacts, filtered} = contactContext;

    if (contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }

    const contactsForHere =  filtered ? filtered : contacts;

    return (
        <Fragment>
            {
                contactsForHere.map(contact => (
                <ContactItem key={contact.id} contact={contact}/>
            ))}
        </Fragment>
    );
}

export default Contacts;
