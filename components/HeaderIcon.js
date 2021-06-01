function HeaderIcon({Icon , active}) {
    return (
        <div className="flex cursor-pointer items-center sm:h-14 md:px-10 md:hover:bg-gray-100 rounded-xl
                        active:border-b-2 active:border-blue-500 group">
            <Icon className={`h-5 text-gray-500  text-center group-hover:text-blue-500 sm:h-7 mx-auto ${active && "text-blue-500"}`}/>
        </div>
    )
}

export default HeaderIcon
