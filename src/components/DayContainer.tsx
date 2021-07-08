import { useEffect } from "react"
import React from "react"

const DayContainer = React.memo(({ day, hasEvent } : {day: number, hasEvent: boolean}) => {
    console.log('render' + day)
    return(
        <button>
            <div>
                {day}
                {hasEvent}
            </div>
        </button>
    )
})
export default DayContainer