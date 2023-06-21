import React, { useEffect, useRef, useState } from "react";
import InputResult from "../../module/InputResult";

type Props = {
    submitFn: (inputText: string) => InputResult,
    placeholder: string,
    buttonTitle?: string,
    inputType?: string
}

const Input: React.FC<Props> = ({ submitFn, placeholder, buttonTitle, inputType }) => {
    const inputElementRef = useRef<HTMLInputElement>(null);
    const [disFlag, setDisabled] = useState<boolean>(true)
    const [message, setMessage] = useState<string>("")

    function onChangeFn() {
        setDisabled(!inputElementRef.current?.value)
    }

    function onClickFn() {
        const res = submitFn(inputElementRef.current!.value)
        setMessage(res.message ?? "")
        res.message && setTimeout(() => setMessage(""), 3e3)
    }

    return <div>
        <input type={inputType ?? "text"} placeholder={placeholder} ref={inputElementRef}
            onChange={onChangeFn} />
        <button onClick={onClickFn} disabled={disFlag}>{buttonTitle ?? "Submit"}</button>
        {message && <label>{"success"} {message}</label>}
    </div>
}

export default Input