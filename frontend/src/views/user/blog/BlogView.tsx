import React from 'react';
import { BlogPost } from '../../../types/blog';
import { Property } from '../../../types/property';
import { BLOG_POSTS } from '../../../data/blogPosts';
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
  // If in detail route or post id is specified
  const currentPost = isDetailView
    ? (selectedPostId
        ? (BLOG_POSTS.find(p => p.id === selectedPostId || p.slug === selectedPostId) || BLOG_POSTS[0])
        : BLOG_POSTS[0])
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
        allPosts={BLOG_POSTS}
        allProperties={properties}
        onBack={handleBackToList}
        onSelectPost={handleSelectPost}
        onSelectProperty={onSelectProperty}
      />
    );
  }

  return (
    <BlogListView
      posts={BLOG_POSTS}
      properties={properties}
      onSelectPost={handleSelectPost}
      onSelectProperty={onSelectProperty}
    />
  );
};
