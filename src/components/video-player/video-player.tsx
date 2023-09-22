type VideoPlayerProps = {
  src: string;
  poster: string;
}

function VideoPlayer({src, poster}: VideoPlayerProps): JSX.Element {
  return (
    <video src={src} className="player__video" poster={poster} muted autoPlay></video>
  );
}

export default VideoPlayer;
