import {
    UPDATE_PROP,
    ADD,
    DEL,
    MONTHS,
    CLEAN,
    UPDATE_ITEM,
    TITLE,
    DESCRIPTION,
    COST,
    IS_INCOME,
    IS_UPDATING
} from "../actions/types";
import {getShamsi} from "../utils";

const shamsi = getShamsi();
// the difference between current and correct items is that,
// correct items are the date for now, but the current ones are
// the pages that user navigates to
const INITIAL_STATE = {
    year: shamsi[0],
    current_month: "",
    current_day: 0,
    correct_month: shamsi[1],
    correct_day: shamsi[2],
    side_sum_open: false,
    is_permitted: false,
    // since we have 12 months, so for each month we have an array
    items: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]
};

export default (state = INITIAL_STATE, action) =>{
    switch (action.type){

        case UPDATE_PROP:
            let newProps = {};
            // in case we want to update multiple properties at once
            if(Array.isArray(action.payload)){
                for(let prop of action.payload){
                    newProps = {...newProps, [prop.key]: prop.value}
                }
                return {...state, ...newProps}
            }

            return {...state, [action.payload.key]: action.payload.value};

        case UPDATE_ITEM:
            let new_items = [...state.items];
            let { index, month , key, value } = action.payload;
            // we get the index and month of an item to find it, and key and value to update it.
            // to find the index of month in our items we use our months constant, cause it has
            // all months in order.
            let i = MONTHS.indexOf(month);
            // now we check what the key is, and update it with the given value
            // i: the index of month, to get the array of months.
            // index: the index of item, to get the item out of a month
            switch (key){
                case TITLE:
                    new_items[i][index].title = value;
                    break;
                case DESCRIPTION:
                    new_items[i][index].description = value;
                    break;
                case COST:
                    new_items[i][index].cost = parseInt(value);
                    break;
                case IS_INCOME:
                    new_items[i][index].is_income = value;
                    break;
                case IS_UPDATING:
                    new_items[i][index].is_updating = value;
                    break;
            }
            return {...state, items: new_items};

        case ADD:
            new_items = [...state.items];
            i = MONTHS.indexOf(action.payload.month);
            action.payload.id = !!new_items[i].length ? new_items[i][new_items[i].length -1].id + 1 : 1;
            action.payload.cost = parseInt(action.payload.cost);
            action.payload.is_updating = false;
            new_items[i].push(action.payload);
            return {...state, items: new_items};

        case DEL:
            new_items = [...state.items];
            i = MONTHS.indexOf(action.payload.month);
            new_items[i] = new_items[i].filter(item => item.id !== action.payload.id);
            return {...state, items: new_items };

        case CLEAN:
            return {...state,
                items: [
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                ]
            };

        default: return state;
    }
}