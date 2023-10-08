import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useNavigate } from 'react-router-dom';
import { fetchFilmByIdAction } from '../../store/api-actions';
import { getFilm } from '../../store/films-data/films-data.selectors';
import { isFilmDataLoading } from '../../store/films-data/films-data.selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { AppRoute } from '../../const';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);


function PlayerFullScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPause, setIsPause] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeUpdate, setTimeUpdate] = useState(0);

  function getFormatRunTime(time: number) {
    const date = dayjs.duration(time);

    return `${date.minutes()}:${date.seconds()}:${date.milliseconds()}`;
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
    }
  }, [id, dispatch]);


  const film = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(isFilmDataLoading);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (isFilmLoading) {
    return(<LoadingScreen />
    );
  }

  if (!film) {
    return <NotFoundScreen />;
  }

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setTimeLeft(Math.floor(videoRef.current.duration - videoRef.current.currentTime));
      setTimeUpdate(Math.ceil(videoRef.current.currentTime * 100 / videoRef.current.duration));
      if(videoRef.current.duration === videoRef.current.currentTime) {
        setIsPause(true);
      }
    }
  };


  return(
    <div className="player">
      <video ref={videoRef} onTimeUpdate={handleVideoTimeUpdate} src={film.videoLink} className="player__video" poster="img/player-poster.jpg" autoPlay></video>

      <button
        type="button"
        className="player__exit"
        onClick={() => {
          if (id) {
            navigate(AppRoute.Film.replace(':id', id));
          } else {
            console.error('ID is undefined');
          }

        }}
      >Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={timeUpdate} max={100}></progress>
            <div className="player__toggler" style={{left: `${timeUpdate}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getFormatRunTime(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={togglePlayback}>
            {isPlaying ? (
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
          <div className="player__name">{film.name}</div>


          <button
            type="button"
            className="player__full-screen"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.requestFullscreen();
              }
            }}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerFullScreen;
