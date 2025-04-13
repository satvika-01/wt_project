import Layout from "./_layout.tsx";
import {ChangeEvent, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [disabler, setDisabler] = useState<boolean>(false)

    const navigate = useNavigate()

    const onRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            setMessage("All fields are required")
            return
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
            return
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/users`, {
                username,
                email,
                password
            }, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.status === 201) {
                setMessage("User registered successfully")
            }
            setDisabler(true)
            delete response.data.password
            localStorage.setItem("user", JSON.stringify(response.data))
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
                            <h1 className={"text-3xl font-bold ml-1"}>Register</h1>
                            <label className={"mt-3 ml-1"} htmlFor={"username"}>Username</label>
                            <input
                                disabled={disabler}
                                id={"username"}
                                type={"text"}
                                className={"w-full p-2 outline-none h-12 rounded-full border-[1px] border-gray-300"}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            />
                            <label className={"mt-3 ml-1"} htmlFor={"email"}>Email</label>
                            <input
                                disabled={disabler}
                                id={"email"}
                                type={"email"}
                                className={"w-full p-2 outline-none h-12 rounded-full border-[1px] border-gray-300"}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                            <label className={"mt-3 ml-1"} htmlFor={"password"}>Password</label>
                            <input
                                disabled={disabler}
                                id={"password"}
                                type={"password"}
                                className={"w-full p-2 outline-none h-12 rounded-full border-[1px] border-gray-300"}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                            <label className={"mt-3 ml-1"} htmlFor={"confirmPassword"}>Confirm Password</label>
                            <input
                                disabled={disabler}
                                id={"confirmPassword"}
                                type={"password"}
                                className={"w-full p-2 outline-none h-12 rounded-full border-[1px] border-gray-300"}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                            />
                            {message && <p className={"text-red-500 text-sm mt-2 ml-1"}>{message}</p>}
                            <div className={"flex mt-2 text-sm gap-x-3"}>
                                <a href={"/login"} className={"text-blue-500 ml-1 hover:text-purple-500 hover:underline"}>Login</a>
                                <a href={"/forgot-password"} className={"text-blue-500 ml-1 hover:text-purple-500 hover:underline"}>Forgot Password</a>
                            </div>
                        </div>
                        <button
                            disabled={disabler}
                            className={"bg-gray-900 text-white p-2 rounded-full mt-12 hover:bg-gray-700 duration-300"}
                            onClick={onRegister}
                        >
                            Register
                        </button>
                    </div>
                </div>
                <div className={"w-1/3 hidden items-center lg:flex justify-center italic"}>
                    <img className={"w-full"} alt={"goal"} src={"/20943996.png"}/>
                </div>
            </div>
        </Layout>
    )
}