import { useUserStore } from "../../store/userStore";

export const Avatar = () => {
  const { avatar } = useUserStore(state => state);

  return (
    avatar &&
    <div style={{ width: '30px', height: '30px', cursor: 'pointer' }}>
      <div dangerouslySetInnerHTML={{ __html: avatar }} />
    </div>
  );
};

