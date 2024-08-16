import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { RootState } from "../store/store"

export let RequireAuth = ({ children }: { children: ReactNode }) => {
    let jwt = useSelector((s: RootState)=>s.user.jwt)

    if (!jwt) {
        return <Navigate to="/auth/login" replace />
    }
    return children
}