import {LiaTimesSolid} from "react-icons/lia";
import {useState} from "react";
import axios from "axios";
import {Goal} from "../types/goal.ts";

interface CreateGoalProps {
    setDisplayGoal: (displayGoal: boolean) => void
    userId: number
    goals: Goal[]
    setGoals: (goals: Goal[]) => void
}

const CreateGoal = (props: CreateGoalProps) => {
    const { setDisplayGoal, userId, goals, setGoals } = props

    const [color, setColor] = useState<"red" | "yellow" | "green" | "blue" | "purple" | "gray" | "none">("none")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [targetDate, setTargetDate] = useState<Date>(new Date())
    const [message, setMessage] = useState<string>("")

    const createGoal = async () => {
        if (!title || !description) {
            setMessage("title, description and target date are required")
            return
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/goals/${userId}`, {
                title: title,
                description: description,
                status: "IN_PROGRESS",
                targetDate: targetDate.toISOString(),
                color: color.toUpperCase()
            }, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.status == 201) {
                setGoals([...goals, response.data])
                setDisplayGoal(false)
            }
            console.log(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div
            className={"w-[800px] p-4 rounded-md absolute flex flex-col gap-y-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white"}
        >
            <span
                onClick={() => setDisplayGoal(false)}
                className={"top-4 right-4 absolute text-xl cursor-pointer"}><LiaTimesSolid />
            </span>
            <h1 className={"text-xl"}>Create Goal</h1>
            <label htmlFor={"title"}>Title :</label>
            <input
                id={"title"}
                type={"text"}
                placeholder={"Title"}
                className={"w-full p-2 outline-none h-10 rounded-md border-[1px] border-gray-300"}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor={"description"}>Description :</label>
            <textarea
                id={"description"}
                placeholder={"Description"}
                className={"w-full p-2 outline-none h-20 rounded-md border-[1px] border-gray-300"}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor={"targetDate"}>Target Date :</label>
            <input
                id={"targetDate"}
                type={"date"}
                className={"w-full p-2 outline-none h-10 rounded-md border-[1px] border-gray-300"}
                onChange={(e) => setTargetDate(new Date(e.target.value))}
            />
            <label htmlFor={"color"}>Select a color :</label>
            <div id={"color"} className={"flex gap-x-3"}>
                <div
                    onClick={() => setColor(color === "red" ? "none" : "red")}
                    className={`w-10 h-6 relative rounded-sm cursor-pointer border border-gray-500 bg-red-500`}
                >
                    {color === "red" && (
                        <div
                            className={"text-white text-xs bg-black rounded-full w-3.5 h-3.5 absolute -top-1.5 -right-1.5 flex justify-center items-center"}>
                            <span>✓</span>
                        </div>
                    )}
                </div>
                <div
                    onClick={() => setColor(color === "yellow" ? "none" : "yellow")}
                    className={`w-10 h-6 relative rounded-sm cursor-pointer border border-gray-500 bg-yellow-500`}
                >
                    {color === "yellow" && (
                        <div
                            className={"text-white text-xs bg-black rounded-full w-3.5 h-3.5 absolute -top-1.5 -right-1.5 flex justify-center items-center"}>
                            <span>✓</span>
                        </div>
                    )}
                </div>
                <div
                    onClick={() => setColor(color === "green" ? "none" : "green")}
                    className={`w-10 h-6 relative rounded-sm cursor-pointer border border-gray-500 bg-green-500`}
                >
                    {color === "green" && (
                        <div
                            className={"text-white text-xs bg-black rounded-full w-3.5 h-3.5 absolute -top-1.5 -right-1.5 flex justify-center items-center"}>
                            <span>✓</span>
                        </div>
                    )}
                </div>
                <div
                    onClick={() => setColor(color === "blue" ? "none" : "blue")}
                    className={`w-10 h-6 relative rounded-sm cursor-pointer border border-gray-500 bg-blue-500`}
                >
                    {color === "blue" && (
                        <div
                            className={"text-white text-xs bg-black rounded-full w-3.5 h-3.5 absolute -top-1.5 -right-1.5 flex justify-center items-center"}>
                            <span>✓</span>
                        </div>
                    )}
                </div>
                <div
                    onClick={() => setColor(color === "purple" ? "none" : "purple")}
                    className={`w-10 h-6 relative rounded-sm cursor-pointer border border-gray-500 bg-purple-500`}
                >
                    {color === "purple" && (
                        <div
                            className={"text-white text-xs bg-black rounded-full w-3.5 h-3.5 absolute -top-1.5 -right-1.5 flex justify-center items-center"}>
                            <span>✓</span>
                        </div>
                    )}
                </div>
                <div
                    onClick={() => setColor(color === "gray" ? "none" : "gray")}
                    className={`w-10 h-6 relative rounded-sm cursor-pointer border border-gray-500 bg-gray-500`}
                >
                    {color === "gray" && (
                        <div
                            className={"text-white text-xs bg-black rounded-full w-3.5 h-3.5 absolute -top-1.5 -right-1.5 flex justify-center items-center"}>
                            <span>✓</span>
                        </div>
                    )}
                </div>
            </div>
            {message && <p className={"text-red-500 text-sm mt-2"}>{message}</p>}
            <button
                onClick={createGoal}
                className={"bg-gray-900 text-white p-2 rounded-full hover:bg-gray-700 duration-300"}
            >
                Create Goal
            </button>
        </div>
    )
}

export default CreateGoal