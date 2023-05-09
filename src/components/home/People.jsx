import { Empty } from "antd";
import AddFriend from "../chat/AddFriend";

const People = ({ users }) => {
  return (
    <div
      className="overflow-auto"
      style={{ maxHeight: "calc(max(100vh - 20rem  , 20.25rem))" }}
    >
      {users?.length ? (
        users?.map((user) => (
          <AddFriend key={user?.userName} userr={user} add={true} />
        ))
      ) : (
        <div className="flex justify-center items-center h-80">
          <Empty description="No Data" />
        </div>
      )}
    </div>
  );
};

export default People;
