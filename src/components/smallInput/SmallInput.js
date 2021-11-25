import React from 'react'
import './SmallInput.css'
import {Context} from '../../Context.js'

export default function SmallInput({props}) {
    const {getDarkMode} = React.useContext(Context)
    const appearance = getDarkMode ? 'dark' : 'light'
    const validity = props.validityState[0] ? 'valid' : 'invalid'
    const [getValue, setValue] = props.valueState

    function modify(event) {
        const input = event.target.value
        if ('regex' in props) {
            if (props.regex.test(input))
                setValue(input)
        } else {
            setValue(input)
        }
    }

    return (
        <input
            className={`SmallInput ${appearance} ${validity}`}
            placeholder={props.placeholder}
            value={getValue}
            onChange={(e) => {modify(e)}}
            onFocus={props.onClick} />
    )
}
