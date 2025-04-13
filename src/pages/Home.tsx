import Layout from "./_layout.tsx"
import {useEffect} from "react";
import {User} from "../types/user.ts";
import {getUserDataFromLocalStorage} from "../lib/auth.ts";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        const user: User | null  = getUserDataFromLocalStorage()
        if (user) {
            navigate("/dashboard")
        }
    }, []);
    return (
        <Layout>
            <div
                className={"w-full flex justify-center items-center flex-col h-full inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px]"}>
                {/* Main Page Section*/}
                <section className={"flex w-4/5 flex-col text-center gap-y-2 justify-center items-center"}
                         style={{minHeight: "calc(100vh - 4rem)"}}>
                    <h1 className={"text-5xl font-bold"}>Goal Tracker</h1>
                    <p className={"text-gray-500 text-lg"}>An application that allows users to define, track, and manage
                        their Objectives and Key Results (OKRs) or daily/monthly habits.</p>
                    <a
                        href={"#goals"}
                        className={"border border-dashed border-gray-400 animate-bounce text-gray-500 p-4 font-thin text-lg rounded-full hover:bg-gray-200 hover:bg-opacity-40 duration-300 mt-8"}>Learn
                        More
                    </a>
                </section>
                <section id={"goals"} className={"w-[90%] flex mt-8 items-center justify-between gap-x-10"}>
                    <img src={"/20943559.png"} alt={"goal"} className={"w-1/2"}/>
                    <div className={"flex flex-col gap-y-3 w-1/2"}>
                        <h2 className={"text-3xl font-bold"}>Your goals, your success.</h2>
                        <p className={"text-gray-500 text-lg"}><b>Turn your ideas into action with intuitive and
                            powerful goal management.</b><br/>
                            Whether you work alone or in a team, our platform lets you organize your projects, track
                            your progress and celebrate your successes. Focus on what really matters, while simplifying
                            your day-to-day management.</p>
                        <p className={"text-gray-500 text-lg"}><b>Simple tools for limitless ambitions.</b><br/>
                            With our intuitive interface, create, track and modify your goals in the blink of an eye.
                            Thanks to our drag-and-drop functionality, you can adapt your priorities in real time and
                            easily change the status of your objectives. From “Pending” to “Completed”, you keep a clear
                            overview of all your projects.
                        </p>
                        <p className={"text-gray-500 text-lg"}><b>Take control of your time.</b><br/>
                            Visualize deadlines, plan milestones and leave nothing to chance. With our precise goal
                            tracking, every day becomes an opportunity to progress. Follow your own pace and reach your
                            goals without stress.</p>
                    </div>
                </section>
                <section id={"ambitions"} className={"w-[90%] flex mt-32 items-center justify-between gap-x-10"}>
                    <div className={"flex flex-col gap-y-3 w-1/2"}>
                        <h2 className={"text-3xl font-bold"}>Bring your ambitions to life with a tool designed just for
                            you</h2>
                        <p className={"text-gray-500 text-lg"}>Our application accompanies you every step of the way,
                            from initial idea to final realization. Thanks to intuitive visual management, you'll stay
                            motivated and organized while tracking your progress in real time. Whether you have small
                            daily goals or long-term projects, our platform adapts to your needs to help you realize
                            your aspirations. Evolve at your own pace and turn your intentions into measurable results,
                            all in just a few clicks.
                        </p>
                        <p className={"text-gray-500 text-lg"}>With our application, every goal has its place in a
                            clear, customizable interface. Plan, prioritize and track your progress effortlessly. Take
                            advantage of powerful tools like milestone tracking, smart reminders, and intuitive
                            visualization to stay on track for success. Whether it's achieving personal, professional or
                            group goals, we give you the keys to staying focused and determined. Your success starts
                            here, one step at a time.
                        </p>
                    </div>
                    <img src={"/20943996.png"} alt={"goal"} className={"w-1/2"}/>
                </section>
                <section id={"about"} className={"w-[90%] flex mt-14 items-center justify-between gap-x-10"}>
                    <img src={"/about.png"} alt={"about us"} className={"w-1/2"}/>
                    <div className={"flex flex-col gap-y-3 w-1/2"}>
                        <h2 className={"text-3xl font-bold"}>About Us</h2>
                        <p className={"text-gray-500 text-lg"}>
                            At GoalTracker, we believe that achieving your dreams should be as organized and inspiring
                            as the dreams themselves.
                            Our mission is to empower individuals and teams to turn aspirations into achievements with
                            an intuitive,
                            user-friendly platform. Whether you're tackling personal milestones or professional
                            projects, our tools make the journey seamless and rewarding.
                        </p>
                        <p className={"text-gray-500 text-lg"}>
                            From planning to execution, we provide you with a suite of features designed to support your
                            goals every step of the way.
                            Visualize your path, stay motivated with real-time progress updates, and celebrate your
                            successes. Together,
                            let's make ambition a lifestyle, not just an idea.
                        </p>
                    </div>
                </section>

                <footer id={"footer"} className={"w-full bg-gray-900 text-white py-10"}>
                    <div
                        className={"w-[90%] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-y-8"}>
                        <div className={"flex flex-col gap-y-3"}>
                            <h3 className={"text-lg font-semibold"}>Contact Us</h3>
                            <p>Email: support@goaltracker.com</p>
                            <p>Phone: +1 (123) 456-7890</p>
                            <p>Address: 123 Success Lane, Productivity City, 45678</p>
                        </div>
                        <div className={"flex flex-col gap-y-3"}>
                            <h3 className={"text-lg font-semibold"}>Quick Links</h3>
                            <a href={"#"} className={"text-gray-400 hover:text-gray-200"}>Home</a>
                            <a href={"#"} className={"text-gray-400 hover:text-gray-200"}>Features</a>
                            <a href={"#"} className={"text-gray-400 hover:text-gray-200"}>Pricing</a>
                            <a href={"#"} className={"text-gray-400 hover:text-gray-200"}>Testimonials</a>
                            <a href={"#"} className={"text-gray-400 hover:text-gray-200"}>Blog</a>
                        </div>
                        <div className={"flex flex-col gap-y-3"}>
                            <h3 className={"text-lg font-semibold"}>Follow Us</h3>
                            <a href={"#"} className={"text-gray-400 hover:text-gray-200"}>Facebook</a>
                            <a href={"#"} className={"text-gray-400 hover:text-gray-200"}>Twitter</a>
                            <a href={"#"} className={"text-gray-400 hover:text-gray-200"}>LinkedIn</a>
                            <a href={"#"} className={"text-gray-400 hover:text-gray-200"}>Instagram</a>
                        </div>
                    </div>
                    <div className={"w-[90%] mx-auto mt-8 text-center text-gray-400"}>
                        <p>© 2024 GoalTracker. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </Layout>
    )
}