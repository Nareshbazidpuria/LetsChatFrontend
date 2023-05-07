import { useDispatch, useSelector } from "react-redux";
import Chat from "../chat";
import { setSelectedUser } from "../../redux/actions";
import { Empty } from "antd";

const Friends = ({ users }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div
      className="overflow-auto"
      style={{ maxHeight: "calc(max(100vh - 20rem  , 20.25rem))" }}
    >
      {users?.length ? (
        users?.map((user) => (
          <Chat
            key={user?.userName}
            active={state.selectedUser?.userName === user?.userName}
            user={user}
            onClick={() => dispatch(setSelectedUser(user))}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-80">
          <Empty description="No Friends" />
        </div>
      )}
    </div>
  );
};

export default Friends;
