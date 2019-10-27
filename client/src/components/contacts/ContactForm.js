import React, {useState, useContext, useEffect} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const [contact, setContact] = useState({name: '', email: '', phone: '', type: 'personal'});
    const {name, email, phone, type} = contact;

    const clearAll = () => {
        contactContext.clearCurrent();
    }

    useEffect(() => {
        if (contactContext.current !== null) {
            setContact(contactContext.current);
        } else {
            setContact({name: '', email: '', phone: '', type: 'personal'});
        }
    }, [contactContext]);

    const onChange = e => {
        setContact({...contact, [e.target.name]: e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        if (contactContext.current === null) {
            contactContext.addContact(contact);
        } else {
            contactContext.updateContact(contact);
        }

        clearAll();
        //setContact({name: '', email: '', phone: '', type: 'personal'});
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{contactContext.current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type='text' placeholder='name' name='name' value={name} onChange={onChange}/>
            <input type='email' placeholder='email' name='email' value={email} onChange={onChange}/>
            <input type='text' placeholder='phone' name='phone' value={phone} onChange={onChange}/>
            <h5>Contact Type</h5>
            <input type='radio' name='type' value='personal' checked={type==='personal'} onChange={onChange}/> Personal {' '}
            <input type='radio' name='type' value='professional' checked={type==='professional'} onChange={onChange}/> Professional {' '}
            <input type='radio' name='type' value='family' checked={type==='family'} onChange={onChange}/> Family {' '}
            <div>
                <input type='submit' value={contactContext.current ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block'/>
            </div>
            {contactContext.current && (
                <div>
                    <button className='btn btn-light btn-block' onClick={clearAll}>Clear</button>
                </div>
            )}
        </form>
    )
};

export default ContactForm;
