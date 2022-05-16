const initialState = {
    lat: 37.566826,
    lon:126.9786567,
};


export const placeAction = (data) => {
    return{
        type: "PLACE",
        lat: data.placeInfo.lat,
        lon:data.placeInfo.lon,
    }
};


const placeReducer = (state = initialState, action) => {
    switch(action.type){
        case "PLACE": {
            return {
                // ...state,
                lat: action.lat,
                lon: action.lon,
            }
        }
        default: {
            return {
                ...state,
            };
        }
    }
    
};

export default placeReducer;