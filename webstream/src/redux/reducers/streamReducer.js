import _ from "lodash";
import { FETCH_STREAM, FETCH_STREAMS, CREATE_STREAM, EDIT_STREAM, DELETE_STREAM } from "../actions/types";

const initialState = {
    list_streams: [],
    detail_stream: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return {
                ...state,
                list_streams: action.payload,
            };

        case FETCH_STREAM:
            return {
                ...state,
                detail_stream: action.payload,
            };

        default:
            return state;
    }
};
