/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'

export default function Translator({ children, lang }: any) {
    const [translated, setTranslated] = useState<any>(children)

    useEffect(() => {
        return

        const translate = async () => {
            try {
                // const res = await fetch(
                //     `https://translation.googleapis.com/language/translate/v2?key=AIzaSyBMXskxn6f3v7SJfSpjivxjAj-CKQm3TpQ`,
                //     {
                //         method: "POST",
                //         body: JSON.stringify({
                //             q: document.body.innerText,
                //             target: lang,
                //             format: "text",
                //         }),
                //     },
                // );


                // await fetch('/backend/translate', {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         text: document.body.innerText,
                //         target: lang,
                //     }),
                // })
                console.log(res)
                const data = await res.json()

                document.body.innerText = data.translatedText
            } catch (e) {
                console.log(e)
            }
        }

        translate()
    }, [lang])

    return children
}