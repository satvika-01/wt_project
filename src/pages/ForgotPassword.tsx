import Layout from "./_layout.tsx"
import {ChangeEvent, useState} from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("")

    const handleResetPassword = () => {
        console.log("Email: ", email)
    }

    return (
        <Layout>
            <div style={{minHeight: "calc(100vh - 4rem)"}} className={"w-full flex h-full inset-0 bg-white p-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px]"}>
                <div className={"w-full lg:w-2/3 flex items-center justify-center"}>
                    <div className={"rounded-md border-[1px] border-gray-100 shadow-lg bg-white flex flex-col justify-between p-8 w-[600px]"}>
                        <div className={"gap-y-1 flex flex-col"}>
                            <h1 className={"text-3xl font-bold ml-1"}>Forgot Password</h1>
                            <label className={"mt-3 ml-1"} htmlFor={"email"}>Email</label>
                            <input
                                id={"email"}
                                type={"email"}
                                className={"w-full p-2 outline-none h-12 rounded-full border-[1px] border-gray-300"}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                            <div className={"flex mt-2 text-sm gap-x-3"}>
                                <a href={"/login"} className={"text-blue-500 ml-1 hover:text-purple-500 hover:underline"}>Login</a>
                                <a href={"/register"} className={"text-blue-500 ml-1 hover:text-purple-500 hover:underline"}>Register</a>
                            </div>
                        </div>
                        <button
                            className={"bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 duration-300 mt-12"}
                            onClick={handleResetPassword}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
                <div className={"w-1/3 hidden items-center lg:flex justify-center italic"}>
                    <img className={"w-full"} alt={"goal"} src={"/password.png"}/>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword