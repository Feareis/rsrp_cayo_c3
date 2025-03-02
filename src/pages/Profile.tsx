import React, { useState } from "react";
import StaticInput from "../components/core/StaticInput";
import DynamicInput from "../components/core/DynamicInput";
import CustomButton from "../components/core/CustomButton";
import { ShieldHalf, User, Phone, CalendarFold, Lock, KeyRound, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import bcrypt from "bcryptjs"; // ✅ Import bcryptjs for password hashing

const Profile: React.FC = () => {
  const { user } = useAuth(); // Retrieve user information from context

  // State for password change form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle password update
  const handlePasswordUpdate = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    // Validate input fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Fetch the current password hash from the database
    const { data: userData, error: fetchError } = await supabase
      .from("access")
      .select("password_hash")
      .eq("employee_id", user.employee_id)
      .single();

    if (fetchError) {
      setErrorMessage("Error retrieving current password.");
      setLoading(false);
      return;
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(currentPassword, userData.password_hash);
    if (!isMatch) {
      setErrorMessage("Incorrect current password.");
      setLoading(false);
      return;
    }

    // Hash the new password before storing it in the database
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the password hash in the database
    const { error: updateError } = await supabase
      .from("access")
      .update({ password_hash: hashedPassword })
      .eq("employee_id", user.employee_id);

    setLoading(false);

    if (updateError) {
      setErrorMessage("Error updating password.");
    } else {
      setSuccessMessage("Password successfully updated!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  // Ensure user data exists before rendering
  if (!user || !user.employee) {
    return <p className="text-center text-red-400">Error: No user data found.</p>;
  }

  const employee = user.employee;

  return (
    <div className="flex justify-center items-center bg-[#37474f] text-[#cfd8dc] px-4">
      <div className="flex flex-row w-full gap-8">

        {/* Left Section: Profile Information */}
        <div className="w-[50%]">
          <div className="p-4 bg-[#263238] rounded-lg shadow-md">
            <h2 className="ml-2 text-xl font-bold mb-8">Profile Information</h2>
            <div className="flex flex-col gap-6 p-4">
              <StaticInput icon={ShieldHalf} label="Grade" text={employee.grade} />
              <StaticInput icon={User} label="Full Name" text={`${employee.first_name} ${employee.last_name}`} />
              <StaticInput icon={Phone} label="Phone" text={employee.phone_number || "Not provided"} />
              <StaticInput icon={CalendarFold} label="Hire Date" text={new Date(employee.hire_date).toLocaleDateString("fr-FR")} />
            </div>
          </div>
        </div>

        {/* Right Section: Change Password */}
        <div className="w-[50%]">
          <div className="ml-2 p-4 bg-[#263238] rounded-lg shadow-md">
            <h2 className="ml-2 text-xl font-bold mb-8">Change Password</h2>
            <div className="flex flex-col gap-6 p-4">
              <DynamicInput
                type="password"
                icon={Lock}
                label="Current Password *"
                value={currentPassword}
                onChange={setCurrentPassword}
                placeholder="Enter current password"
              />
              <DynamicInput
                type="password"
                icon={KeyRound}
                label="New Password *"
                value={newPassword}
                onChange={setNewPassword}
                placeholder="Enter new password"
              />
              <DynamicInput
                type="password"
                icon={KeyRound}
                label="Confirm Password *"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm new password"
              />

              {/* Feedback Messages */}
              {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
              {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}

              {/* Update Button */}
              <div className="flex justify-end">
                <CustomButton
                  label={loading ? "Updating..." : "Update"}
                  onClick={handlePasswordUpdate}
                  icon={CheckCircle}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 text-white mt-4 w-1/4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
