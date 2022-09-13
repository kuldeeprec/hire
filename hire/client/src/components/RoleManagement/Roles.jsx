import React from "react";
const Roles = (props) => {
  const { roles, setActiveRole } = props;

  const renderRoles = () => {
    return roles.map((role) => (
      <div
        className="bg-lightblue cursor-pointer p-6 rounded"
        onClick={() => setActiveRole(role)}
      >
        <h3 className="font-bold text-bluelagoon">{role.role_name}</h3>
        <p className="mt-3">
          Assigned to{" "}
          <span className="text-bluelagoon">{role.batches.length}</span> batch
        </p>
      </div>
    ));
  };

  return (
    <div className="grid grid-cols-4 gap-x-12 gap-y-6">{renderRoles()}</div>
  );
};

export default Roles;
