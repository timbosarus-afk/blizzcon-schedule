import './NotifySetup.css';

const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

export default function NotifySetup({ status, subscribe }) {
  if (status === 'subscribed') {
    return (
      <div className="notify-setup notify-ok">
        <span>🔔 Alerts on - you'll get a ping 30 min before anything you've favorited.</span>
      </div>
    );
  }

  if (status === 'checking') return null;

  if (isIos() && !isStandalone()) {
    return (
      <div className="notify-setup notify-warn">
        <strong>One-time setup for alerts on iPhone:</strong> tap the Share icon in Safari, then{' '}
        <strong>Add to Home Screen</strong>, then open the app from there and turn on notifications.
      </div>
    );
  }

  if (status === 'denied') {
    return (
      <div className="notify-setup notify-warn">
        Notifications are blocked for this app. Enable them in your phone's notification settings to get 30-min
        alerts.
      </div>
    );
  }

  if (status === 'unsupported') {
    return (
      <div className="notify-setup notify-warn">
        This browser doesn't support push notifications. Try Chrome or Safari (added to home screen).
      </div>
    );
  }

  return (
    <div className="notify-setup notify-prompt">
      <span>Get a ping 30 min before anything you favorite.</span>
      <button onClick={subscribe}>Turn on alerts</button>
    </div>
  );
}
