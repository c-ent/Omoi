"use client"
import { useRouter } from 'next/navigation';
import { useSession} from "next-auth/react"
import { usePathname } from "next/navigation";
    const TrashButton = ({ post, onTrash }) => {
    const router = useRouter();
    const {data:session , status} = useSession();
    const pathName = usePathname();

    const handleTrash = async () => {
        
        try {
        await fetch(`/api/prompt/${post._id}`, {
            method: "PATCH",
            body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            isShown: 0,
            }),
        });
        router.refresh()
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <div>
            {session?.user.id === post.creator._id && pathName === "/profile" && (
                <button onClick={handleTrash}>Trash</button>
            )}
        </div>
    );
};

export default TrashButton;
