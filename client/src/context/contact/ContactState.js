import React, { useReducer } from 'react';
import axios from 'axios';

import ConctactReducer from './contactReducer';
import {
  GET_CONTACT,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';
import contactContext from './contactContext';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ConctactReducer, initialState);

  // Get Contacts
  const getContact = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Types': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Delete Contact
  const deleteContact = async (_id) => {
    try {
      await axios.delete(`/api/contacts/${_id}`);
      dispatch({ type: DELETE_CONTACT, payload: _id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  // Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Types': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  // Clear Contacts
  const clearContact = () => {
    dispatch({ type: CLEAR_CONTACT });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContact,
        addContact,
        deleteContact,
        clearContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
