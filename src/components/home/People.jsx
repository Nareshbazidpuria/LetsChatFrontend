import { Empty, Spin } from "antd";
import AddFriend from "../chat/AddFriend";

const People = ({ users, onScroll, reff, loading }) => {
  return (
    <div
      onScroll={onScroll}
      ref={reff}
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
      {loading && (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default People;
