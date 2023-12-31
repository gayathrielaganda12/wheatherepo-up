
import { CgSpinner } from "react-icons/cg";
import authentication from './assests/images/Authentication.png'

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "./actions/authActions";
import NavigationBar from "./Components.js/NavigationBar";


const LoginPage = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  function onSignup() {
    console.log("onsign up working")
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        dispatch(setAuthenticated(true));
             
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return ( 
  <div>
      <NavigationBar />
    <section className=" flex items-start justify-center h-screen m-4" >
     
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container" ></div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl" >
            👍Login Success
          </h2>
        ) : (
         <div >
           <div className="border:'1px solid #ADD8E6' flex flex-col gap-4 rounded-lg p-4" style={{boxShadow:'10px 8px 8px  4px #ADD8E6 ',backgroundColor:'#67B7D1'}}>
             <img  src={authentication} alt="authentication" style={{height:'10em',width:'10em',margin:'auto',borderRadius:'50%'}}/>
            {showOTP ? (
              <>
              
                <label
                  htmlFor="otp"
                  className="font-bold text-xl  text-center text-white"
                  style={{color:'#4A9DB5'}}
                >
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                  style={{padding:'20px'}}
                  
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className=" w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  style={{backgroundColor:'#3a9fbf'}}
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span className="text-white">Verify OTP</span>
                </button>
              </>
            ) : (
              <>
              {/* Verify your ph number */}
               
               <div  style={{display:'flex',flexDirection:'column',gap:'2.5em',padding:'2em'}} >
               <label
                  htmlFor=""
                  className="font-bold text-xl  text-center"
                  style={{color:'white'}}
                >
                  Verify your phone number
                </label>
               
                                  <PhoneInput country={"in"} value={ph} onChange={setPh}  />

              
                <button
                  onClick={onSignup}
                  className=" w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  style={{backgroundColor:'#3a9fbf'}}
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span >Send code via SMS</span>
                </button>
               </div>
              </>
            )}
          </div>
          </div>
        )}
      </div>
    </section>
  </div>
  );
};

export default LoginPage;