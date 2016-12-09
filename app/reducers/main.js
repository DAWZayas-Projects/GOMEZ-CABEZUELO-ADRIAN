import * as types from '../constants/ActionTypes';

const initState = {
   
        avgTime : '0',
        bounceRate : '0',
        totalVisitors : '0',
        uniqueVisitors : '0',
        uv : [],
        pv : [],
        legends : [],

        chartShow : true
    
}

const parseDateUTC = (date) => {
    let formatDate = date.toLocaleString()
    formatDate     = Date.parse(formatDate)
    return new Date(formatDate)
}

const linechartToState = (state, data) => {
    const history = data.history
    
    const legends = createLegends(history)
    
    const lines   = createLines(history) 
    
    return Object.assign({}, state, {'uv': lines, 'legends': legends})
}

const createLegends = (history) => {
    const month       = parseDateUTC(history[0].date).getMonth() + 1
    const year        = parseDateUTC(history[0].date).getFullYear()
    const daysInMonth = getDaysInMonth(month, year)

    const arryDaysMonth = new Array(daysInMonth).fill(0)
    
    return arryDaysMonth.reduce( (init, value, i) => {
        return init.concat([[i+1, i+1]])
    }, []) 
}

const createLines = (history) => {
    const month       = parseDateUTC(history[0].date).getMonth() + 1
    const year        = parseDateUTC(history[0].date).getFullYear()
    const daysInMonth = getDaysInMonth(month, year)

    const arryDaysMonth = new Array(daysInMonth).fill(0)

    const days    = history.map( h => {
        return parseDateUTC(h.date).getDate()
    }).sort( (a, b) => a - b)

    return arryDaysMonth.reduce( (init, value, i) => {
        
        const result = days.reduce( (initDays, valueDay, iDay) => {
           return valueDay === i+1 ? [initDays[0], initDays[1]+1] : initDays        
        }, [i+1, 0])

        return init.concat([result])
    }, []) 
}

const getDaysInMonth = function(month,year) {
 return new Date(year, month, 0).getDate();
}

const main = (state = initState, action) => {
    switch(action.type) {
        case types.MAIN_RECEIVE_SUMMARY: {
            return linechartToState(state, action.data)
        }

        case types.MAIN_RECEIVE_LINECHART: {
            return linechartToState(state, action.data)
            
        }

        case types.MAIN_LINECHART_DELETED : {
            return Object.assign({}, state, {
                chartShow : false
            })
        }
           
        default:
            return state;
    }
}

export default main;
