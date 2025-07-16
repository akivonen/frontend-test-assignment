import PreloaderIcon from '@src/assets/images/preloader.svg';

export default function Preloader() {
  return (
    <div className="preloader" role="status" aria-label="Loading">
      <PreloaderIcon className="preloader__icon" />
    </div>
  );
}
