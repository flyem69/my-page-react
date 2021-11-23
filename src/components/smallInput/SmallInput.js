import React from 'react'
import './SmallInput.css'

export default function SmallInput({globalProps, localProps}) {
    const appearance = globalProps.darkModeState[0] ? 'dark' : 'light'
    const validity = localProps.validityState[0] ? 'valid' : 'invalid'
    const [getValue, setValue] = localProps.valueState

    function modify(event) {
        const input = event.target.value
        if ('regex' in localProps) {
            if (localProps.regex.test(input))
                setValue(input)
        } else {
            setValue(input)
        }
    }

    return (
        <input
            className={`SmallInput ${appearance} ${validity}`}
            placeholder={localProps.placeholder}
            value={getValue}
            onChange={(e) => {modify(e)}}
            onFocus={localProps.onClick} />
    )
}
