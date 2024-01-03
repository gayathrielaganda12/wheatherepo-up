import { CgSpinner } from "react-icons/cg";
import authentication from './assests/images/Authentication.png';
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
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
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
      <section className="flex items-start justify-center h-screen m-4">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div
            id="recaptcha-container"
            className="hidden" // Hide the reCAPTCHA container initially
          ></div>
          {user ? (
            <h2 className="text-center text-white font-medium text-2xl">
              👍Login Success
            </h2>
          ) : (
            <div>
              <div className="border border-blue-500 flex flex-col gap-4 rounded-lg p-2 shadow-md" style={{backgroundColor: '#3a9fbf'}}>
                <img
                  src={authentication}
                  alt="authentication"
                  className="h-40 w-40 mx-auto rounded-full"
                />
                {showOTP ? (
                  <>
                    <label
                      htmlFor="otp"
                      className="font-bold text-xl text-center text-white"
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
                      className="opt-container p-4"
                    ></OtpInput>
                    <button
                      onClick={onOTPVerify}
                      className="w-full flex gap-1 items-center justify-center py-2.5 text-white rounded bg-blue-500"
                    >
                      {loading && (
                        <CgSpinner
                          size={20}
                          className="mt-1 animate-spin"
                        />
                      )}
                      <span className="text-white">Verify OTP</span>
                    </button>
                  </>
                ) : (
                  <>
                    {/* Verify your phone number */}
                    <div className="flex flex-col gap-4 p-4">
                      <label
                        htmlFor=""
                        className="font-bold text-xl text-center text-white"
                      >
                        Verify your phone number
                      </label>
                      <PhoneInput
                        country={"in"}
                        value={ph}
                        onChange={setPh}
                        inputStyle={{
                         
                          fontSize: '1rem',
                          width: '100%',
                          borderRadius: '0.375rem',
                          border: '1px solid #a0aec0',
                        }}
                      />
                      <button
                        onClick={onSignup}
                        className="w-full flex gap-1 items-center justify-center py-2.5 text-white rounded bg-blue-500"
                      >
                        {loading && (
                          <CgSpinner
                            size={20}
                            className="mt-1 animate-spin"
                          />
                        )}
                        <span>Send code via SMS</span>
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
