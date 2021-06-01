import Image from "next/image";
import { useSession } from 'next-auth/client'

function InputBox() {

    const[session] = useSession();

    return (
        <div>
               {/*Top*/}
            <div>
                <Image
                    src={session.user.image}
                    className="rounded-full"
                    width={40}
                    height={40}
                    layout="fixed"
                />
            </div>

        </div>
    )
}

export default InputBox
