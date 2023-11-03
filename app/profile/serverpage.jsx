
 
import Profile from '@components/Profile';
import { Suspense } from 'react';
import NoteSkeleton from '../NoteSkeleton';

const MyProfile = async () => {

      // }, [session?.user.id]);
    
    // const handleEdit = (post) => {
    //     router.push(`/update-prompt?id=${post._id}`)
    // }



      
      // console.log(posts);
    return (
      <Suspense fallback={<NoteSkeleton />}>
        <Profile
          name='My'
          desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
          // data={posts}
          // handleEdit={handleEdit}
          // handleTrash={handleTrash}
        />
      </Suspense>
      );
    };

export default MyProfile