
const initialState = {
    menu: "",
};

export const userAction = (data) => {

    if(data.weatherInfo.temp > 28){
        return {
            type: "HOT"
        };
    }else if(data.weatherInfo.temp < 5){
        return {
            type: "COLD"
        };
    }else if(data.weatherInfo.weather === "Rain"){
        return{
            type: "RAIN"
        };
    }else if(data.weatherInfo.weather === "Snow"){
        return{
            type: "SNOW"
        };
    }else if(data.weatherInfo.weather === "Clear"){
        return{
            type: "CLEAR"
        };
    }else{
        return{
            type: "ELSE"
        };
    }
    
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "HOT": {
            return {
                // ...state,
                menu: "냉면",
            };
        }
        case "RAIN": {
            return {
                // ...state,
                menu: "파전",
            };
        }
        case "COLD": {
            return {
                // ...state,
                menu: "국밥",
            };
        }
        case "CLEAR": {
            return {
                // ...state,
                menu: "샐러드",
            };
        }
        case "SNOW": {
            return {
                // ...state,
                menu: "마라탕",
            };
        }
        default: {
            return {
                ...state,
                menu: "고기",
            };
        }
    }
};


export default userReducer;
