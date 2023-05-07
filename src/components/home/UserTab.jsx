const UserTab = ({label, icon}) => {
  return (
    <span
      className={`flex items-center gap-2 text-${
        icon === "people-outline" ? "xl" : "base"
      }`}
    >
      <ion-icon name={icon} />
      <span className="text-sm">{label}</span>
    </span>
  );
};

export default UserTab;
