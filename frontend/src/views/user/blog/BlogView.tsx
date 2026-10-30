import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../../types/blog';
import { Property } from '../../../types/property';
import { BlogService } from '../../../services/blogService';
import { BlogListView } from './BlogListView';
import { BlogDetailView } from './BlogDetailView';
import { navigate } from '../../../router/router';

interface BlogViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  isDetailView?: boolean;
  selectedPostId?: string | null;
}

export const BlogView: React.FC<BlogViewProps> = ({
  properties,
  onSelectProperty,
  isDetailView = false,
  selectedPostId
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => BlogService.getAllPosts());

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(BlogService.getAllPosts());
    };
    window.addEventListener('bds-blog-updated', handleUpdate);
    return () => window.removeEventListener('bds-blog-updated', handleUpdate);
  }, []);

  // If in detail route or post id is specified
  const currentPost = isDetailView
    ? (selectedPostId
        ? (posts.find(p => p.id === selectedPostId || p.slug === selectedPostId) || posts[0])
        : posts[0])
    : null;

  const handleSelectPost = (post: BlogPost) => {
    navigate('/blog-detail?id=' + post.id);
  };

  const handleBackToList = () => {
    navigate('/blog');
  };

  if (currentPost) {
    return (
      <BlogDetailView
        post={currentPost}
        allPosts={posts}
        allProperties={properties}
        onBack={handleBackToList}
        onSelectPost={handleSelectPost}
        onSelectProperty={onSelectProperty}
      />
    );
  }

  return (
    <BlogListView
      posts={posts}
      properties={properties}
      onSelectPost={handleSelectPost}
      onSelectProperty={onSelectProperty}
    />
  );
};
