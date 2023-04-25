import styles from './Video.module.css';

const Video = () => {
  return (
    <div className={styles.videoContainer}>
      <iframe
        src="https://www.youtube.com/embed/ak490-PtOuU"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
export default Video;
