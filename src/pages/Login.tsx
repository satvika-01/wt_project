import Layout from "./_layout.tsx"
import {ChangeEvent, useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
// import {LoginResponse} from "../types/reponse.ts";

export default function Login() {
    const [message, setMessage] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email || !password) {
            setMessage("Email and password are required")
            return
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email: email,
                password: password
            }, {
                headers: { "Content-Type": "application/json" }
            })

            delete response.data.password

            if (response.status === 200) {
                setMessage("Login successful")
                localStorage.setItem("user", JSON.stringify(response.data))
            }
            navigate("/dashboard")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Layout>
            <div style={{minHeight: "calc(100vh - 4rem)"}} className={"w-full flex h-full inset-0 bg-white p-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px]"}>
                <div className={"w-full lg:w-2/3 flex items-center justify-center"}>
                    <div className={"rounded-md border-[1px] border-gray-100 shadow-lg bg-white flex flex-col justify-between p-8 w-[600px]"}>
                        <div className={"gap-y-1 flex flex-col"}>
                            <h1 className={"text-3xl font-bold ml-1"}>Login</h1>
                            <label className={"mt-3 ml-1"} htmlFor={"email"}>Email</label>
                            <input
                                id={"email"}
                                type={"email"}
                                className={"w-full p-2 outline-none h-12 rounded-full border-[1px] border-gray-300"}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                            <label className={"mt-3 ml-1"} htmlFor={"password"}>Password</label>
                            <input
                                id={"password"}
                                type={"password"}
                                className={"w-full p-2 outline-none h-12 rounded-full border-[1px] border-gray-300"}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                            {message && <p className={"text-red-500 text-sm mt-2 ml-1"}>{message}</p>}
                            <div className={"flex mt-2 text-sm gap-x-3"}>
                                <a href={"/register"} className={"text-blue-500 ml-1 hover:text-purple-500 hover:underline"}>Register</a>
                                <a href={"/forgot-password"} className={"text-blue-500 ml-1 hover:text-purple-500 hover:underline"}>Forgot Password</a>
                            </div>
                        </div>
                        <button
                            className={"bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 duration-300 mt-12"}
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className={"w-1/3 hidden items-center lg:flex justify-center italic"}>
                    <img className={"w-full"} alt={"goal"} src={"/20943559.png"}/>
                </div>
            </div>
        </Layout>
    )
}