import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchFilmByIdAction } from '../../store/api-actions';
import { getFilm } from '../../store/films-data/films-data.selectors';
import { isFilmDataLoading } from '../../store/films-data/films-data.selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getFormatRunTime } from '../../utils/utils';


function PlayerFullScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const filmCard = useAppSelector(getFilm);
  const isLoading = useAppSelector(isFilmDataLoading);
  const [isPause, setIsPause] = useState(false);
  const [timeData, setTimeData] = useState({
    timeLeft: 0,
    timeUpdate: 0,
  });

  const videoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!filmCard || !id) {
    return <NotFoundScreen />;
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPause) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPause(!isPause);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setTimeData({
        timeLeft: Math.floor(videoRef.current.duration - videoRef.current.currentTime),
        timeUpdate: Math.ceil(videoRef.current.currentTime * 100 / videoRef.current.duration),
      });

      if(videoRef.current.duration === videoRef.current.currentTime) {
        setIsPause(true);
      }
    }
  };

  return (
    <div className="player">
      <Helmet>
        <title>{`WTW. Player ${filmCard.name}`}</title>
      </Helmet>
      <video
        src={filmCard.videoLink}
        ref={videoRef}
        onTimeUpdate={handleVideoTimeUpdate}
        className="player__video"
        muted autoPlay
        poster={filmCard.posterImage}
      />
      <button
        type="button"
        className="player__exit"
        onClick={() => {
          navigate(-1);
        }}
      >Exit
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={timeData.timeUpdate} max={100}></progress>
            <div className="player__toggler" style={{left: `${timeData.timeUpdate}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{getFormatRunTime(timeData.timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() => {
              togglePlay();
            }}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPause ? '#play-s' : '#pause'}></use>
            </svg>
            <span>{isPause ? 'Play' : 'Pause'}</span>
          </button>
          <div className="player__name">{filmCard.name}</div>

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
