import { useParams } from 'react-router';

export const Post = () => {
  const { postId } = useParams();
  if (!postId) {
    throw new Error('Missing postId query parameter');
  }

  return <>post {postId}</>;
};
