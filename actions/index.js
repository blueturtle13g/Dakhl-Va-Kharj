import {UPDATE_PROP, ADD, DEL, CLEAN, UPDATE_ITEM} from "./types";

export const updateProp = payload=>{
    // update a property with key value
    return{
        type: UPDATE_PROP,
        payload
    }
};

export const updateItem = payload=>{
    // updates an item with its month and id
    return{
        type: UPDATE_ITEM,
        payload
    }
};

export const add = payload=>{
    // adds a new item
    return{
        type: ADD,
        payload
    }
};

export const del = item=>{
    // deletes an item with its month and id
    return{
        type: DEL,
        payload: item
    }
};

export const clean = ()=>{
    // clean the whole items
    return{
        type: CLEAN
    }
};