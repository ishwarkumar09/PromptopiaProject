'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

import Profile from "@components/Profile";

function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user.id) {
        try {
          const response = await fetch(`/api/users/${session.user.id}/posts`);
          if (!response.ok) throw new Error("Failed to fetch posts");
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };

    fetchPosts();
  }, [session]);

  const handleTagClick = (tag)=>{
    router.push('/');

  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
  
    if (hasConfirmed) {
      try {
        // console.log(`Deleting post with id: ${post._id}`);
        
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error(`Failed to delete the post with status: ${response.status}`);
        }

        // Corrected the filter function to use post._id
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
  
        // console.log(`Post deleted successfully: ${post._id}`);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('An error occurred while deleting the post. Please try again.');
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleTagClick={handleTagClick}
    />
  );
}

export default MyProfile;