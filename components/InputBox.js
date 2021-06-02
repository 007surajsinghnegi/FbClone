import Image from "next/image";
import { useSession } from 'next-auth/client'
import {EmojiHappyIcon} from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon} from "@heroicons/react/solid" 
import { useRef, useState } from "react";
import {db, storage} from "../firebase";
import firebase from "firebase";

function InputBox() {

    const[session] = useSession();
    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const [postImage , setPostImage] = useState(null);

    const sendPost = (e)=>{
        e.preventDefault();

        if(!inputRef.current.value) return;

        db.collection("posts").add({
            message: inputRef.current.value,
            name : session.user.name,
            email: session.user.email,
            image : session.user.image,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() 
        })
        .then((doc)=>{
            if(postImage){
                const upload = storage.ref(`posts/${doc.id}`).putString(postImage,'data_url');

                removeImage();

                upload.on(
                    "state_change" , 
                    null , 
                    error=> console.error(error) ,
                    ()=>{
                        // When upload completes
                        storage.ref('posts').child(doc.id).getDownloadURL()
                                .then(url=>{
                                        db.collection('posts').doc(doc.id).set({
                                            postImage: url
                                        },{merge:true})
                                })
                    }
                );
            }
        });

        inputRef.current.value = ""
    }

    const addImage = (e)=>{
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (rEvent)=>{
            setPostImage(rEvent.target.result);
        };
    };

    const removeImage = ()=>{
        setPostImage(null);
    }

    return (
        <div className="bg-white p-2 rounded-2xl text-gray-500 shadow-md font-medium mt-6">
            {/*Top*/}
            <div className="flex space-x-4 p-4 items-center">
                <Image
                    src={session.user.image}
                    className="rounded-full"
                    width={40}
                    height={40}
                    layout="fixed"
                />
                <form className="flex flex-1">
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder={`What's on your mind ${session.user.name}?`}
                        className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"    
                    />
                    <button hidden onClick={sendPost} type="submit">Submit</button>
                    {postImage && 
                    (
                        <div 
                            onClick={removeImage}
                            className="flex flex-col filter hover:brightness-110 transition duration-150
                                        transform hover:scale-105 cursor-pointer"
                        >
                            <img src={postImage} className="h-10 object-contain"/>
                            <p className="text-xs text-red-500">Remove</p>
                        </div>
                    )}
                </form>
            </div>
            {/* Bottom */}
            <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500"/>
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>
                <div className="inputIcon" onClick={()=> fileRef.current.click()}>
                    <CameraIcon className="h-7 text-green-400"/>
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                    <input hidden type="file" onChange={addImage} ref={fileRef}/>
                </div>
                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300"/>
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox
