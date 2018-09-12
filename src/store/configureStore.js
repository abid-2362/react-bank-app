import React, { Component } from 'react';
import {createStore} from 'redux';
import appReducers from '../reducers/index';

export default function configureStore(initialState = {}) {
  return createStore(appReducers, initialState);
}