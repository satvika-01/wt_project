const HomeNavbar = () => {
    return (
        <nav className={"bg-white border-b-[1px] border-b-gray-300 w-full"}>
            <div className={"mx-4"}>
                <div className={"relative flex items-center justify-between h-16"}>
                    <div className={"flex-1 flex items-center justify-center sm:justify-start"}>
                        <div className={"flex-shrink-0 flex items-center"}>
                            <a href={"/"} className={"font-bold text-gray-700 text-4xl font-knewave-regular"}>G</a>
                        </div>
                        <div className={"hidden sm:block sm:ml-6"}>
                            <div className={"flex space-x-4"}>
                                <a href={"#goals"} className={"text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Goals</a>
                                <a href={"#ambitions"} className={"text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Ambitions</a>
                                <a href={"#about"} className={"text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>About</a>
                            </div>
                        </div>
                    </div>
                    <div className={"hidden sm:block sm:ml-6"}>
                        <div className={"flex items-center"}>
                            <a href={"/login"} className={"text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Join</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default HomeNavbar