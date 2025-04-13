import {useEffect, useState} from "react"
import {User} from "../types/user.ts"
import {CiAlignLeft, CiClock2, CiMenuBurger, CiSettings, CiSquarePlus} from "react-icons/ci"
import {LiaTimesSolid} from "react-icons/lia"
import { useNavigate} from "react-router-dom"
import CreateGoal from "../components/CreateGoal.tsx"
import {getUserDataFromLocalStorage} from "../lib/auth.ts"
import GPageLoader from "../components/GPageLoader.tsx"
import {Goal as GoalType} from "../types/goal.ts"
import axios from "axios"
import Goal from "../components/Goal.tsx"

const Dashboard = () => {
    const [user, setUser] = useState<User>()
    const [showMenu, setShowMenu] = useState<boolean>(true)
    const [showMenuRetarded, setShowMenuRetarded] = useState<boolean>(true)
    const [displayGoalCreation, setDisplayGoalCreation] = useState<boolean>(false)
    const [goals, setGoals] = useState<GoalType[]>([])
    const [displayGoal, setDisplayGoal] = useState<boolean>(false)
    const [selectedGoal, setSelectedGoal] = useState<GoalType | null>(null)


    const navigate = useNavigate()

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    useEffect(() => {
        const dataLS: User | null = getUserDataFromLocalStorage()
        if (dataLS == null) {
            navigate("/")
            return
        }
        setUser(dataLS)
    }, []);

    useEffect(() => {
        async function getGoals(id: number) {
            const response = await axios.get(`http://localhost:8080/api/goals/${id}`)
            if (response.status == 200) {
                setGoals(response.data)
                // console.log(response.data)
            }
        }

        if (user && user.id) {
            getGoals(user.id)
        }
    }, [user]);

    useEffect(() => {
        function displayMenu() {
            if (!showMenu) {
                setShowMenuRetarded(false)
                return
            }
            if (showMenu !== showMenuRetarded) {
                setTimeout(() => {
                    setShowMenuRetarded(!showMenuRetarded)
                }, 150)
            }
        }

        displayMenu()
    }, [showMenu])

    const onLogout = () => {
        localStorage.removeItem("user")
        navigate("/")
    }

    if (!user) return <GPageLoader />

    return (
        <div className={"w-screen h-screen flex bg-gray-900"}>
            { displayGoalCreation && user && user.id && (
                <div className={"w-full h-full bg-black fixed z-10 bg-opacity-50"}>
                    <CreateGoal
                        userId={user.id}
                        setDisplayGoal={setDisplayGoalCreation}
                        goals={goals}
                        setGoals={setGoals}
                    />
                </div>
            )}
            { displayGoal && (
                <div className={"w-full h-full bg-black fixed z-10 bg-opacity-50"}>
                    <Goal
                        userId={user.id}
                        goals={goals}
                        goal={selectedGoal!}
                        setGoals={setGoals}
                        setDisplayGoal={setDisplayGoal}
                    />
                </div>
            )}
            <div className={`duration-300 ${showMenu ? "w-1/6 p-3" : "w-0"}`}>
                { showMenuRetarded && (
                    <div className={"h-full  flex flex-col justify-between"}>
                        <div className={"text-white flex flex-col"}>
                            <span className={"font-knewave-regular text-6xl mb-4 pl-2"}>G</span>
                            <span onClick={() => setDisplayGoalCreation(true)} className={"h-10 hover:rounded-md flex gap-x-1 items-center pl-2 hover:bg-gray-400"}><CiSquarePlus className={"text-xl"}/><p>New Task</p></span>
                            <a href={"/statistics"} className={"h-10 hover:rounded-md flex gap-x-1 items-center pl-2 hover:bg-gray-400"}><CiAlignLeft className={"text-xl"}/><p>Statistics</p></a>
                            <span className={"h-10 hover:rounded-md flex gap-x-1 items-center pl-2 hover:bg-gray-400"}><CiSettings className={"text-xl"}/><p>Settings</p></span>
                        </div>
                        <span onClick={onLogout} className={"bg-white text-black p-2 rounded-full hover:bg-gray-200 duration-300"}>Logout</span>
                    </div>
                )}
            </div>
            <div className={`bg-blue-950 rounded-3xl flex flex-col duration-300 p-6 relative ${showMenu ? "w-5/6" : "w-full"}`}>
                <span className={"text-xl text-gray-100 absolute top-4 left-4"} onClick={toggleMenu}>{!showMenu ? <CiMenuBurger/> : <LiaTimesSolid />}</span>
                <div className={"text-3xl text-gray-100 mt-8"}><p>Welcome back <span className={"italic"}>{user.username}</span></p></div>
                <div className={"flex mt-3 justify-between w-full gap-x-3 h-full"}>
                    <div className={"w-1/4 flex flex-col gap-y-2 bg-gray-900 rounded-md h-full p-2"}>
                        <h2 className={"font-bold text-white"}>Pending</h2>
                        {goals.filter(g => g.status == "PENDING").map((g: GoalType, index: number) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedGoal(g)
                                    setDisplayGoal(true)
                                }}
                                className={"flex flex-col border-2 border-gray-700 hover:border-blue-300 cursor-pointer w-full rounded-md bg-gray-700"}
                            >
                                {g.color !== "NONE" &&
                                    <span className={`w-full h-5 rounded-t-md bg-${g.color.toLowerCase()}-500`}></span>}
                                <div className={"p-2 w-full text-white flex-col flex gap-y-1.5"}>
                                    <p className={"text-sm"}>{g.title}</p>
                                    <div className={"flex text-xs gap-x-1 items-center"}>
                                        <CiClock2/>
                                        <p>{g.targetDate.split("T")[0]}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"w-1/4 flex flex-col gap-y-2 bg-gray-900 rounded-md h-full p-2"}>
                        <h2 className={"text-white font-bold"}>In Progress</h2>
                        {goals.filter(g => g.status == "IN_PROGRESS").map((g: GoalType, index: number) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedGoal(g)
                                    setDisplayGoal(true)
                                }}
                                className={"flex flex-col border-2 border-gray-700 hover:border-blue-300 cursor-pointer w-full rounded-md bg-gray-700"}>
                                {g.color !== "NONE" &&
                                    <span className={`w-full h-5 rounded-t-md bg-${g.color.toLowerCase()}-500`}></span>}
                                <div className={"p-2 w-full text-white flex-col flex gap-y-1.5"}>
                                    <p className={"text-sm"}>{g.title}</p>
                                    <div className={"flex text-xs gap-x-1 items-center"}>
                                        <CiClock2/>
                                        <p>{g.targetDate.split("T")[0]}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"w-1/4 flex flex-col gap-y-2 bg-gray-900 rounded-md h-full p-2"}>
                        <h2 className={"text-white font-bold"}>Cancelled</h2>
                        {goals.filter(g => g.status == "CANCELLED").map((g: GoalType, index: number) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedGoal(g)
                                    setDisplayGoal(true)
                                }}
                                className={"flex flex-col border-2 border-gray-700 hover:border-blue-300 cursor-pointer w-full rounded-md bg-gray-700"}>
                                {g.color !== "NONE" &&
                                    <span className={`w-full h-5 rounded-t-md bg-${g.color.toLowerCase()}-500`}></span>}
                                <div className={"p-2 w-full text-white flex-col flex gap-y-1.5"}>
                                    <p className={"text-sm"}>{g.title}</p>
                                    <div className={"flex text-xs gap-x-1 items-center"}>
                                        <CiClock2/>
                                        <p>{g.targetDate.split("T")[0]}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"w-1/4 flex flex-col gap-y-2 bg-gray-900 rounded-md h-full p-2"}>
                        <h2 className={"text-white font-bold"}>Completed</h2>
                        {goals.filter(g => g.status == "COMPLETED").map((g: GoalType, index: number) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedGoal(g)
                                    setDisplayGoal(true)
                                }}
                                className={"flex flex-col border-2 border-gray-700 hover:border-blue-300 cursor-pointer w-full rounded-md bg-gray-700"}>
                                {g.color !== "NONE" &&
                                    <span className={`w-full h-5 rounded-t-md bg-${g.color.toLowerCase()}-500`}></span>}
                                <div className={"p-2 w-full text-white flex-col flex gap-y-1.5"}>
                                    <p className={"text-sm"}>{g.title}</p>
                                    <div className={"flex text-xs gap-x-1 items-center"}>
                                        <CiClock2/>
                                        <p>{g.targetDate.split("T")[0]}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard