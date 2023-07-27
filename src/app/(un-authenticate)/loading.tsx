import Skeleton from '@mui/material/Skeleton';

function Loading() {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={20}
        sx={{ mb: 4, borderRadius: 2 }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={40}
        sx={{ mb: 2, borderRadius: 2 }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={40}
        sx={{ mb: 2, borderRadius: 2 }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={40}
        sx={{ borderRadius: 2 }}
      />
    </>
  );
}
export default Loading;
