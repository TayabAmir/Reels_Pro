"use client"

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status == "authenticated") {
            router.push("/")
        }
    }, [status])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await signIn("credentials", { email, password, redirect: false })

        console.log(res)
        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success("Login successful!",);
            router.push("/");
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
                <p className="text-center mt-4">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:text-blue-600">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login