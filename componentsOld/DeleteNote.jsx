"use client"
import { useRouter } from 'next/navigation';

const DeleteNote = ({ postId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${postId}`, { method: 'DELETE' });
        
      } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        throw error;
      }
    }

    router.refresh();
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteNote;
