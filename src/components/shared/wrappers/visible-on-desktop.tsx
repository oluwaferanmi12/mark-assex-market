import { ReactNode } from "react"

export const VisibleOnDesktop = ({children}: {children:ReactNode}) => {
    return <div className="hidden lg:block">

        {children}
    </div>
}