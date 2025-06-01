import { ReactNode } from "react"

export const ModalBody = ({children}: {children: ReactNode}) => {
    return <div className="p-4 py-4 overflow-y-scroll max-h-full h-full">
        {children}
    </div>
}