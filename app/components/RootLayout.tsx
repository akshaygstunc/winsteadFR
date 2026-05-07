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

        // =========================
        // Tracking Script
        // =========================

        let sessionId = localStorage.getItem('session_id')

        if (!sessionId) {
            sessionId = crypto.randomUUID()
            localStorage.setItem('session_id', sessionId)
        }

        const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tracking`

        const trackPage = async () => {
            try {
                await fetch(`${API_URL}/page-view`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sessionId,
                        page: window.location.pathname,
                        fullUrl: window.location.href,
                        referrer: document.referrer,
                        userAgent: navigator.userAgent,
                        screen: `${window.screen.width}x${window.screen.height}`,
                        language: navigator.language,
                        timezone:
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                    }),
                })
            } catch (err) {
                console.error('Tracking Error:', err)
            }
        }

        const heartbeat = async () => {
            try {
                await fetch(`${API_URL}/heartbeat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sessionId,
                        page: window.location.pathname,
                        status: 'active',
                    }),
                })
            } catch (err) { }
        }

        // Initial page tracking
        trackPage()

        // Heartbeat every 20 sec
        const heartbeatInterval = setInterval(() => {
            heartbeat()
        }, 20000)

        // Detect route changes
        let currentPath = window.location.pathname

        const routeInterval = setInterval(() => {
            if (window.location.pathname !== currentPath) {
                currentPath = window.location.pathname
                trackPage()
            }
        }, 500)

        return () => {
            clearInterval(heartbeatInterval)
            clearInterval(routeInterval)
        }
    }, [])

    return (
        <html lang={lang} className={className}>
            <body>
                <Translator lang={lang}>
                    {children}
                </Translator>
            </body>
        </html>
    )
}