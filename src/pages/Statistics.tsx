import {useEffect, useState} from "react"
import {Task} from "../types/task.ts"
import axios from "axios"
import {getUserDataFromLocalStorage} from "../lib/auth.ts"
import {User} from "../types/user.ts"
import {Goal} from "../types/goal.ts"
import { useNavigate } from "react-router-dom";
import GPageLoader from "../components/GPageLoader.tsx";
import {colorConverter} from "../lib/util.ts";
import {CiAlignLeft, CiMenuBurger, CiSettings, CiSquarePlus} from "react-icons/ci";
import {LiaTimesSolid} from "react-icons/lia";


const Statistics = () => {
    type GoalAndTasks = {
        goal: Goal,
        tasks: Task[]
    }
    const [showMenu, setShowMenu] = useState<boolean>(true)
    const [showMenuRetarded, setShowMenuRetarded] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)
    const [goalAndTasks, setGoalAndTasks] = useState<GoalAndTasks[]>([])

    const navigate = useNavigate()

    const completionCalculator = (tasks: Task[]): number => {
        let completedTasks = 0
        if (tasks.length === 0) return 0

        tasks.forEach((task: Task) => {
            if (task.isCompleted) {
                completedTasks++
            }
        })
        return (completedTasks / tasks.length) * 100
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    useEffect(() => {
        async function fetchTasks() {
            const user: User | null = getUserDataFromLocalStorage()
            if (user === null) {
                console.error("User not logged in")
                navigate("/login")
                return
            }
            let goals: Goal[] = []
            try {
                const response = await axios.get(`http://localhost:8080/api/goals/${user.id}`)
                if (response.status === 200) {
                    goals = response.data
                }
            } catch (error) {
                console.error("Error fetching tasks", error)
            }

            if (goals.length === 0) {
                console.log("No goals found")
                return
            }

            const goalAndTasks: GoalAndTasks[] = []
            for (const goal of goals) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/tasks/${goal.id}`)
                    if (response.status === 200) {
                        goalAndTasks.push({goal: goal, tasks: response.data})
                    }
                } catch (error) {
                    console.error("Error fetching tasks", error)
                }
            }
            setGoalAndTasks(goalAndTasks)
            setLoading(false)
        }

        fetchTasks()
    }, [])

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

    const bgConicGradient = (goals: GoalAndTasks[]): string => {
        const taskByColor = new Map<"RED" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "GRAY" | "NONE", { goalNumber: number, taskNumber: number }>()

        for (const goalAndTask of goals) {
            const goalColor = goalAndTask.goal.color
            if (taskByColor.has(goalColor)) {
                const current = taskByColor.get(goalColor)
                if (current) {
                    taskByColor.set(goalColor, { goalNumber: current.goalNumber + 1, taskNumber: current.taskNumber + goalAndTask.tasks.length })
                }
            } else {
                taskByColor.set(goalColor, { goalNumber: 1, taskNumber: goalAndTask.tasks.length })
            }
        }

        let previousPercentage = 0
        let gradientString: string = "conic-gradient(from 0deg at 50% 50%,"
        for (const [color, values] of taskByColor) {
            const percentage =  Math.round(values.goalNumber / goalAndTasks.length * 100)
            gradientString += ` ${colorConverter(color)} ${previousPercentage}% ${percentage + previousPercentage > 100 ? 100 : percentage + previousPercentage}%${percentage + previousPercentage < 100 ? ",":""}`
            previousPercentage += percentage
        }
        gradientString += ")"
        return gradientString
    }

    const taskCompleted = (goalAndTasks: GoalAndTasks[]): number => {
        let taskCompleted = 0
        goalAndTasks.forEach((gat: GoalAndTasks) => {
            gat.tasks.forEach((task: Task) => {
                if (task.isCompleted) {
                    taskCompleted++
                }
            })
        })
        return taskCompleted
    }

    const totalTasks = (goalAndTasks: GoalAndTasks[]): number => {
        let totalTasks = 0
        goalAndTasks.forEach((gat: GoalAndTasks) => {
            totalTasks += gat.tasks.length
        })
        return totalTasks
    }

    const onLogout = () => {
        localStorage.removeItem("user")
        navigate("/")
    }


    if (loading) return <GPageLoader />

    return (
        <div className={"w-screen h-screen flex bg-gray-900"}>
            <div className={`duration-300 ${showMenu ? "w-1/6 p-3" : "w-0"}`}>
                {showMenuRetarded && (
                    <div className={"h-full  flex flex-col justify-between"}>
                        <div className={"text-white flex flex-col"}>
                            <span className={"font-knewave-regular text-6xl mb-4 pl-2"}>G</span>
                            <a href={"/dashboard"}
                                  className={"h-10 hover:rounded-md flex gap-x-1 items-center pl-2 hover:bg-gray-400"}><CiSquarePlus
                                className={"text-xl"}/><p>Dashboard</p></a>
                            <a href={"/statistics"}
                               className={"h-10 hover:rounded-md flex gap-x-1 items-center pl-2 hover:bg-gray-400"}><CiAlignLeft
                                className={"text-xl"}/><p>Statistics</p></a>
                            <span
                                className={"h-10 hover:rounded-md flex gap-x-1 items-center pl-2 hover:bg-gray-400"}><CiSettings
                                className={"text-xl"}/><p>Settings</p></span>
                        </div>
                        <span onClick={onLogout}
                              className={"bg-white text-black p-2 rounded-full hover:bg-gray-200 duration-300"}>Logout</span>
                    </div>
                )}
            </div>
            <div
                className={`bg-blue-950 text-white rounded-3xl overflow-y-scroll flex flex-col duration-300 p-6 relative ${showMenu ? "w-5/6" : "w-full"}`}>
                <span className={"text-xl text-gray-100 absolute top-4 left-4"} onClick={toggleMenu}>{!showMenu ?
                    <CiMenuBurger/> : <LiaTimesSolid/>}</span>
                <h1 className={"mt-8 mb-5 text-2xl"}>Statistics</h1>
                <div className={"flex flex-col gap-y-4"}>
                    <div className={"w-full flex items-center gap-x-4"}>
                        <div className={"w-[400px] h-[400px] p-6 rounded-md bg-gray-700 flex items-center justify-center"}>
                            <div style={{background: `${bgConicGradient(goalAndTasks)}`}}
                                 className={`inset-0 relative w-[360px] h-[360px] rounded-full`}>
                                <div
                                    className={"absolute rounded-full w-72 h-72 bg-gray-700 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center"}>
                                    <p className={"text-lg"}>No° of goal</p>
                                    <h2 className={"text-[6.5rem] font-knewave-regular"}>{goalAndTasks.length}</h2>
                                    <p className={"text-lg"}>Task
                                        Completed: {taskCompleted(goalAndTasks)}/{totalTasks(goalAndTasks)}</p>
                                </div>
                            </div>
                        </div>
                        <div className={"w-full bg-gray-700 h-[400px] overflow-y-scroll rounded-md "}>
                            <div className={"flex flex-col gap-y-4 p-4"}>
                                {goalAndTasks && goalAndTasks.map((gat: GoalAndTasks, index: number) => (
                                    <div key={index}
                                         className={"bg-gray-800 w-full flex items-center justify-between rounded-sm p-4"}>
                                        <h3 className={"w-1/5"}>{gat.goal.title}</h3>
                                        <div className={"w-3/5 px-2 relative"}>
                                            <div className={"h-2 bg-gray-600 rounded-full"}>
                                                <div className={`h-2 bg-${gat.goal.color.toLowerCase()}-500 rounded-full`}
                                                     style={{width: `${completionCalculator(gat.tasks)}%`}}>

                                                </div>
                                            </div>
                                        </div>
                                        <span className={"w-1/5"}>{gat.goal.targetDate.split("T")[0]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={"w-full bg-gray-700 h-[300px] rounded-md p-4 flex items-center justify-center"}>
                        <h3 className={"text-[5.5rem] font-knewave-regular"}>Coming Soon</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Statistics