import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../slice/profileSlice"
import axios from "axios"

function SignupForm() {
  const navigate = useNavigate()
   const dispatch = useDispatch()

//   // student or instructor
// //   const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

   const[passAlert, setPassAlert] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

   const { firstName, lastName, email, password, confirmPassword } = formData

//   // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    if(e.target.name === "password" && e.target.value.length<8) {
      setPassAlert("Must be 8");
    }
  }

//   // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()
    // //const password = {password};
    // if(password.length < 8){
    //   setPassAlert('Password must be of at least eight characters')
    //   return
    // }
    

    // if (password !== confirmPassword) {
    //   toast.error("Passwords Do Not Match")
    //   return
    // }

//     // Setting signup data to state
//     // To be used after otp verification
    // dispatch(setSignupData(signupData))
//     // Send OTP to user for verification
//     // Reset
    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // })
//     setAccountType(ACCOUNT_TYPE.STUDENT)
    console.log(formData)

axios.post("http://localhost:4000/signup",formData).then((result) => {
  console.log("res",result);
  if(result.data.success===true){
    dispatch(setUser({ ...result.data.user}))
    navigate("/question")
  } 
}).catch((err) => {
  console.log(err);
});

   }

//   // data to pass to Tab component
//   const tabData = [
//     {
//       id: 1,
//       tabName: "Student",
//       type: ACCOUNT_TYPE.STUDENT,
//     },
//     {
//       id: 2,
//       tabName: "Instructor",
//       type: ACCOUNT_TYPE.INSTRUCTOR,
//     },
//   ]

  return (
    <div>
      {/* Tab */}
      {/* <Tab tabData={tabData} field={accountType} setField={setAccountType} /> */}
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4 shadow-2xl rounded-lg m-4 ml-0  p-2 bg-gradient-to-r from-sky-300 to-indigo-300">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 pl-1 text-[0.875rem] leading-[1.375rem] text-black">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="form-style w-full border-2 border-black outline-none text-xl p-1 shadow-md rounded-md"
            />
          </label>
          <label>
            <p className="mb-1 pl-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="form-style w-full border-2 border-black outline-none text-xl p-1  shadow-md rounded-md"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 pl-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="form-style w-full border-2 border-black  outline-none text-xl p-1  shadow-md rounded-md"
          />
        </label>
        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 pl-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="form-style w-full !pr-10 border-2 border-black text-center text-xl p-1  shadow-md rounded-md"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-7 z-[10] cursor-pointer mt-[7px]"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
            <p className="text-pink-100 mt-1 ">{passAlert}</p>
          </label>
          <label className="relative">
            <p className="mb-1 pl-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="form-style w-full !pr-10 border-2 border-black outline-none text-xl p-1  shadow-md rounded-md"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[35px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-blue-400 py-[8px] px-[12px] hover:bg-blue-500 hover:shadow-lg font-medium text-black"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm