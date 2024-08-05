import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

export let RequireAuth = ({ children }: { children: ReactNode }) => {
    let jwt = localStorage.getItem("jwt")

    if (!jwt) {
        return <Navigate to="/auth/login" replace />
    }
    return children
}