import { ChatAltIcon , ShareIcon,ThumbUpIcon } from "@heroicons/react/outline";
import Image from "next/image";

function Post({name,message,image,postImage,email,timestamp}) {
    return (
        <div className="felx flex-col">
            <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                    <img className="rounded-full" src={image} width={40} height={40} />
                    <div>
                        <p className="font-medium">{name}</p>
                        { timestamp ?
                        (
                            <p className="text-xs text-gray-400"> 
                                {new Date(timestamp?.toDate()).toLocaleString()}
                            </p>
                        )
                        :
                        (
                            <p className="text-sm text-gray-400">Loading...</p>
                        ) }
                    </div>
                </div>
                <p className="pt-4">
                    {message}
                </p>
            </div>
            {postImage && 
            (
                <div className="relative h-56 md:h-96">
                    <Image
                        src={postImage}
                        objectFit="cover"
                        layout="fill"
                    />
                </div>
            )}

            <div className="flex justify-between items-center rounded-b-2xl bg-white text-gray-400 border-t">
                <div className="inputIcon rounded-none rounded-bl-2xl">
                    <ThumbUpIcon className="h-4"/>
                    <p className="text-xs sm:text-base">Like</p>
                </div>
                <div className="inputIcon ">
                    <ChatAltIcon className="h-4"/>
                    <p className="text-xs sm:text-base">Comment</p>
                </div>
                <div className="inputIcon rounded-none rounded-br-2xl">
                    <ShareIcon className="h-4"/>
                    <p className="text-xs sm:text-base">Share</p>
                </div>
            </div>
        </div>
    )
}

export default Post
