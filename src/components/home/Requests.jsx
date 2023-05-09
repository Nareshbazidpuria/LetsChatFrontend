import { Empty } from "antd";
import AddFriend from "../chat/AddFriend";

const Requests = ({ users }) => {
  return (
    <div
      className="overflow-auto"
      style={{ maxHeight: "calc(max(100vh - 20rem  , 20.25rem))" }}
    >
      {users?.length ? (
        users?.map((user) => <AddFriend key={user?.userName} userr={user} />)
      ) : (
        <div className="flex justify-center items-center h-80">
          <Empty description="No Requests" />
        </div>
      )}
    </div>
  );
};

export default Requests;
