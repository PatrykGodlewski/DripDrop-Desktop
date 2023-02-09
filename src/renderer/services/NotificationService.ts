type ShowNotificationsProps = { title: string; body: string };
export const showNotification = ({ title, body }: ShowNotificationsProps) => {
  const notification = new Notification(title, {
    body,
  });
  notification.onclick = () => {};
  notification.onclose = () => {};
};
