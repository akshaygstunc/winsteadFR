/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState } from 'react'
import Translator from './Translator'

export default function Layout({ children, className }: any) {
    const [lang, setLang] = useState('en')

    useEffect(() => {
        const browserLang = navigator.language.split('-')[0]

        if (['es', 'fr', 'de', 'nl'].includes(browserLang)) {
            setLang(browserLang)
        }
    }, [])

    return (
        <html lang={lang} className={className}>
            <body>
                <Translator lang={lang}>{children}</Translator>
            </body>
        </html>
    )
}