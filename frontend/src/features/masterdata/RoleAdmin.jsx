import { useState } from "react";
import "./RoleAdmin.css";

const ALL_ROLES = ["Requester", "Approver", "Receiver", "Admin"];

function RoleAdmin() {
  // fake sample users and the roles currently assigned to them
  const [users, setUsers] = useState([
    { username: "employee1", roles: ["Requester"] },
    { username: "manager1", roles: ["Approver"] },
    { username: "receiver1", roles: ["Receiver"] },
    { username: "admin1", roles: ["Admin"] },
  ]);

  function toggleRole(username, role) {
    const updated = users.map((u) => {
      if (u.username !== username) {
        return u;
      }

      const hasRole = u.roles.includes(role);
      const newRoles = hasRole
        ? u.roles.filter((r) => r !== role) // remove it
        : [...u.roles, role]; // add it

      return { ...u, roles: newRoles };
    });
    setUsers(updated);
  }

  return (
    <div className="roleadmin-page">
      <h1>Manage Roles</h1>
      <p className="roleadmin-subtext">
        Decide what each user is allowed to do in the system
      </p>

      <div className="roleadmin-table-card">
        <table className="roleadmin-table">
          <thead>
            <tr>
              <th>User</th>
              {ALL_ROLES.map((role) => (
                <th key={role}>{role}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.username}>
                <td>{u.username}</td>
                {ALL_ROLES.map((role) => (
                  <td key={role} className="roleadmin-checkbox-cell">
                    <input
                      type="checkbox"
                      checked={u.roles.includes(role)}
                      onChange={() => toggleRole(u.username, role)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="roleadmin-note">
        Note: this is only editing sample data on this screen for now — it isn't
        connected to the real login yet. Once Role 5 builds the real login API,
        this table will control what a user can actually access.
      </p>
    </div>
  );
}

export default RoleAdmin;